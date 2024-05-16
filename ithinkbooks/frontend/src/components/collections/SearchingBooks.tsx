import React, { useMemo, useState } from 'react';
import { useBooks } from '../hooks/BooksProvider';
import { useParams } from 'react-router-dom';
import FiltersMenu from './FiltersMenu';
import { SortBooks, SortTypes } from '../sort';
import BookComponent from '../books/Book';
import Filter, { filterBooks } from '../types/Filter';
import Book from '../types/Book';

const SearchedBooks: React.FC<{}> = () => {
  const {books, loading} = useBooks();
  const {bookTitle} = useParams();

  const searchBooks = useMemo(() => books.filter((book) => book.name.toLowerCase().includes(!bookTitle ? '' : bookTitle)), [books, bookTitle]);
  const [foundBooks, setFoundBooks] = useState<Book[]>(SortBooks[SortTypes.POPULARITY](searchBooks));

  if(loading) {
    <div className='page'>
      <h2>Загрузка...</h2>
    </div>
  }

  if(!foundBooks) {
    return (
      <div className='page'>
        <h2>К сожалению, по Вашему запросу ничего не найдено :&#40;</h2>
      </div>
    );
  }

  const applyFilters = (filter: Filter) => {
    setFoundBooks(filterBooks(searchBooks, filter));
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
