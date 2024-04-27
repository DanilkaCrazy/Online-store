import React from 'react';
import { Link } from 'react-router-dom';
import Book from '../Book';

const MAX_TITLE_LENGTH = 40;

const SmallBookComponent: React.FC<{book: Book, onClick: () => void}> = ({book, onClick}) => (
  <Link to={`/book/${book.id}`} className='ordered-book' onClick={onClick}>
    <div className='cover-stumb'></div>
    <div className='ordered-book-info'>
      <p className='main-p'>{book.name.length > MAX_TITLE_LENGTH ? `${book.name.slice(0, MAX_TITLE_LENGTH)}...` : book.name}</p>
      <p className='secondary-p'>{book.author}</p>
    </div>
  </Link>
);

export default SmallBookComponent;
