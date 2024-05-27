/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Order, OrderItem, emptyOrder } from '../types/Order';
import { getRandomId } from '../utils';
import { useAccount } from './AccountProvider';
import orderStatuses from '../mock/orderStatuses.json';
import axiosInstance, { getCookie } from '../Axios';
import { useLocation, useNavigate } from 'react-router-dom';
import cities from '../mock/cities.json';

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
      created_timestamp: new Date(),
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

  const getItems = (orderId: number, onFinish = () => {}) => {
    axiosInstance
      .get(`http://127.0.0.1:8000/orders/user_items/${orderId}`, {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then((resp) => resp.data)
      .then((data) => {
        setItems(data.map((item: OrderItem) => ({...item, price: typeof item.price === 'string' ? parseFloat(item.price) : item.price})));
      })
      .finally(onFinish);
  };

  const postOrder = useCallback(() => {
    axiosInstance.post('http://127.0.0.1:8000/orders/create_order', currentOrder, {
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
        created_timestamp: new Date(data.created_timestamp)
      });
      return data;
    })
    .then((data) => getItems(data.id, () => {
      setLoading(false);
      navigate(`/order/${data.id}`);
    }));
  }, [currentOrder, token]);

  const getOrders = useCallback(() => {
    axiosInstance.get('http://127.0.0.1:8000/orders/user_items', {
      headers: {
        'X-CSRFToken': token
      }
    })
    .then((resp) => resp.data)
    .then((data) => setOrders(data.map((order: Order) => ({
      ...order,
      city: cities.find((c) => c.addresses.includes(order.pick_up_point)),
      created_timestamp: new Date(order.created_timestamp)
    }))))
    .then(() => setLoading(false));
  }, [token]);

  const putOrderChange = useCallback((orderId: number) => {
    axiosInstance
      .put(`http://127.0.0.1:8000/orders/${orderId}`, {
        ...currentOrder, 
        status: orderStatuses.awatingFulfillment
      }, {
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        }
      })
      .then((resp) => resp.data)
      .then((data) => setCurrentOrder({
        ...data,
        id: data.id, 
        city: cities.find((c) => c.addresses.includes(data.pick_up_point)),
      }))
      .then(() => navigate('/account/basket'))
      .then(() => setCurrentOrder(emptyOrder))
      .then(() => setLoading(false));
  }, []);

  const deleteOrderFromServer = useCallback((orderId: number) => {
    axiosInstance
      .delete(`http://127.0.0.1:8000/orders/${orderId}`, {
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
      .get(`http://127.0.0.1:8000/orders/${orderId}`, {
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        }
      })
      .then((resp) => resp.data[0])
      .then((data) => {
        setCurrentOrder({
          ...data, 
          city: cities.find((c) => c.addresses.includes(data.pick_up_point)),
          created_timestamp: new Date(data.created_timestamp)
        });
      })
      .then(() => getItems(orderId, () => {
        setLoading(false);
        navigate(`/account/history/${orderId}`);
      }));
  }, []);

  useEffect(() => {
    if(currentOrder.id >= 0 && currentOrder.status !== orderStatuses.pending) {
      setLoading(true);
      switch(currentOrder.status) {
        case orderStatuses.ready:
          postOrder();
          break;
        
        case orderStatuses.awatingPayment:
          putOrderChange(currentOrder.id);
          break;

        case orderStatuses.cancelled:
          deleteOrderFromServer(currentOrder.id);
          break;

        default:
          if(!items.length || items[0].order !== currentOrder.id) {
            getOrder(currentOrder.id);
          }
      }
    }
  }, [currentOrder, postOrder, putOrderChange]);

  useEffect(() => {
    if(location.pathname.includes('history')) {
      setLoading(true);
      getOrders();
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
