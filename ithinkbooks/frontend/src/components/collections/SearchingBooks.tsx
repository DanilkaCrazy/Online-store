import React from 'react';
import { useBooks } from '../hooks/BooksProvider';
import { useParams } from 'react-router-dom';
import FiltersMenu from './FiltersMenu';
import BookComponent from '../books/Book';
import Filter, { filterBooks } from '../types/Filter';

const SearchedBooks: React.FC<{}> = () => {
  const {books, filteredBooks, loading, filterOriginalBooks} = useBooks();
  const {bookTitle} = useParams();

  if(loading) {
    return (
      <div className='page'>
        <h2>Загрузка...</h2>
      </div>
    );
  }

  if(!books) {
    return (
      <div className='page'>
        <h2>К сожалению, по Вашему запросу ничего не найдено :&#40;</h2>
      </div>
    );
  }

  const applyFilters = (filter: Filter) => {
    filterOriginalBooks(filterBooks(books, filter));
  };

  return (
    <div className='divided-page theme-collection'>
      <FiltersMenu applyFilters={applyFilters}/>
      <div>
        <h1>Результаты по запросу "{bookTitle}"</h1>
        <div className='books-collection'>
          {filteredBooks.map((book, i) => <BookComponent key={i} book={book}/>)}
        </div>
      </div>
    </div>
  );
};

export default SearchedBooks;
