import React from 'react';
import Book from '../types/Book';
import { useAccount } from '../hooks/AccountProvider';
import { Link } from 'react-router-dom';
import { useBasket } from '../hooks/BasketProvider';

const BookPanel: React.FC<{book: Book, roadmapId: string}> = ({book, roadmapId}) => {
  const {addRoadmap, removeRoadmap, hasRoadmap} = useAccount();
  const {putInBasket} = useBasket();

  return (
    <div className='book-panel'>
      <div className='book-panel-content'>
        <div className='cover-stumb'></div>
        <div className='chosen-book-description'>
          <Link to={`/book/${book.id}`}><h2>{book.name}</h2></Link>
          <h3 className='secondary-color'>{book.author}</h3>
          <p className='main-p secondary-color'>{book.year}</p>
          <h2>{book.price} ₽</h2>
        </div>
        <button onClick={() => putInBasket(book)} className='secondary-button'>В корзину</button>
        {hasRoadmap(roadmapId)
        ? <button 
            onClick={() => removeRoadmap(roadmapId)} 
            className='secondary-button'>
              Убрать роадмап
          </button>
        : <button 
            onClick={() => addRoadmap(roadmapId)} 
            className='main-button'>
              Сохранить роадмап
          </button>}
      </div>
    </div>
  );
};

export default BookPanel;
