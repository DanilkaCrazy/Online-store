import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useBooks } from '../hooks/BooksProvider';
import Book from '../types/Book';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance, { getCookie } from '../Axios';
import SearchIcon from '../../images/header/Search.svg';
import SmallBookComponent from '../books/SmallBookComponent';
import { SortBooks, SortTypes } from '../sort';

const SEARCH_INTERVAL = 750;

const Search: React.FC<{}> = () => {
  const {updateBooks, fixBookData, toggleLoading, filterOriginalBooks} = useBooks();

  const [foundBooks, setFoundBooks] = useState<Book[]>([]);
  const [seacrhWord, setSearchWord] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const signalController = new AbortController();

  const redirectToResult = () => {
    if(seacrhWord) {
      toggleLoading(loading);
      navigate(`/search/${seacrhWord}`);
      updateBooks(foundBooks);
      filterOriginalBooks(SortBooks[SortTypes.POPULARITY](foundBooks));
      setSearchWord('');
      if(inputRef.current?.value !== undefined) {
        inputRef.current.value = '';
      }
    }
  };

  const findBooks = () => {
    signalController.abort();
    setTimeout(() => setSearchWord(!inputRef.current?.value ? '' : inputRef.current.value), SEARCH_INTERVAL);
  };

  const getFoundBooks = useCallback(() => {
    axiosInstance
      .post('http://127.0.0.1:8000/books_search', {
        book_name: seacrhWord.toLowerCase()
      }, {
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        },
        signal: signalController.signal
      })
      .then((resp) => resp.data)
      .then((data) => data.map((book: Book) => fixBookData(book)))
      .then(setFoundBooks)
      .catch(() => {})
      .finally(() => {
        setLoading(false);

        if(location.pathname.includes('search')) {
          toggleLoading(false);
        }
      });
  }, [seacrhWord, location.pathname]);

  useEffect(() => {
    if(seacrhWord) {
      setLoading(true);
      getFoundBooks();
    }
  }, [seacrhWord, getFoundBooks]);

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
      
      <div className='search-result' hidden={seacrhWord === ''}>
        {foundBooks.length 
          ? foundBooks.slice(0, 3).map((book, i) => <SmallBookComponent key={i} book={book} onClick={() => setSearchWord('')}/>)
          : <p className='main-p darker-p'>{loading ? 'Загрузка...' : 'Ничего не найдено'}</p>}
      </div>
    </div>
  );
};

export default Search;
