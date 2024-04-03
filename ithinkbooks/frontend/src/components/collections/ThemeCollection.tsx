import React from 'react';
import { books } from '../mock/mock';
import Theme from '../Theme';

const ThemeCollection: React.FC<{theme: Theme}> = ({theme}) => {
  const themeBooks = books.filter((book) => book.themes.includes(theme));

  return (
    <>
      <h1>{theme.name}</h1>
      {themeBooks.map((book, i) => (
        <div key={i} className='book-small'>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}
    </>
  );
};

export default ThemeCollection;
