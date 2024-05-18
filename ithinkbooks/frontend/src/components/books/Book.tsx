import React from 'react';
import { Link } from 'react-router-dom';
import Book from '../types/Book';
import { ScreensWidth, getAverageNumber } from '../utils';
import {Star} from './Star';
import Price from './Price';
import '../../css/Book.css';
import { isReleased } from '../date-utils';
import { useAccount } from '../hooks/AccountProvider';
import { useBasket } from '../hooks/BasketProvider';
import { MAX_QUANTITY, MIN_QUANTITY } from '../types/Cart';

const BookComponent: React.FC<{
  book: Book, 
  page?: string,
  quantity?: number
}> = ({book, page = '', quantity = 0}) => {
  const {markAsFavotite} = useAccount();
  const {putInBasket, removeFromBasket, changeQuantity} = useBasket();
  const rating = getAverageNumber(book.review.map((review) => review.star));

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

      <p className='main-p' hidden={page !== 'history'}><b>Количество: </b>{quantity}</p>
      
      {book.quantity > 0 
      ? <button 
          className='main-button'
          hidden={page === 'basket'} 
          onClick={() => putInBasket(book)}>
            {isReleased(book.year, book.month) ? 'В корзину' : 'Предзаказ'}
        </button>
      : <h3>Нет в наличии</h3>}

      <div className='copy-amount' hidden={page !== 'basket'}>
        <button 
          disabled={quantity <= MIN_QUANTITY}
          className='secondary-button' 
          onClick={() => changeQuantity(book.id, -1)}
        >
          <b>-</b>
        </button>

        <p className='main-p'>{quantity}</p>

        <button 
          disabled={quantity >= MAX_QUANTITY && quantity >= book.quantity}
          className='secondary-button'
          onClick={() => changeQuantity(book.id, 1)}
        >
          <b>+</b>
        </button>
      </div>

      <button 
        className='secondary-button' 
        hidden={page !== 'basket' && page !== 'favorite'} 
        onClick={() => page === 'basket' 
          ? removeFromBasket(book.id) 
          : markAsFavotite(book.id)}>
          Убрать
        </button>
    </div>
  );
};
export default BookComponent;
