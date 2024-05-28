import React, { useState } from 'react';
import Stub from '../layout/Stub';
import { getAverageNumber, declineNounAfterNumber } from '../utils';
import ReviewComponent from './Review';
import { isReleased } from '../date-utils';
import Book from '../types/Book';
import {Star} from './Star';
import { Dropdown } from 'react-bootstrap';
import { SortTypes, SortTranslations, SortReviews } from '../sort';
import { useAccount } from '../hooks/AccountProvider';
import months from '../mock/months.json';
import ReviewForm from './ReviewForm';
import { User } from '../types/User';
import { useBooks } from '../hooks/BooksProvider';
import { BookFormat, BookFormats, FileType } from '../mock/mock';
import themes from '../mock/themes.json';
import { useBasket } from '../hooks/BasketProvider';
import { useFavorite } from '../hooks/FavoriteProvider';
import { useNavigate } from 'react-router-dom';

const BookPromo: React.FC<{
  book: Book, 
  canBuy: boolean, 
  chosenFormat: string,
  isFavorite: boolean
  setFormat: React.Dispatch<React.SetStateAction<string>>,
  onPutInBasketClick: () => void,
  onFavoriteClick: () => void
}> = ({book, canBuy, chosenFormat, isFavorite, setFormat, onPutInBasketClick, onFavoriteClick}) => (
    <div className='book-page-promo'>
      <div className='cover-stumb'> 
      </div>
      <h2>{book.price} ₽</h2>

      <div className='bool-page-formats'>
        {/*book.formats.map((format, i) => (
          <button
            key={i}
            className={format === chosenFormat ? 'main-button' : 'secondary-button'}
            onClick={() => setFormat(format)}>
              {format}
          </button>
        ))*/
          <button className='main-button'>{BookFormats.find((format) => format.key === book.book_format)?.name}</button>}
      </div>

      {book.quantity > 0
      ? <button className='main-button' onClick={onPutInBasketClick}>{canBuy ? 'В корзину' : 'Предзаказ'}</button>
      : <h2>Нет в наличии</h2>}
      <button
        className={isFavorite ? 'main-button' : 'secondary-button'}
        onClick={onFavoriteClick}>
          {isFavorite ? 'В избранном' : 'Добавить в избранное'}
      </button>
      <p className='main-p' hidden={canBuy}>{months[book.month].nominative} {book.year}</p>
    </div>
  );

const BookCharacteristics: React.FC<{book: Book, chosenFormat: string}> = ({book, chosenFormat}) => {
  const theme = themes.find((t) => t.title === book.book_theme)?.name;
  return (
    <div className='book-page-block'>
      <h2>Характеристики</h2>
      <ul className='book-characterisctics'>
        <li className='main-p'><b>Издательство:</b> {book.publisher}</li>
        <li className='main-p'><b>Год:</b> {book.year}</li>
        <li className='main-p'><b>Количество страниц:</b> {book.number_of_pages}</li>
        <li className='main-p'><b>ISBN:</b> {book.isbn}</li>
        <li className='main-p' hidden={chosenFormat !== BookFormat.PAPERBACK}><b>Тип обложки:</b> {book.book_bindings}</li>
        <li className='main-p' hidden={chosenFormat !== BookFormat.ELECTRONIC}><b>Форматы книги:</b> {Object.values(FileType).join(', ')}</li>
        <li className='main-p'><b>Переводчик:</b> {book.translator_choice}</li>
        <li className='main-p' hidden={!theme}><b>Тема:</b> {theme}</li>
      </ul>
    </div>
  );
}
const BookReviewsBlock: React.FC<{
  book: Book, 
  rating: number, 
  isFormOpened: boolean,
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
  account: User
}> = ({book, rating, isFormOpened, setFormOpen, account}) => {
  const [sortType, setSortType] = useState<string>(SortTypes.POPULARITY);

  const onSortTypeSelect = (eventKey: string | null) => {
    if(!eventKey) {
      return;
    }

    setSortType(eventKey);
  }

  const sortedReviews = SortReviews[sortType](book.review);

  return (
    <div className='book-page-block'>
      <h2>Отзывы</h2>
      <div className='book-page-reviews-block'>
        {sortedReviews.length
        ? <div className='rating-and-sort'>
            <div className='rating-and-review-button'>
              <div className='book-pgae-rating'>
                <p className='price-p'>{Math.round(rating * 100) / 100}</p>
                <Star rating={rating}/>
                <p className='price-p secondary-color'>
                  {sortedReviews.length} {declineNounAfterNumber(sortedReviews.length, 'отзыв', 'отзыва', 'отзывов')}
                </p>
              </div>
              <button className='main-button' onClick={() => setFormOpen(true)}>Оценить</button>
            </div>
            <Dropdown onSelect={onSortTypeSelect}>
              <Dropdown.Toggle>{SortTranslations[sortType]}</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item 
                  eventKey={SortTypes.POPULARITY} 
                  active={sortType === SortTypes.POPULARITY}>
                    {SortTranslations[SortTypes.POPULARITY]}
                </Dropdown.Item>
                <Dropdown.Item 
                  eventKey={SortTypes.ASCENDING_RATING}
                  active={sortType === SortTypes.ASCENDING_RATING}>
                    {SortTranslations[SortTypes.ASCENDING_RATING]}
                </Dropdown.Item>
                <Dropdown.Item 
                  eventKey={SortTypes.DESCENDING_RATING}
                  active={sortType === SortTypes.DESCENDING_RATING}>
                    {SortTranslations[SortTypes.DESCENDING_RATING]}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        : <div className='empty-reviews-block'>
            <p className='price-p'>Нет отзывов</p>
            <button className='main-button' onClick={() => setFormOpen(true)}>Оценить</button>
          </div>
        }
        <div className='reviews'>
          {isFormOpened ? <ReviewForm bookId={book.id} setFormOpened={setFormOpen}/> : <></>}
          {sortedReviews.map((review, i) => <ReviewComponent key={i} review={review} isInBookPage/>)}
        </div>
      </div>
    </div>
  );
};

const BookPage: React.FC<{}> = () => {
  const {books, loading} = useBooks();
  const {account} = useAccount();
  const {markAsFavotite, isBookFavorite} = useFavorite();
  const {putInBasket} = useBasket();
  
  const book = books[0];

  const [isReviewFormOpened, setReviewFormOpen] = useState<boolean>(false);
  const [chosenFormat, setFormat] = useState<string>(!book ? 'online' : book.book_format);

  const navigate = useNavigate();

  if(loading) {
    return (
      <div className='page'>
        <h2>Загрузка...</h2>
      </div>
    );
  }
  if(!book) {
    return <Stub pageName='Error'/>
  }

  const canBuy = isReleased(book.year, book.month);
  const rating = getAverageNumber(book.review.map((review) => review.star));

  return(
    <div className='divided-page'>
      <BookPromo 
        book={book} 
        canBuy={canBuy} 
        chosenFormat={chosenFormat}
        isFavorite={isBookFavorite(book.id)}
        setFormat={setFormat}
        onPutInBasketClick={() => account.id < 0 ? navigate('/log-in') : putInBasket(book)}
        onFavoriteClick={() => account.id < 0 ? navigate('/log-in') : markAsFavotite(book)}/>

      <div className='page-right page'>
        <div className='book-page-title'>
          <h1>{book.name}</h1>
          <h2 className='secondary-color'>{book.author}</h2>
        </div>

        <BookCharacteristics book={book} chosenFormat={chosenFormat}/>

        <div className='book-page-block'>
          <h2>Описание</h2>
          <p>{book.description}</p>
        </div>

        <BookReviewsBlock 
          book={book} 
          rating={rating} 
          isFormOpened={isReviewFormOpened} 
          setFormOpen={setReviewFormOpen} 
          account={account}/>

      </div>
    </div>
  );
}; 

export default BookPage;
