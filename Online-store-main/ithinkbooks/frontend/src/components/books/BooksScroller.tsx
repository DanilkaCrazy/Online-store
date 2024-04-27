import React from 'react';
import HorizontalScroller from '../ui/HorizontalScroller';
import Book from '../Book';
import { ScreensWidth } from '../utils';
import BookComponent from './Book';
import { useLightMode } from '../hooks/LightModeProvider';

const BooksScroller: React.FC<{scrollerHeader: string, books: Book[]}> = ({scrollerHeader, books}) => {
  const {isDark} = useLightMode();

  if(!books.length) {
    return <></>;
  }

  return (
    <div className='books-scroller'>
      <h2>{scrollerHeader}</h2>
      <HorizontalScroller 
        isScrollerDark={isDark}
        itemsCount={books.length} 
        itemWidth={ScreensWidth.BOOK_COVER_WIDTH.DESKTOP} 
        itemHeight={ScreensWidth.BOOK_COVER_HEIGHT.DESKTOP}>
          {books.map((book, i) => <BookComponent key={i} book={book}/>)}
      </HorizontalScroller>
    </div>
  );
};

export default BooksScroller;
