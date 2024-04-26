import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { personalAccount } from '../mock/mock';
import User from '../User';
import Order from '../Order';
import cities from '../mock/cities.json';
import statuses from '../mock/statuses.json';
import axios from 'axios';

const emptyAccount: User = {
  id: -1,
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
  loading: false,
  updateAccount: (update: object) => {},
  putInBasket: (bookId: number) => {},
  removeFromBasket: (bookId: number) => {},
  cleanBasket: () => {},
  markAsFavotite: (bookId: number) => {},
  addOrder: (order: Order) => {},
  removeOrder: (order: Order) => {},
  addReview: (reviewId: number) => {},
  removeReview: (reviewId: number) => {},
  updateOrder: (updatedOrder: Order) => {},
  hasRoadmap: (roadmapId: string) => false,
  addRoadmap: (roadmapId: string) => {},
  removeRoadmap: (roadmapId: string) => {},
  logIn: (user: User) => {},
  logOut: (user: User) => {},
  signUp: (user: User) => {},
};

const AccountContext = createContext(defaultAccountValue);

const useAccount = () => useContext(AccountContext);

const AccountProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [account, setAccount] = useState<User>(personalAccount);
  const [newAccount, setNewAccount] = useState<User>(emptyAccount);

  const [loading, setLoading] = useState<boolean>(false);

  const updateAccount = (update: object) => {
    const updatedAccount: User = {
      ...account,
      ...update
    }
    setAccount(updatedAccount);
  };

  const putInBasket = (bookId: number) => {
    updateAccount({
      booksInBasket: account.booksInBasket.concat(bookId)
    });
  };

  const removeFromBasket = (bookId: number) => {
    updateAccount({
      booksInBasket: account.booksInBasket.filter((id) => id !== bookId)
    });
  };

  const cleanBasket = () => {
    updateAccount({
      booksInBasket: []
    });
  };

  const markAsFavotite = (bookId: number) => {
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

  const addReview = (reviewId: number) => {
    updateAccount({reviews: account.reviews.concat(reviewId)});
  };

  const removeReview = (reviewId: number) => {
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

  const logIn = (user: User) => {
    updateAccount(user);
  };

  const logOut = () => {
    updateAccount(emptyAccount);
  }

  const signUp = (newUser: User) => {
    setNewAccount(newUser);
  };

  /*const postLogin = useCallback(() => {
    axios
      .post('http://127.0.0.1:8000/users/login', account)
      .then((resp) => resp.data)
      .then(() => setLoading(false));
  }, [account]);

  const postLogout = useCallback(() => {
    axios
      .post('http://127.0.0.1:8000/users/logout', account)
      .then((resp) => console.log(resp.data))
      .then(() => setLoading(false));
  }, [account]);

  const postSignUp = useCallback(() => {
    axios
      .post('http://127.0.0.1:8000/users/register',newAccount)
      .then((resp) => console.log(resp.data))
      .then(() => setLoading(false));
  }, [newAccount]);

  useEffect(() => {
    setLoading(true);
    if(account.id < 0) {
      postLogout();
    } else {
      postLogin();
    }
  }, [postLogin, postLogout, account]);

  useEffect(() => {
    if(newAccount.id >= 0) {
      setLoading(true);
      postSignUp();
    }
  }, [postSignUp, newAccount]);*/

  return (
    <AccountContext.Provider value={{
      account, 
      loading,
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
      removeRoadmap,
      logIn,
      logOut,
      signUp}}>
        {children}
    </AccountContext.Provider>
  );
};

export {useAccount, AccountProvider, emptyAccount};
