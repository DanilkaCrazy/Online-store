import React from 'react';
import { Link } from 'react-router-dom';
import Book from '../Book';
import { ScreensWidth, getAverageNumber } from '../utils';
import Star from './Star';
import Price from './Price';
import '../../css/Book.css';
import { isReleased } from '../date-utils';

const BookComponent: React.FC<{book: Book, isInBasket?: boolean}> = ({book, isInBasket = false}) => {
  const rating = getAverageNumber(book.reviews.map((review) => review.rating));

  return (
    <div className='book'>
      <Link to={`/book/${book.id}`}>
        <div 
          className='cover-stumb' 
          style={
            {width: ScreensWidth.BOOK_COVER_WIDTH.DESKTOP, 
            height: ScreensWidth.BOOK_COVER_HEIGHT.DESKTOP}}> 
        </div>
      </Link>
      <div className='book-title'>
        <Link className='main-p' to={`/book/${book.id}`}>{book.title}</Link>
        <p className='secondary-p secondary-color'>{book.author}</p>
      </div>
      {book.reviews.length
      ? <Star rating={rating}/>
      : <p className='main-p'>Нет отзывов</p>}
      <Price price={book.price}/>
      <button className='main-button'>{isReleased(book.year, book.month) ? 'В корзину' : 'Предзаказ'}</button>
      <button className='secondary-button' hidden={!isInBasket}>Убрать</button>
    </div>
  );
};
export default BookComponent;
