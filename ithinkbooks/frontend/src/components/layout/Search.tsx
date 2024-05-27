/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useBooks } from '../hooks/BooksProvider';
import Book from '../types/Book';
import axiosInstance, { getCookie } from '../Axios';
import SearchIcon from '../../images/header/Search.svg';
import SmallBookComponent from '../books/SmallBookComponent';
import { fixBookData } from '../utils';

const SEARCH_INTERVAL = 750;

const Search: React.FC<{}> = () => {
  const {findBooksByWord} = useBooks();

  const [foundBooks, setFoundBooks] = useState<Book[]>([]);
  const [searchWord, setSearchWord] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const signalController = new AbortController();

  const redirectToResult = () => {
    signalController.abort();
    findBooksByWord(searchWord);
    setSearchWord('');
    if(inputRef.current?.value) {
      inputRef.current.value = '';
    }
  };

  const findBooks = () => {
    signalController.abort();
    setSearchWord(!inputRef.current?.value ? '' : inputRef.current.value);
  };

  const getFoundBooks = useCallback(() => {
    axiosInstance
      .post('http://127.0.0.1:8000/books_search', {
        book_name: searchWord.toLowerCase()
      }, {
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        },
        signal: signalController.signal
      })
      .then((resp) => resp.data.slice(0, 3))
      .then((data) => data.map((book: Book) => fixBookData(book)))
      .then(setFoundBooks)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [searchWord]);

  useEffect(() => {
    if(searchWord) {
      setLoading(true);
      setTimeout(getFoundBooks, SEARCH_INTERVAL);
    }
  }, [searchWord, getFoundBooks]);

  return (
    <div className='search-panel'>
      <div className='search'>
        <input 
          ref={inputRef}
          type='text' 
          placeholder='Поиск' 
          onChange={findBooks}
          onKeyDown={(evt) => {
            if(evt.key === 'Enter') {
              redirectToResult();
            }
          }}/>

        <img src={SearchIcon} alt='Найти' onClick={redirectToResult} className='clickable'/>
      </div>
      
      <div className='search-result' hidden={searchWord === ''}>
        {foundBooks.length 
          ? foundBooks.map((book, i) => <SmallBookComponent key={i} book={book} onClick={() => setSearchWord('')}/>)
          : <p className='main-p darker-p'>{loading ? 'Загрузка...' : 'Ничего не найдено'}</p>}
      </div>
    </div>
  );
};

export default Search;
