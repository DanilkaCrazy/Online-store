import Book, { emptyBook } from './Book';
import dayjs, { Dayjs } from 'dayjs';

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 30;

export default interface Cart {
  id: number;
  user: number;
  product: Book;
  quantity: number;
  created_timestamp: Dayjs;
};

const emptyCart: Cart = {
  id: -1,
  user: 0,
  product: emptyBook,
  quantity: 0,
  created_timestamp: dayjs()
};

export { emptyCart, MIN_QUANTITY, MAX_QUANTITY };  
