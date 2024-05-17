import Book, { emptyBook } from "./Book";
import { User } from "./User";

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 30;

interface Cart {
  id: number;
  user: number;
  product: Book;
  quantity: number;
  created_timestamp: Date;
};

interface CartResponce {
  id: number;
  user: User;
  product: number;
  quantity: number;
  created_timestamp: Date;
};

const emptyCart: Cart = {
  id: -1,
  user: 0,
  product: emptyBook,
  quantity: 0,
  created_timestamp: new Date()
};

export type { Cart, CartResponce };
export { emptyCart, MIN_QUANTITY, MAX_QUANTITY };  
