import React from 'react';
import { books } from '../mock/mock';
import Theme from '../Theme';

const ThemeCollection: React.FC<{theme: Theme}> = ({theme}) => {
  const themeBooks = books.filter((book) => book.themes.includes(theme));

  return (
    <>
      <h1>{theme.name}</h1>
      {themeBooks.map((book, i) => <p key={i}>{book.title}</p>)}
    </>
  );
};

export default ThemeCollection;
