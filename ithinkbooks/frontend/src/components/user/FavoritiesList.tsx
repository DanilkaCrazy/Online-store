import React from 'react';
import { books, favoriteBooks } from '../mock/mock';
import BookComponent from '../books/Book';

const FavoritiesList: React.FC<{}> = () => {
  const foundBooks = books.filter((book) => favoriteBooks.some((id) => id === book.id));

  if(!foundBooks.length) {
    <div className='favorities-page'>
      <h2>Вы ещё ни разу не отметили свою любимые книги</h2>
    </div>
  }

  return (
    <div className='favorities-page'>
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


export default FavoritiesList;
