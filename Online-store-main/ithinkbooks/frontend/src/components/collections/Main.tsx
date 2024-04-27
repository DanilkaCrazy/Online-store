import React from 'react';
import themes from '../mock/themes.json';
import AdsBlock from './main/AdsBlock';
import ThemeMenu from './main/ThemeButton';
import BooksScroller from '../books/BooksScroller';
import '../../css/Main.css';
import { isNew, isReleased } from '../date-utils';
import { useBooks } from '../hooks/BooksProvider';
import { randomInteger } from '../mock/mock';

const Main: React.FC<{}> = () => {
  const {books, loading} = useBooks();

  if(loading) {
    <div className='page'>
      <h2>Загрузка...</h2>
    </div>
  }

  return (
    <div className='page'>
      <AdsBlock/>
      <ThemeMenu themes={themes}/>
      <BooksScroller scrollerHeader='Рекомендованное Вам' books={books.filter(() => randomInteger(0, 5) === 0)}/>
      <BooksScroller scrollerHeader='Новинки' books={books.filter((book) => isNew(book.year, book.month))}/>
      <BooksScroller scrollerHeader='Скоро выходят' books={books.filter((book) => !isReleased(book.year, book.month))}/>
    </div>
  );
};

export default Main;
