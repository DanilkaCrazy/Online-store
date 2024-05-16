import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { randomInteger } from '../mock/mock';
import Book from '../types/Book';
import Review, { emptyReview } from '../types/Review';
import { useLocation } from 'react-router-dom';
import { SortBooks, SortTypes } from '../sort';
import axiosInstance from '../Axios';

const emptyBooksList: Book[] = [];

const defaultBooksContextValue = {
  books: emptyBooksList,
  filteredBooks: emptyBooksList,
  loading: false,
  updateBooks: (updatedBooks: Book[]) => {},
  updateBook: (bookId: number, update: object) => {},
  addBookReview: (review: Review) => {}
};

const BooksContext = createContext(defaultBooksContextValue);

const useBooks = () => useContext(BooksContext);

const BooksProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [loading, setLoading] = useState<boolean>(true);
  const [newReview, setReview] = useState<Review>(emptyReview);

  const location = useLocation();
  const keys = useMemo(() => location.pathname.split('/'), [location.pathname]);

  const updateBooks = (updatedBooks: Book[]) => {
    setFilteredBooks(updatedBooks);
  };

  const updateBook = (bookId: number, update: object) => {
    setBooks(books.map((book, i) => book.id === bookId ? {...book, ...update} : book));
  }

  const addBookReview = (review: Review) => {
    setReview(review);
  };

  const getThemeBooks = useCallback(() => {
    axiosInstance
      .get(`http://127.0.0.1:8000/theme/${keys[keys.length - 1]}`)
      .then((resp) => resp.data)
      .then((data) => data.map((book: object) => ({...book, month: randomInteger(1, 12), review: !data.review ? [] : data.review.map((r: object) => ({...r, positiveVotes: randomInteger(0, 100), negativeVotes: randomInteger(0, 100)}))})))
      .then((data) => {
        setBooks(data)
        setFilteredBooks(SortBooks[SortTypes.POPULARITY](data));
      })
      .then(() => setLoading(false));
  }, [keys]);

  const getBookById = useCallback(() => {
    axiosInstance
      .get(`http://127.0.0.1:8000/products/${keys[keys.length - 1]}`)
      .then((resp) => resp.data)
      .then((data) => ({...data, month: randomInteger(1, 12), review: !data.review ? [] : data.review.map((r: object) => ({...r, positiveVotes: randomInteger(0, 100), negativeVotes: randomInteger(0, 100)}))}))
      .then((data) => setBooks([data]))
      .then(() => setLoading(false));
  }, [keys]);

  const getBooks = useCallback(() => {
    axiosInstance
      .get('http://127.0.0.1:8000/products')
      .then((resp) => resp.data)
      .then((data) => data.map((book: object) => ({...book, month: randomInteger(1, 12), review: !data.review ? [] : data.review.map((r: object) => ({...r, positiveVotes: randomInteger(0, 100), negativeVotes: randomInteger(0, 100)}))})))
      .then((data) => setBooks(data))
      .then(() => setLoading(false));
  }, [])

  const postReview = useCallback(() => {
    axiosInstance
      .post('http://127.0.0.1:8000/review/', newReview)
      .then((resp) => console.log(resp.data))
      .then(() => setReview(emptyReview))
      .then(() => setLoading(false))
      .catch(console.error);
  }, [newReview])

  useEffect(() => {
    if(newReview.id >= 0) {
      setLoading(true);
      postReview();
    }
  }, [postReview, newReview])

  useEffect(() => {
    setLoading(true);

    if(keys.includes('themes')) {
      getThemeBooks();
    } else if(keys.includes('book')) {
      if(newReview.id < 0) {
        getBookById();
      }
    } else {
      getBooks();
    }
  }, [getThemeBooks, getBookById, getBooks, keys, newReview]);

  return (
    <BooksContext.Provider value={{books, filteredBooks, loading, updateBooks, updateBook, addBookReview}}>
      {children}
    </BooksContext.Provider>
  );
};

export {useBooks, BooksProvider};
