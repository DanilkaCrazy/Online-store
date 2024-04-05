import React, { useEffect } from 'react';
import { books } from '../mock/mock';
import Theme from '../Theme';
import axios from 'axios';

const ThemeCollection: React.FC<{theme: Theme}> = ({theme}) => {
  const themeBooks = books.filter((book) => book.themes.includes(theme));
  const GetData = () => {
    axios.get('http://127.0.0.1:8000/products').then((res)=>{
      console.log(res.data)
    })}
  useEffect(()=>{
    GetData()
  })
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
