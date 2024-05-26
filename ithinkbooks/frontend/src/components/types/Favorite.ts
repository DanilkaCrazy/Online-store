import Book, { emptyBook } from "./Book";

export default interface Favorite {
  id: number;
  product: Book;
  user: number;
};

const emptyFavorite: Favorite = {
  id: -1,
  product: emptyBook,
  user: -1
};

export {emptyFavorite};
