import React from 'react';
import { Link } from 'react-router-dom';
import Book from '../Book';
import { ScreensWidth, getAverageNumber } from '../utils';
import {Star} from './Star';
import Price from './Price';
import '../../css/Book.css';
import { isReleased } from '../date-utils';
import { useAccount } from '../hooks/AccountProvider';

const BookComponent: React.FC<{
  book: Book, 
  isInBasket?: boolean, 
  isFavorite?: boolean
}> = ({book, isInBasket = false, isFavorite = false}) => {
  const rating = getAverageNumber(book.review.map((review) => review.star));
  const {putInBasket, removeFromBasket, markAsFavotite} = useAccount();

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
        <Link className='main-p' to={`/book/${book.id}`}>{book.name}</Link>
        <p className='secondary-p secondary-color'>{book.author}</p>
      </div>
      {book.review.length
      ? <Star rating={rating}/>
      : <p className='main-p'>Нет отзывов</p>}
      <Price price={book.price}/>
      <button 
        className='main-button'
        hidden={isInBasket} 
        onClick={() => putInBasket(book)}>
          {isReleased(book.year, book.month) ? 'В корзину' : 'Предзаказ'}
      </button>
      <button 
        className='secondary-button' 
        hidden={!isInBasket && !isFavorite} 
        onClick={() => isInBasket 
          ? removeFromBasket(book.id) 
          : markAsFavotite(book.id)}>
          Убрать
        </button>
    </div>
  );
};
export default BookComponent;
