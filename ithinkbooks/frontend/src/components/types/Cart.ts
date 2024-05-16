import Book, { emptyBook } from "./Book";

export default interface Cart {
  user: number;
  product: Book;
  quantity: number;
  created_timestamp: Date;
};

const emptyCart: Cart = {
  user: 0,
  product: emptyBook,
  quantity: 0,
  created_timestamp: new Date()
};

export {emptyCart};
