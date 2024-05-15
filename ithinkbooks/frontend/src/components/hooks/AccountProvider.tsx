import React, { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { personalAccount } from '../mock/mock';
import User from '../User';
import Order from '../Order';
import cities from '../mock/cities.json';
import statuses from '../mock/statuses.json';
import themes from '../mock/themes.json';
import Review, { emptyReview } from '../Review';
import Book from '../Book';
import { useLocation, useNavigate } from 'react-router-dom';
import LogInInfo from '../LogInInfo';
import axiosInstance from '../Axios';

const emptyAccount: User = {
  id: -1,
  username: '',
  password: '',
  first_name: '',
  image: '',
  about_self: '',
  user_status: statuses[0],
  user_directions: [],
  location: cities[0],
  email: '',
  phone_number: '',
  birthdate: new Date(),
  last_name: '',
  is_staff: false,
  is_active: false,
  is_superuser: false
};

const defaultAccountValue = {
  account: emptyAccount,
  loading: false,
  reviews: [emptyReview],
  updateAccount: (update: object) => {},
  addImage: (data: FormData) => {},
  putInBasket: (book: Book) => {},
  removeFromBasket: (bookId: number) => {},
  cleanBasket: () => {},
  markAsFavotite: (bookId: number) => {},
  addOrder: (order: Order) => {},
  removeOrder: (order: Order) => {},
  addReview: (review: Review) => {},
  removeReview: (reviewId: number) => {},
  updateOrder: (updatedOrder: Order) => {},
  hasRoadmap: (roadmapId: string) => false,
  addRoadmap: (roadmapId: string) => {},
  removeRoadmap: (roadmapId: string) => {},
  logIn: (info: LogInInfo) => {},
  logOut: (user: User) => {},
  signUp: (user: User) => {},
};

const AccountContext = createContext(defaultAccountValue);

const useAccount = () => useContext(AccountContext);

const AccountProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [account, setAccount] = useState<User>(personalAccount);
  const [newAccount, setNewAccount] = useState<User>(emptyAccount);
  const [logInInfo, setLogInInfo] = useState<LogInInfo>({username: '', password: ''});

  const location = useLocation();
  const endpoint = location.pathname.split('/').pop();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const [imageData, setImageData] = useState<FormData | undefined>(undefined);
  const [booksInBasket, setBooksInBasket] = useState<Book[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]); //mock reviews 

  const updateAccount = (update: object) => {
    const updatedAccount: User = {
      ...account,
      ...update
    }
    setAccount(updatedAccount);
  };

  const addImage = (data: FormData) => {
    setImageData(data);
  };

  const putInBasket = (book: Book) => {
    setBooksInBasket([...booksInBasket, book]);
  };

  const removeFromBasket = (bookId: number) => {
    setBooksInBasket(booksInBasket.filter((book) => book.id !== bookId));
  };

  const cleanBasket = () => {
    setBooksInBasket([]);
  };

  const markAsFavotite = (bookId: number) => {
    /*const bookIndex = account.favoriteBooks.indexOf(bookId);

    updateAccount({
      favoriteBooks: bookIndex < 0 ? account.favoriteBooks.concat(bookId) : account.favoriteBooks.filter((id) => id !== bookId)
    })*/
  };

  const addOrder = (order: Order) => {
    //updateAccount({orders: account.orders.concat(order)});
  };

  const removeOrder = (order: Order) => {
    //updateAccount({orders: account.orders.filter((o) => o.id !== order.id)});
  };

  const updateOrder = (updatedOrder: Order) => {
    //account.orders = account.orders.map((order) => order.id === updatedOrder.id ? updatedOrder : order);
  };

  const addReview = (review: Review) => {
    /*updateAccount({reviews: account.reviews.concat(review.id)});
    setReviews(reviews.concat(review));*/
  };

  const removeReview = (reviewId: number) => {
    //updateAccount({reviews: account.reviews.filter((r) => r !== reviewId)});
  };

  const hasRoadmap = (roadmapId: string) => /*account.roadmaps.includes(roadmapId)*/ false;

  const addRoadmap = (roadmapId: string) => {
    if(!hasRoadmap(roadmapId)) {
      //updateAccount({roadmaps: account.roadmaps.concat(roadmapId)});
    }
  };

  const removeRoadmap = (roadmapId: string) => {
    if(hasRoadmap(roadmapId)) {
      //updateAccount({roadmaps: account.roadmaps.filter((id) => id !== roadmapId)});
    }
  };

  const logIn = (info: LogInInfo) => {
    setLogInInfo(info);
  };

  const logOut = () => {
    updateAccount(emptyAccount);
  }

  const signUp = (newUser: User) => {
    setNewAccount(newUser);
  };

  // account fetch
  const getAccount = useCallback(() =>  {
    axiosInstance
      .get(`http://127.0.0.1:8000/users/user/${logInInfo.username}`)
      .then((resp) => resp.data)
      .then((data) => setAccount(
        {
          ...data, 
          user_status: statuses.find((s) => s.title === data.user_status), 
          user_directions: themes.filter((t) => data.user_directions.includes(t.title)),
          location: cities.find((c) => c.city === data.location),
          birthdate: new Date(data.birthdate)
        }
      ))
      .then(() => setLogInInfo({username: '', password: ''}))
      .then(() => navigate('/account/basket'))
      .catch(console.error);
  }, [logInInfo]);

  const postLogIn = useCallback(() => {
    axiosInstance
      .post('http://127.0.0.1:8000/users/login', logInInfo)
      .then(resp => console.log(resp.data))
      .then(() => getAccount())
      .catch((err) => console.error(err));
  }, [logInInfo, getAccount]);

  const postNewAccount = useCallback(() => {
    axiosInstance
      .post('http://127.0.0.1:8000/users/register', {
        ...newAccount, 
        user_status: newAccount.user_status.title,
        user_directions: newAccount.user_directions.map((theme) => theme.title),
        location: newAccount.location.city,
        birthdate: `${newAccount.birthdate.getFullYear()}-${newAccount.birthdate.getMonth()}-${newAccount.birthdate.getDay()}`,
        image: imageData?.get('image')
      })
      .then((resp) => console.log(resp.data))
      .then(() => updateAccount(newAccount))
      .then(() => setImageData(undefined))
      .then(() => setLoading(false))
      .then(() => navigate('/account/basket'))
  }, [newAccount]);
  
  useEffect(() => {
    if(logInInfo.username) {
      console.log(logInInfo);
      setLoading(true);
      postLogIn()
    }
  }, [postLogIn, account, logInInfo]);

  useEffect(() => {
    if(newAccount.id >= 0) {
      console.log(newAccount);
      setLoading(true);
      postNewAccount();
    }
  }, [postNewAccount, newAccount]);

  // basket fetch

  const getBooksInBasket = useCallback(() => {
    axiosInstance
      .get('http://127.0.0.1:8000/cart/items')
      .then((resp) => console.log(resp.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if(endpoint === 'basket') {
      getBooksInBasket();
    }
  }, [getBooksInBasket, endpoint]);

  return (
    <AccountContext.Provider value={{
      account, 
      loading,
      reviews,
      updateAccount, 
      addImage,
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
