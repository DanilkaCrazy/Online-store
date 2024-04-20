import React, { useState, useEffect } from 'react';
import '../../css/ThemeCollection.css';
import BookComponent from '../books/Book';
import { SortBooks, SortTypes } from '../sort';
import axios from 'axios';
import { useBooks } from '../hooks/BooksProvider';
import FiltersMenu from './FiltersMenu';
import { useParams } from 'react-router-dom';
import themes from '../mock/themes.json';
import Filter, { filterBooks } from '../Filter';
import Book from '../Book';

const ThemeCollection: React.FC<{}> = () => {
  const {books} = useBooks();
  const {theme} = useParams();

  const foundTheme = themes.find((t) => t.title === theme);

  const [themeBooks, setThemeBooks] = useState<Book[]>(SortBooks[SortTypes.POPULARITY](books.filter((book) => !foundTheme ? book : book.themes.includes(foundTheme))));

  /*const GetData = () => {
    axios.get(`http://127.0.0.1:8000/theme/${foundTheme?.title}`).then((res)=>{
      console.log(res.data)
    })}
  useEffect(()=>{
    GetData()
  })*/

  if(!foundTheme) {
    return (
      <div className='page'>
        <h2>Такой темы мы не смогли найти :&#40;</h2>
      </div>
    );
  }

  const applyFilters = (filter: Filter) => {
    setThemeBooks(filterBooks(themeBooks, filter));
  };

  return (
    <div className='divided-page theme-collection'>
      <FiltersMenu applyFilters={applyFilters}/>
      <div>
        <h1>{foundTheme.name}</h1>
        <div className='books-collection'>
          {themeBooks.map((book, i) => <BookComponent key={i} book={book}/>)}
        </div>
      </div>
    </div>
  );
};

export default ThemeCollection;
