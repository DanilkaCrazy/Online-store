import React from 'react';
import Book from '../Book';
import { useAccount } from '../hooks/AccountProvider';

const BookPanel: React.FC<{book: Book, roadmapId: string}> = ({book, roadmapId}) => {
  const {putInBasket, addRoadmap, removeRoadmap, hasRoadmap} = useAccount();

  return (
    <div className='book-panel'>
      <div className='book-panel-content'>
        <div className='cover-stumb'></div>
        <div className='chosen-book-description'>
          <h2>{book.title}</h2>
          <h3 className='secondary-color'>{book.author}</h3>
          <p className='main-p secondary-color'>{book.year}</p>
          <h2>{book.price} ₽</h2>
        </div>
        <button onClick={() => putInBasket(book.id)} className='secondary-button'>В корзину</button>
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
