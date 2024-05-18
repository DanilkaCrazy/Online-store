import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Order, OrderItem, emptyOrder } from '../types/Order';
import { getRandomId } from '../utils';
import { useAccount } from './AccountProvider';
import orderStatuses from '../mock/orderStatuses.json';
import axiosInstance, { getCookie } from '../Axios';
import { useNavigate } from 'react-router-dom';
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

  const getItems = (orderId: number) => {
    axiosInstance
      .get(`http://127.0.0.1:8000/orders/user_items/${orderId}`, {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then((resp) => resp.data)
      .then((data) => {
        setItems(data.map((item: OrderItem) => ({...item, price: typeof item.price === 'string' ? parseFloat(item.price) : item.price})));
      });
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
        city: cities.find((c) => c.addresses.includes(data.pick_up_point)),
        created_timestamp: new Date(data.created_timestamp)
      });
      return data;
    })
    .then((data) => getItems(data.id))
    .then(() => setLoading(false))
    .finally(() => {
      navigate(`/order/${currentOrder.id}`)
    })
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

  useEffect(() => {
    if(currentOrder.status === orderStatuses.ready) {
      setLoading(true);
      postOrder();
    }
  }, [currentOrder, postOrder]);

  useEffect(() => {
    if(!orders.length) {
      setLoading(true);
      getOrders();
    }
  }, [orders.length, getOrders]);

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
