import React from 'react';
import { books, booksInBasket } from '../mock/mock';
import BookComponent from '../books/Book';

const Basket: React.FC<{}> = () => {
  const foundBooks = books.filter((book) => booksInBasket.some((id) => id === book.id));

  if(!foundBooks.length) {
    <div className='basket-page'>
      <h2>Ваша корзина пуста</h2>
    </div>
  }

  return (
    <div className='basket-page'>
      <div className='basket-buttons'>
        <button className='main-button'>Купить все</button>
        <button className='secondary-button'>Убрать все</button>
      </div>
      <div className='books-collection'>
        {foundBooks.map((book, i) => <BookComponent key={i} book={book} isInBasket/>)}
      </div>
    </div>
  );
};

export default Basket;
