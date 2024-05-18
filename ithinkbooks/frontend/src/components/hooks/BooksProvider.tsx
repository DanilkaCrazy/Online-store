import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { randomInteger } from '../mock/mock';
import Book from '../types/Book';
import Review, { emptyReview } from '../types/Review';
import { useLocation } from 'react-router-dom';
import { SortBooks, SortTypes } from '../sort';
import axiosInstance, { getCookie } from '../Axios';
import { useAccount } from './AccountProvider';

const emptyBooksList: Book[] = [];

const defaultBooksContextValue = {
  books: emptyBooksList,
  filteredBooks: emptyBooksList,
  loading: false,
  updateBooks: (updatedBooks: Book[]) => {},
  updateBook: (bookId: number, update: object) => {},
  addBookReview: (review: Review) => {},
  fixBookData: (data: Book) => {}
};

const BooksContext = createContext(defaultBooksContextValue);

const useBooks = () => useContext(BooksContext);

const BooksProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {account} = useAccount();
  
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [loading, setLoading] = useState<boolean>(true);
  const [newReview, setReview] = useState<Review>(emptyReview);

  const location = useLocation();
  const keys = useMemo(() => location.pathname.split('/'), [location.pathname]);

  const token = getCookie('csrftoken');

  const updateBooks = (updatedBooks: Book[]) => {
    setFilteredBooks(updatedBooks);
  };

  const updateBook = (bookId: number, update: object) => {
    setBooks(books.map((book, i) => book.id === bookId ? {...book, ...update} : book));
  }

  const addBookReview = (review: Review) => {
    setReview(review);
  };

  // data fetch

  const fixBookData = (data: Book): Book => {
    return (
      {
        ...data, 
        month: randomInteger(1, 12), 
        review: !data.review 
          ? [] 
          : data.review.map((r: Review) => ({...r, positiveVotes: randomInteger(0, 100), negativeVotes: randomInteger(0, 100)})),
        price: typeof data.price === 'string' ? parseFloat(data.price) : data.price
      }
    );
  };

  const getThemeBooks = useCallback(() => {
    axiosInstance
      .get(`http://127.0.0.1:8000/theme/${keys[keys.length - 1]}`, {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then((resp) => resp.data)
      .then((data) => data.map((book: Book) => fixBookData(book)))
      .then((data) => {
        setBooks(data)
        setFilteredBooks(SortBooks[SortTypes.POPULARITY](data));
      })
      .then(() => setLoading(false));
  }, [keys]);

  const getBookById = useCallback(() => {
    axiosInstance
      .get(`http://127.0.0.1:8000/products/${keys[keys.length - 1]}`, {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then((resp) => resp.data)
      .then((data) => fixBookData(data))
      .then((data) => setBooks([data]))
      .then(() => setLoading(false));
  }, [keys]);

  const getBooks = useCallback(() => {
    axiosInstance
      .get('http://127.0.0.1:8000/products', {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then((resp) => resp.data)
      .then((data) => data.map((book: Book) => fixBookData(book)))
      .then((data) => setBooks(data))
      .then(() => setLoading(false));
  }, [])

  const postReview = useCallback(() => {
    axiosInstance
      .post('http://127.0.0.1:8000/review/', {...newReview, user: account.id}, {
        headers: {
          'X-CSRFToken': token
        }
      })
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
    <BooksContext.Provider value={{books, filteredBooks, loading, updateBooks, updateBook, addBookReview, fixBookData}}>
      {children}
    </BooksContext.Provider>
  );
};

export {useBooks, BooksProvider};
