/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Book from '../types/Book';
import Review, { emptyReview } from '../types/Review';
import { useLocation, useNavigate } from 'react-router-dom';
import { SortBooks, SortTypes } from '../sort';
import axiosInstance, { getCookie } from '../Axios';
import { useAccount } from './AccountProvider';
import { fixBookData } from '../utils';

const emptyBooksList: Book[] = [];

const defaultBooksContextValue = {
  books: emptyBooksList,
  filteredBooks: emptyBooksList,
  loading: false,
  findBooksByWord: (newSearchWord: string) => {},
  filterOriginalBooks: (updatedBooks: Book[]) => {},
  updateBook: (bookId: number, update: object) => {},
  addBookReview: (review: Review) => {},
  toggleLoading: (load: boolean) => {}
};

const BooksContext = createContext(defaultBooksContextValue);

const useBooks = () => useContext(BooksContext);

const BooksProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {account} = useAccount();
  
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);

  const [loading, setLoading] = useState<boolean>(true);
  const [newReview, setReview] = useState<Review>(emptyReview);

  const [searchWord, setSearchWord] = useState<string>('');

  const location = useLocation();
  const keys = useMemo(() => location.pathname.split('/'), [location.pathname]);
  const navigate = useNavigate();

  const token = getCookie('csrftoken');

  const findBooksByWord = (newSearchWord: string) => {
    if(newSearchWord) {
      setSearchWord(newSearchWord);
    }
  };

  const filterOriginalBooks = (updatedBooks: Book[]) => {
    setFilteredBooks(updatedBooks);
  };

  const updateBook = (bookId: number, update: object) => {
    setBooks(books.map((book, i) => book.id === bookId ? {...book, ...update} : book));
  }

  const addBookReview = (review: Review) => {
    setReview(review);
  };

  const toggleLoading = (load: boolean) => {
    setLoading(load);
  };

  // data fetch

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
        setBooks(data);
        setFilteredBooks(SortBooks[SortTypes.POPULARITY](data));
      })
      .then(() => setLoading(false));
  }, [keys, token]);

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
  }, [keys, token]);

  const getBooks = useCallback(() => {
    axiosInstance
      .get('http://127.0.0.1:8000/products', {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then((resp) => resp.data)
      .then((data) => data.map((book: Book) => fixBookData(book)))
      .then(setBooks)
      .then(() => setLoading(false));
  }, [token]);

  const postReview = useCallback(() => {
    axiosInstance
      .post('http://127.0.0.1:8000/review/', {...newReview, user: account.id}, {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then(() => setReview(emptyReview))
      .then(() => setLoading(false))
      .catch(console.error);
  }, [newReview, token]);

  const getBooksBySearchWord = useCallback(() => {
    axiosInstance
      .post('http://127.0.0.1:8000/books_search', {
        book_name: searchWord.toLowerCase()
      }, {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then((resp) => resp.data)
      .then((data) => data.map((book: Book) => fixBookData(book)))
      .then((data) => {
        setBooks(data);
        setFilteredBooks(SortBooks[SortTypes.POPULARITY](data));
      })
      .then(() => setSearchWord(''))
      .then(() => setLoading(false));
  }, [token, searchWord]);

  useEffect(() => {
    if(newReview.id >= 0) {
      setLoading(true);
      postReview();
    }
  }, [postReview, newReview])

  useEffect(() => {
    if(keys.includes('themes')) {
      setLoading(true);
      getThemeBooks();
    } else if(keys.includes('book')) {
      if(newReview.id < 0) {
        setLoading(true);
        getBookById();
      }
    } else if(!keys[1] || keys.includes('reviews')) {
      setLoading(true);
      getBooks();
    }
  }, [getThemeBooks, getBookById, getBooks, keys, newReview]);

  useEffect(() => {
    if(searchWord) {
      setLoading(true);
      navigate(`/search/${searchWord}`);
      getBooksBySearchWord();
    }
  }, [searchWord, getBooksBySearchWord]);

  return (
    <BooksContext.Provider value={{
      books, 
      filteredBooks, 
      loading,
      findBooksByWord, 
      filterOriginalBooks, 
      updateBook, 
      addBookReview,
      toggleLoading}}>
      {children}
    </BooksContext.Provider>
  );
};

export {useBooks, BooksProvider};
