/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Order, OrderItem, emptyOrder } from '../types/Order';
import { getRandomId } from '../utils';
import { useAccount } from './AccountProvider';
import orderStatuses from '../mock/orderStatuses.json';
import axiosInstance, { getCookie } from '../Axios';
import { useLocation, useNavigate } from 'react-router-dom';
import cities from '../mock/cities.json';
import dayjs from 'dayjs';

const emptyOrders: Order[] = [];
const emptyItems: OrderItem[] = [];

const defaultOrderContext = {
  orders: emptyOrders,
  currentOrder: emptyOrder,
  items: emptyItems,
  loading: false,
  updateOrder: (update: object) => {},
  createNewOrder: () => {},
  cancelOrder: () => {},
}

const OrderContext = createContext(defaultOrderContext);

const useOrders = () => useContext(OrderContext);

const OrdersProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {account} = useAccount();

  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order>(emptyOrder);
  const [items, setItems] = useState<OrderItem[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const token = getCookie('csrftoken');

  const updateOrder = (update: object) => {
    setCurrentOrder({...currentOrder, ...update});
  };

  const createNewOrder = () => {
    const newOrder: Order = {
      id: getRandomId(),
      pick_up_point: account.location.addresses[0],
      city: account.location,
      created_timestamp: dayjs(),
      is_paid: false,
      status: orderStatuses.ready,
      user: account.id
    };

    updateOrder(newOrder);
  };

  const cancelOrder = () => {
    updateOrder({
      status: orderStatuses.cancelled
    });
  };

  // data fetch

  const getOrderFromResponce = (data: Order): Order => {
    const city = cities.find((c) => c.addresses.includes(data.pick_up_point));

    return ({
      ...data,
      city: !city ? account.location : city,
      created_timestamp: dayjs(data.created_timestamp),
      id: data.id
    });
  };

  const getResponceFromOrder = (data: Order, status: string) => ({
    ...data,
    city: data.city.city,
    status,
    created_timestamp: data.created_timestamp.format('YYYY-MM-DD')
  });

  const getItems = (orderId: number, onFinish = () => {}) => {
    axiosInstance
      .get(`http://ratchekx.beget.tech/orders/user_items/${orderId}`, {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then((resp) => resp.data)
      .then((data) => {
        setItems(data.map((item: OrderItem) => ({
          ...item, 
          price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
          created_timestamp: dayjs(item.created_timestamp)
        })));
      })
      .finally(onFinish);
  };

  const postOrder = useCallback(() => {
    axiosInstance.post('http://ratchekx.beget.tech/orders/create_order', getResponceFromOrder(currentOrder, currentOrder.status), {
      headers: {
        'X-CSRFToken': token
      }
    })
    .then((resp) => resp.data)
    .then((data) => {
      setCurrentOrder({
        ...data, 
        status: orderStatuses.pending, 
        id: data.id, 
        city: account.location,
        pick_up_point: account.location.addresses[0],
        created_timestamp: dayjs(data.created_timestamp)
      });
      return data;
    })
    .then((data) => getItems(data.id, () => {
      setLoading(false);
      navigate(`/order/${data.id}`);
    }));
  }, [currentOrder, token]);

  const getOrders = useCallback(() => {
    axiosInstance.get('http://ratchekx.beget.tech/orders/user_items', {
      headers: {
        'X-CSRFToken': token
      }
    })
    .then((resp) => resp.data)
    .then((data) => setOrders(data.map((order: Order) => getOrderFromResponce(order))))
    .then(() => setLoading(false));
  }, [token]);

  const putOrderChange = useCallback((order: Order) => {
    axiosInstance
      .put(`http://ratchekx.beget.tech/orders/${order.id}`, getResponceFromOrder(order, orderStatuses.awatingFulfillment), {
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        }
      })
      .then((resp) => resp.data)
      .then((data) => setCurrentOrder(getOrderFromResponce(data)))
      .then(() => navigate('/account/basket'))
      .then(() => setCurrentOrder(emptyOrder))
      .then(() => setLoading(false));
  }, []);

  const deleteOrderFromServer = useCallback((orderId: number) => {
    axiosInstance
      .delete(`http://ratchekx.beget.tech/orders/${orderId}`, {
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        }
      })
      .then(() => navigate('/account/basket'))
      .then(() => setCurrentOrder(emptyOrder))
      .then(() => setLoading(false));
  }, []);

  const getOrder = useCallback((orderId: number) => {
    axiosInstance
      .get(`http://ratchekx.beget.tech/orders/${orderId}`, {
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        }
      })
      .then((resp) => resp.data[0])
      .then((data) => {
        setCurrentOrder(getOrderFromResponce(data));
      })
      .then(() => getItems(orderId, () => {
        setLoading(false);
      }));
  }, []);

  useEffect(() => {
    if(currentOrder.id >= 0) {
      switch(currentOrder.status) {
        case orderStatuses.ready:
          setLoading(true);
          postOrder();
          break;
        
        case orderStatuses.awatingPayment:
          setLoading(true);
          putOrderChange(currentOrder);
          break;

        case orderStatuses.cancelled:
          setLoading(true);
          deleteOrderFromServer(currentOrder.id);
          break;

        default:
          break;
      }
    }
  }, [currentOrder, postOrder, putOrderChange]);

  useEffect(() => {
    if(location.pathname.includes('history')) {
      setLoading(true);
      const id = location.pathname.split('/').pop();
      const parsed = !id ? undefined : parseInt(id);
      !parsed ? getOrders() : getOrder(parsed);
    }
  }, [location.pathname, orders.length, getOrders]);

  return (
    <OrderContext.Provider value={
      {
        orders,
        currentOrder,
        items,
        loading,
        updateOrder,
        createNewOrder,
        cancelOrder,
      }
    }>
      {children}
    </OrderContext.Provider>
  );
};

export {useOrders, OrdersProvider};
