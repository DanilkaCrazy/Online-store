import React, { ReactNode, createContext, useContext, useState } from 'react';
import { personalAccount } from '../mock/mock';
import User from '../User';
import Order from '../Order';
import { nanoid } from 'nanoid';
import cities from '../mock/cities.json';
import statuses from '../mock/statuses.json';

const emptyAccount: User = {
  id: nanoid(),
  login: '',
  password: '',
  name: '',
  avatar: '',
  bio: '',
  status: statuses[0],
  branches: [],
  reviewsAmount: 0,
  city: cities[0],
  reviews: [],
  orders: [],
  booksInBasket: [],
  favoriteBooks: [],
  email: '',
  phoneNumber: '',
  birthdate: new Date(),
  roadmaps: []
}

const defaultAccountValue = {
  account: emptyAccount,
  updateAccount: (update: object) => {},
  putInBasket: (bookId: string) => {},
  removeFromBasket: (bookId: string) => {},
  cleanBasket: () => {},
  markAsFavotite: (bookId: string) => {},
  addOrder: (order: Order) => {},
  removeOrder: (order: Order) => {},
  addReview: (reviewId: string) => {},
  removeReview: (reviewId: string) => {},
  updateOrder: (updatedOrder: Order) => {},
  hasRoadmap: (roadmapId: string) => false,
  addRoadmap: (roadmapId: string) => {},
  removeRoadmap: (roadmapId: string) => {}
};

const AccountContext = createContext(defaultAccountValue);

const useAccount = () => useContext(AccountContext);

const AccountProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [account, setAccount] = useState<User>(personalAccount);

  const updateAccount = (update: object) => {
    const updatedAccount: User = {
      ...account,
      ...update
    }
    setAccount(updatedAccount);
  };

  const putInBasket = (bookId: string) => {
    updateAccount({
      booksInBasket: account.booksInBasket.concat(bookId)
    });
  };

  const removeFromBasket = (bookId: string) => {
    updateAccount({
      booksInBasket: account.booksInBasket.filter((id) => id !== bookId)
    });
  };

  const cleanBasket = () => {
    updateAccount({
      booksInBasket: []
    });
  };

  const markAsFavotite = (bookId: string) => {
    const bookIndex = account.favoriteBooks.indexOf(bookId);

    updateAccount({
      favoriteBooks: bookIndex < 0 ? account.favoriteBooks.concat(bookId) : account.favoriteBooks.filter((id) => id !== bookId)
    })
  };

  const addOrder = (order: Order) => {
    updateAccount({orders: account.orders.concat(order)});
  };

  const removeOrder = (order: Order) => {
    updateAccount({orders: account.orders.filter((o) => o.id !== order.id)});
  };

  const updateOrder = (updatedOrder: Order) => {
    account.orders = account.orders.map((order) => order.id === updatedOrder.id ? updatedOrder : order);
  };

  const addReview = (reviewId: string) => {
    updateAccount({reviews: account.reviews.concat(reviewId)});
  };

  const removeReview = (reviewId: string) => {
    updateAccount({reviews: account.reviews.filter((r) => r !== reviewId)});
  };

  const hasRoadmap = (roadmapId: string) => account.roadmaps.includes(roadmapId);

  const addRoadmap = (roadmapId: string) => {
    if(!hasRoadmap(roadmapId)) {
      updateAccount({roadmaps: account.roadmaps.concat(roadmapId)});
    }
  };

  const removeRoadmap = (roadmapId: string) => {
    if(hasRoadmap(roadmapId)) {
      updateAccount({roadmaps: account.roadmaps.filter((id) => id !== roadmapId)});
    }
  };

  return (
    <AccountContext.Provider value={{
      account, 
      updateAccount, 
      putInBasket, 
      removeFromBasket, 
      cleanBasket, 
      markAsFavotite, 
      addOrder, 
      removeOrder,
      updateOrder,
      addReview,
      removeReview,
      hasRoadmap,
      addRoadmap,
      removeRoadmap}}>
        {children}
    </AccountContext.Provider>
  );
};

export {useAccount, AccountProvider, emptyAccount};
