import React from 'react';
import BookComponent from '../books/Book';
import { books, personalAccount } from '../mock/mock';

const History: React.FC<{}> = () => {
  const foundBooks = books.filter((book) => personalAccount.books.some((id) => id === book.id));

  if(!foundBooks.length) {
    <div className='histpry-page'>
      <h2>Вы ещё не покупали у нас книги</h2>
    </div>
  }

  return (
    <div className='histpry-page books-collection'>
      {foundBooks.map((book, i) => <BookComponent key={i} book={book}/>)}
    </div>
  );
};

export default History;
