import React, { ReactNode, createContext, useContext, useState } from 'react';
import { mockBooks } from '../mock/mock';
import Book from '../Book';
import Review from '../Review';
//import { useLocation } from 'react-router-dom';

const emptyBooksList: Book[] = [];

const defaultBooksContextValue = {
  books: emptyBooksList,
  updateBook: (bookId: string, update: object) => {},
  addBookReview: (bookId: string, review: Review) => {}
};

const BooksContext = createContext(defaultBooksContextValue);

const useBooks = () => useContext(BooksContext);

const BooksProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  //const location = useLocation(); for getting filtered books from server

  const updateBook = (bookId: string, update: object) => {
    setBooks(books.map((book, i) => book.id === bookId ? {...book, ...update} : book));
  }

  const addBookReview = (bookId: string, review: Review) => {
    const foundBook = books.find((book) => book.id === bookId);

    if(!foundBook) {
      return;
    }

    updateBook(bookId, {reviews: foundBook.reviews.concat(review)});
  };

  return (
    <BooksContext.Provider value={{books, updateBook, addBookReview}}>
      {children}
    </BooksContext.Provider>
  );
};

export {useBooks, BooksProvider};
