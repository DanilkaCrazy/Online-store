import React from 'react';
import { Link } from 'react-router-dom';
import Book from '../Book';

const SmallBookComponent: React.FC<{book: Book, onClick: () => void}> = ({book, onClick}) => (
  <Link to={`/book/${book.id}`} className='ordered-book' onClick={onClick}>
    <div className='cover-stumb'></div>
    <div className='ordered-book-info'>
      <p className='main-p'>{book.title}</p>
      <p className='secondary-p'>{book.author}</p>
    </div>
  </Link>
);

export default SmallBookComponent;
