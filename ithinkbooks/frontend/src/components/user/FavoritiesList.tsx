import React from 'react';
import BookComponent from '../books/Book';
import { useFavorite } from '../hooks/FavoriteProvider';

const FavoritiesList: React.FC<{}> = () => {
  const {favoriteBooks, loading} = useFavorite();

  if(loading) {
    return (
      <div className='favorities-page'>
        <h2>Загрузка...</h2>
      </div>
    );
  }

  if(!favoriteBooks.length) {
    return (
      <div className='favorities-page'>
        <h2>Вы ещё ни разу не отметили свою любимые книги</h2>
      </div>
    );
  }

  return (
    <div className='favorities-page'>
      <div className='books-collection'>
        {favoriteBooks.map((fav, i) => <BookComponent key={i} book={fav.product}/>)}
      </div>
    </div>
  );
};

export default FavoritiesList;
