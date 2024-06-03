/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import Favorite, { emptyFavorite } from '../types/Favorite';
import Book from '../types/Book';
import { fixBookData, getRandomId } from '../utils';
import { useAccount } from './AccountProvider';
import axiosInstance, { getCookie } from '../Axios';

const emptyFavorities: Favorite[] = [];

const defaultFavoriteContext = {
  favoriteBooks: emptyFavorities,
  loading: false,
  markAsFavotite: (book: Book) => {},
  isBookFavorite: (bookId: number) => false
};

const FavoriteContext = createContext(defaultFavoriteContext);

const useFavorite = () => useContext(FavoriteContext);

const FavoriteProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {account} = useAccount();
  const [favoriteBooks, setFavoriteBooks] = useState<Favorite[]>([]);
  const [currentFav, setCurrentFav] = useState<Favorite>(emptyFavorite);

  const [loading, setLoading] = useState<boolean>(false);

  const token = getCookie('csrftoken');

  const markAsFavotite = (book: Book) => {
    const foundFav =  favoriteBooks.find((fav) => fav.product.id === book.id);
    if(!foundFav) {
      const newFav: Favorite = {
        id: getRandomId(),
        product: book,
        user: account.id
      };

      setCurrentFav(newFav);
    } else {
      setCurrentFav(foundFav);
    }
  };

  const isBookFavorite = (bookId: number) => favoriteBooks.find((fav) => fav.product.id === bookId) !== undefined;

  // data fetch

  const addToFavorite = useCallback(() => {
    axiosInstance
      .post(`http://127.0.0.1:8000/favorite/${account.id}`, {
        ...currentFav,
        product: currentFav.product.id
      }, {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then(() => setFavoriteBooks(favoriteBooks.concat(currentFav)))
      .then(() => setCurrentFav(emptyFavorite))
      .then(() => setLoading(false));
  }, [token, currentFav]);

  const removeFromFavorite = useCallback(() => {
    axiosInstance
      .delete(`http://127.0.0.1:8000/favorite_book/${currentFav.id}`, {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then(() => setFavoriteBooks(favoriteBooks.filter((fav) => fav.product.id !== currentFav.product.id)))
      .then(() => setCurrentFav(emptyFavorite))
      .then(() => setLoading(false));
  }, [token, currentFav]);

  const getFavoriteBooks = useCallback(() => {
    axiosInstance
      .get(`http://127.0.0.1:8000/favorite/${account.id}`, {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then((resp) => resp.data)
      .then((data) => data.map((fav: Favorite) => ({...fav, product: fixBookData(fav.product)})))
      .then(setFavoriteBooks)
      .then(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    setLoading(true);
    getFavoriteBooks();
  }, [favoriteBooks.length, getFavoriteBooks]);

  useEffect(() => {
    if(currentFav.id >= 0 && account.id >= 0) {
      setLoading(true);
      !isBookFavorite(currentFav.product.id) ? addToFavorite() : removeFromFavorite();
    }
  }, [currentFav, addToFavorite, removeFromFavorite]);

  return (
    <FavoriteContext.Provider value={{
      favoriteBooks,
      loading,
      markAsFavotite,
      isBookFavorite
    }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export {useFavorite, FavoriteProvider};
