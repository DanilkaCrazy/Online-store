import City from './City';
import cities from '../mock/cities.json';
import orderStatuses from '../mock/orderStatuses.json';

interface OrderItem {
  id: number;
  product: number;
  name: string;
  price: number;
  quantity: number;
  created_timestamp: Date;
  order: number;
  author: string;
};

interface Order {
  id: number;
  pick_up_point: string;
  city: City;
  created_timestamp: Date;
  is_paid: boolean;
  status: string;
  user: number;
};

const emptyOrder: Order = {
  id: -1,
  pick_up_point: cities[0].addresses[0],
  city: cities[0],
  created_timestamp: new Date(),
  is_paid: false,
  status: orderStatuses.completed,
  user: -1
};

export type {Order, OrderItem};
export {emptyOrder};
