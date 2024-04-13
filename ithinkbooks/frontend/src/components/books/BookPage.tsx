import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import Stub from '../layout/Stub';
import { getAverageNumber, declineNounAfterNumber } from '../utils';
import ReviewComponent from './Review';
import { isReleased } from '../date-utils';
import Book from '../Book';
import {Star} from './Star';
import { Dropdown } from 'react-bootstrap';
import { SortTypes, SortTranslations, SortReviews } from '../sort';
import { useAccount } from '../hooks/AccountProvider';
import months from '../mock/months.json';
import ReviewForm from './ReviewForm';
import Review from '../Review';
import { nanoid } from 'nanoid';
import User from '../User';
import { useBooks } from '../hooks/BooksProvider';

const BookPromo: React.FC<{
  book: Book, 
  canBuy: boolean, 
  isPaperback: boolean, 
  setIsPaperback: React.Dispatch<React.SetStateAction<boolean>>,
  isFavorite: boolean,
  putInBasket: (bookId: string) => void,
  markAsFavotite: (bookId: string) => void
}> = ({book, canBuy, isPaperback, setIsPaperback, isFavorite, putInBasket, markAsFavotite}) => (
  <div className='book-page-promo'>
    <div className='cover-stumb'> 
    </div>
    <h2>{book.price} ₽</h2>

    <div className='bool-page-formats'>
      <button 
        className={isPaperback ? 'main-button' : 'secondary-button'} 
        hidden={!book.canBePaperback} 
        onClick={() => setIsPaperback(true)}>
          Печатный
      </button>

      <button 
        className={isPaperback && book.canBePaperback ? 'secondary-button' : 'main-button'} 
        onClick={() => setIsPaperback(false)}>
          Электронный
      </button>
    </div>

    <button className='main-button' onClick={() => putInBasket(book.id)}>{canBuy ? 'В корзину' : 'Предзаказ'}</button>
    <button
      className={isFavorite ? 'main-button' : 'secondary-button'}
      onClick={() => markAsFavotite(book.id)}>
        {isFavorite ? 'В избранном' : 'Добавить в избранное'}
    </button>
    {canBuy 
      ? <p className='main-p' hidden={!isPaperback}>Доставка до <b>{book.deliveryDays}</b> дней</p>
      : <p className='main-p'>{months[book.month - 1].nominative} {book.year}</p>}
  </div>
);

const BookCharacteristics: React.FC<{book: Book, isPaperback: boolean}> = ({book, isPaperback}) => (
  <div className='book-page-block'>
    <h2>Характеристики</h2>
    <ul className='book-characterisctics'>
      <li className='main-p'><b>Издательство:</b> {book.publisher}</li>
      <li className='main-p'><b>Год:</b> {book.year}</li>
      <li className='main-p'><b>Количество страниц:</b> {book.pagesAmount}</li>
      <li className='main-p'><b>ISBN:</b> {book.isbn}</li>
      <li className='main-p' hidden={!book.canBePaperback || !isPaperback}><b>Тип обложки:</b> {book.paperFormat}</li>
      <li className='main-p' hidden={isPaperback}><b>Форматы книги:</b> {book.fileTypes.join(', ')}</li>
      <li className='main-p'><b>Переводчик:</b> {book.translator}</li>
      <li className='main-p'><b>Темы:</b> {book.themes.map((theme) => theme.name).join(', ')}</li>
    </ul>
  </div>
);

const BookReviewsBlock: React.FC<{
  book: Book, 
  rating: number, 
  isFormOpened: boolean,
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
  account: User
}> = ({book, rating, isFormOpened, setFormOpen, account}) => {
  const [sortType, setSortType] = useState<string>(SortTypes.POPULARITY);

  const emptyReview: Review = {
    id: nanoid(),
    rating: 0,
    title: '',
    text: '',
    user: account,
    positiveVotes: 0,
    negativeVotes: 0,
    bookId: book.id
  };

  const onSortTypeSelect = (eventKey: string | null) => {
    if(!eventKey) {
      return;
    }

    setSortType(eventKey);
  }

  const sortedReviews = SortReviews[sortType](book.reviews);

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
          {isFormOpened ? <ReviewForm bookId={book.id} emptyReview={emptyReview} setFormOpened={setFormOpen}/> : <></>}
          {sortedReviews.map((review, i) => <ReviewComponent key={i} review={review} isInBookPage/>)}
        </div>
      </div>
    </div>
  );
};

const BookPage: React.FC<{}> = () => {
  const {id} = useParams();
  const {books} = useBooks();
  const book = books.find((b) => b.id === id);

  const [isReviewFormOpened, setReviewFormOpen] = useState<boolean>(false);
  const {account, putInBasket, markAsFavotite} = useAccount();
  const isFavorite = account.favoriteBooks.some((bookId) => bookId === id);

  const [isPaperback, setIsPaperback] = useState<boolean>(false);

  if(!book) {
    return <Stub pageName='Error'/>
  }
  
  const canBuy = isReleased(book.year, book.month);
  const rating = getAverageNumber(book.reviews.map((review) => review.rating));

  return(
    <div className='divided-page'>
      <BookPromo 
        book={book} 
        canBuy={canBuy} 
        isPaperback={isPaperback} 
        setIsPaperback={setIsPaperback} 
        isFavorite={isFavorite} 
        putInBasket={putInBasket}
        markAsFavotite={markAsFavotite}/>

      <div className='page-right page'>
        <div className='book-page-title'>
          <h1>{book.title}</h1>
          <h2 className='secondary-color'>{book.author}</h2>
        </div>

        <BookCharacteristics book={book} isPaperback={isPaperback}/>

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
