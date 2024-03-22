import React from 'react';
import {useParams} from 'react-router-dom';
import { MONTHS, books } from '../mock/mock';
import Stub from '../layout/Stub';
import { getAverageNumber } from '../utils';
import ReviewComponent from './Review';

const Book: React.FC<{}> = () => {
  const {id} = useParams();
  const book = books.find((b) => b.id === id);

  if(!book) {
    return <Stub pageName='Error'/>
  }

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const canBuy = year < book.year || (year === book.year && month <= book.month);

  const overallRating = getAverageNumber(book.reviews.map((review) => review.rating));

  return(
    <>
      <img src={book.cover} alt={book.title}/>
      <h2>{book.price} ₽</h2>
      <div>
        {book.canBePaperback ? <button>Печатный</button> : <></>}
        <button>Электронный</button>
      </div>
      <button>{canBuy ? 'В корзину' : 'Предзаказ'}</button>
      <button>В избранное</button>
      <p>{canBuy ? `Доставка до ${book.deliveryDays} дней` : `${MONTHS[book.month - 1]} ${book.year}`}</p>
      <h1>{book.title}</h1>
      <h3>{book.author}</h3>

      <h3>Характеристики</h3>
      <ul>
        <li>Издательство: {book.publisher}</li>
        <li>Год: {book.year}</li>
        <li>Количество страниц: {book.pagesAmount}</li>
        <li>ISBN: {book.isbn}</li>
        <li>
          {book.canBePaperback 
            ? `Тип обложки: ${book.paperFormat}` 
            : `Форматы книги: ${book.fileTypes.concat(', ')}`
          }
        </li>
        <li>Переводчик: {book.translator}</li>
        <li>Темы: ${book.themes.map((theme) => theme.name).concat(', ')}</li>
      </ul>

      <h3>Описание</h3>
      <p>{book.description}</p>

      <h3>Отзывы</h3>
      <p>{overallRating} / 5</p>
      <ul>
        {book.reviews.map((review, i) => <li key={i}><ReviewComponent review={review}/></li>)}
      </ul>
    </>
  );
}; 

export default Book;
