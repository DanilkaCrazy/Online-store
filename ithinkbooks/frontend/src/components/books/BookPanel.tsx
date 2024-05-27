import React from 'react';
import Book from '../types/Book';
import { Link } from 'react-router-dom';
import { useBasket } from '../hooks/BasketProvider';

const BookPanel: React.FC<{book: Book}> = ({book}) => {
  const {putInBasket} = useBasket();

  return (
    <div className='book-panel'>
      <div className='book-panel-content'>
        <div className='cover-stumb'></div>
        <div className='chosen-book-description'>
          <Link to={`/book/${book.id}`}><h3>{book.name}</h3></Link>
          <p className='main-p secondary-color'><b>{book.author}</b></p>
          <p className='main-p secondary-color'>{book.year}</p>
          <h3>{book.price} ₽</h3>
        </div>

        {book.quantity > 0
        ? <button onClick={() => putInBasket(book)} className='secondary-button'>В корзину</button>
        : <h3>Нет в наличии</h3>}
      </div>
    </div>
  );
};

export default BookPanel;
