import React, { useState } from 'react';
import { useBooks } from '../hooks/BooksProvider';
import { useParams } from 'react-router-dom';
import FiltersMenu from './FiltersMenu';
import { SortBooks, SortTypes } from '../sort';
import BookComponent from '../books/Book';
import Filter, { filterBooks } from '../Filter';
import Book from '../Book';

const SearchedBooks: React.FC<{}> = () => {
  const {books} = useBooks();
  const {bookTitle} = useParams();

  const [foundBooks, setFoundBooks] = useState<Book[]>(SortBooks[SortTypes.POPULARITY](books.filter((book) => book.title.toLowerCase().includes(!bookTitle ? '' : bookTitle))));

  if(!foundBooks) {
    return (
      <div className='page'>
        <h2>К сожалению, по Вашему запросу ничего не найдено :&#40;</h2>
      </div>
    );
  }

  const applyFilters = (filter: Filter) => {
    setFoundBooks(filterBooks(foundBooks, filter));
  };

  return (
    <div className='divided-page theme-collection'>
      <FiltersMenu applyFilters={applyFilters}/>
      <div>
        <h1>Результаты по запросу "{bookTitle}"</h1>
        <div className='books-collection'>
          {foundBooks.map((book, i) => <BookComponent key={i} book={book}/>)}
        </div>
      </div>
    </div>
  );
};

export default SearchedBooks;
