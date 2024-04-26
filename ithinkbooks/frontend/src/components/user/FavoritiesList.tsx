import React from 'react';
import BookComponent from '../books/Book';
import { useAccount } from '../hooks/AccountProvider';
import { useBooks } from '../hooks/BooksProvider';

const FavoritiesList: React.FC<{}> = () => {
  const {account} = useAccount();
  const {books, loading} = useBooks();

  if(loading) {
    <div className='favorities-page'>
      <h2>Загрузка...</h2>
    </div>
  }

  const foundBooks = books.filter((book) => account.favoriteBooks.some((id) => id === book.id));

  if(!foundBooks.length) {
    return (
      <div className='favorities-page'>
        <h2>Вы ещё ни разу не отметили свою любимые книги</h2>
      </div>
    );
  }

  return (
    <div className='favorities-page'>
      <div className='books-collection'>
        {foundBooks.map((book, i) => <BookComponent key={i} book={book} isFavorite/>)}
      </div>
    </div>
  );
};


export default FavoritiesList;
