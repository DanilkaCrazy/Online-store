import React from 'react';
import Book from '../Book';

const OrderedBook: React.FC<{book: Book}> = ({book}) => (
  <div className='ordered-book'>
    <div className='cover-stumb'></div>
    <div className='ordered-book-info'>
      <p className='main-p'>{book.title}</p>
      <p className='secondary-p'>{book.price} ₽</p>
    </div>
  </div>
);

export default OrderedBook;
