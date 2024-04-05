import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import { MONTHS, books } from '../mock/mock';
import Stub from '../layout/Stub';
import { getAverageNumber, getPluralNoun } from '../utils';
import ReviewComponent from './Review';
import { isReleased } from '../date-utils';
import Book from '../Book';
import Star from './Star';
import { Dropdown } from 'react-bootstrap';
import { SortTypes, SortTranslations } from '../sort';

const BookPromo: React.FC<{
  book: Book, 
  canBuy: boolean, 
  isPaperback: boolean, 
  setIsPaperback: React.Dispatch<React.SetStateAction<boolean>>
}> = ({book, canBuy, isPaperback, setIsPaperback}) => (
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

    <button className='main-button'>{canBuy ? 'В корзину' : 'Предзаказ'}</button>
    <button className='secondary-button'>В избранное</button>
    {canBuy 
      ? <p className='main-p' hidden={!isPaperback}>Доставка до <b>{book.deliveryDays}</b> дней</p>
      : <p className='main-p'>{MONTHS[book.month - 1]} {book.year}</p>}
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
  sortType: string, 
  setSortType: React.Dispatch<React.SetStateAction<string>>
}> = ({book, rating, sortType, setSortType}) => {
  const onSortTypeSelect = (eventKey: string | null) => {
    if(!eventKey) {
      return;
    }

    setSortType(eventKey);
  }

  return (
    <div className='book-page-block'>
      <h2>Отзывы</h2>
      <div className='book-page-reviews-block'>
        {book.reviews.length
        ? <div className='rating-and-sort'>
            <div className='rating-and-review-button'>
              <div className='book-pgae-rating'>
                <p className='price-p'>{Math.round(rating * 100) / 100}</p>
                <Star rating={rating}/>
                <p className='price-p secondary-color'>
                  {book.reviews.length} {getPluralNoun(book.reviews.length, 'отзыв', 'отзыва', 'отзывов')}
                </p>
              </div>
              <button className='main-button'>Оценить</button>
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
        : <p className='price-p'>Нет отзывов</p>}
        <div className='reviews'>
          {book.reviews.map((review, i) => <ReviewComponent key={i} review={review} isInBookPage/>)}
        </div>
      </div>
    </div>
  );
};

const BookPage: React.FC<{}> = () => {
  const {id} = useParams();
  const book = books.find((b) => b.id === id);

  const [isPaperback, setIsPaperback] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>(SortTypes.POPULARITY);

  if(!book) {
    return <Stub pageName='Error'/>
  }
  
  const canBuy = isReleased(book.year, book.month);
  const rating = getAverageNumber(book.reviews.map((review) => review.rating));

  return(
    <div className='divided-page'>
      <BookPromo book={book} canBuy={canBuy} isPaperback={isPaperback} setIsPaperback={setIsPaperback}/>

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

        <BookReviewsBlock book={book} rating={rating} sortType={sortType} setSortType={setSortType}/>

      </div>
    </div>
  );
}; 

export default BookPage;
