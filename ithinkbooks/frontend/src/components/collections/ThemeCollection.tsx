import React from 'react';
import '../../css/ThemeCollection.css';
import BookComponent from '../books/Book';
import { useBooks } from '../hooks/BooksProvider';
import FiltersMenu from './FiltersMenu';
import { useParams } from 'react-router-dom';
import themes from '../mock/themes.json';
import Filter, { filterBooks } from '../types/Filter';

const ThemeCollection: React.FC<{}> = () => {
  const {books, filteredBooks, loading, updateBooks} = useBooks();
  const {theme} = useParams();

  const foundTheme = themes.find((t) => t.title === theme);

  if(loading) {
    return (
      <div className='page'>
        <h2>Загрузка...</h2>
      </div>
    )
  }

  if(!foundTheme) {
    return (
      <div className='page'>
        <h2>Такой темы мы не смогли найти :&#40;</h2>
      </div>
    );
  }

  const applyFilters = (filter: Filter) => {
    updateBooks(filterBooks(books, filter));
  };

  return (
    <div className='divided-page theme-collection'>
      <FiltersMenu applyFilters={applyFilters}/>
      <div>
        <h1>{foundTheme.name}</h1>
        <div className='books-collection'>
          {filteredBooks.map((book, i) => <BookComponent key={i} book={book}/>)}
        </div>
      </div>
    </div>
  );
};

export default ThemeCollection;
