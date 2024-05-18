import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { User, UserResponce } from '../types/User';
import cities from '../mock/cities.json';
import statuses from '../mock/statuses.json';
import themes from '../mock/themes.json';
import Review, { emptyReview } from '../types/Review';
import { useLocation, useNavigate } from 'react-router-dom';
import LogInInfo from '../types/LogInInfo';
import axiosInstance, { getCookie } from '../Axios';
import { randomInteger } from '../mock/mock';

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
  markAsFavotite: (bookId: number) => {},
  addReview: (review: Review) => {},
  removeReview: (reviewId: number) => {},
  logIn: (info: LogInInfo) => {},
  logOut: (user: User) => {},
  signUp: (user: User) => {},
  editAccount: (changeUser: User) => {},
  getUserFromResponce: (data: UserResponce) => {},
  getResponceFromUser: (user: User) => {}
};

const AccountContext = createContext(defaultAccountValue);

const useAccount = () => useContext(AccountContext);

const AccountProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [account, setAccount] = useState<User>(emptyAccount);
  const [newAccount, setNewAccount] = useState<User>(emptyAccount);
  const [logInInfo, setLogInInfo] = useState<LogInInfo>({username: '', password: ''});

  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const token = getCookie('csrftoken');

  const updateAccount = (update: object) => {
    const updatedAccount: User = {
      ...account,
      ...update
    }
    setAccount(updatedAccount);
  };

  const markAsFavotite = (bookId: number) => {
    /*const bookIndex = account.favoriteBooks.indexOf(bookId);

    updateAccount({
      favoriteBooks: bookIndex < 0 ? account.favoriteBooks.concat(bookId) : account.favoriteBooks.filter((id) => id !== bookId)
    })*/
  };

  const addReview = (review: Review) => {
    /*updateAccount({reviews: account.reviews.concat(review.id)});
    setReviews(reviews.concat(review));*/
  };

  const removeReview = (reviewId: number) => {
    //updateAccount({reviews: account.reviews.filter((r) => r !== reviewId)});
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

  const editAccount = (changeUser: User) => {
    setNewAccount(changeUser);
  };

  // data fetch

  const getUserFromResponce = (data: UserResponce) => {
    const changes = {
      user_status: statuses.find((s) => s.title === data.user_status), 
      user_directions: themes.filter((t) => data.user_directions.includes(t.title)),
      location: cities.find((c) => c.city === data.location),
    }

    return ({
      ...data,
      user_status: !changes.user_status ? statuses[0] : changes.user_status, 
      user_directions: !changes.user_directions ? [] : changes.user_directions,
      location: !changes.location ? cities[0] : changes.location,
      birthdate: new Date(data.birthdate)
    });
  };

  const getResponceFromUser = useCallback((user: User) => {
    return ({
        ...user, 
        user_status: user.user_status.title,
        user_directions: user.user_directions.map((theme) => theme.title),
        location: user.location.city,
        birthdate: `${user.birthdate.getFullYear()}-${user.birthdate.getMonth()}-${user.birthdate.getDay()}`,
        is_active: true
      }
    );
  }, []);

  const getUser = async (username: string) => {
    const user: User = await axiosInstance.get(`http://127.0.0.1:8000/users/user/${username}`, {
      headers: {
        'X-CSRFToken': token
      }
    })
    .then((resp) => resp.data)
    .then((data: UserResponce) => getUserFromResponce(data));

    return user;
  };

  const postLogIn = useCallback(() => {
    axiosInstance
      .post('http://127.0.0.1:8000/users/login', logInInfo, {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then((resp) => resp.data)
      .then((data) => getUser(data.username))
      .then((user) => setAccount(user))
      .then(() => setLogInInfo({username: '', password: ''}))
      .then(() => navigate('/account/basket'))
      .then(() => setLoading(false));
  }, [logInInfo, getResponceFromUser]);

  const postNewAccount = useCallback(() => {
    axiosInstance
      .post('http://127.0.0.1:8000/users/register', getResponceFromUser(newAccount), {
        headers: {
          'X-CSRFToken': token
        },
        formSerializer: {
          indexes: null
        }
      })
      .then(() => updateAccount(newAccount))
      .then(() => setLoading(false))
      .then(() => navigate('/account/basket'))
      .catch((reason) => console.log(reason));
  }, [newAccount]);
  
  const getReviews = useCallback(() => {
    axiosInstance
      .get(`http://127.0.0.1:8000/${account.id}/reviews`)
      .then((resp) => resp.data)
      .then((data) => setReviews(data.map((r: Review) => ({...r, positiveVotes: randomInteger(0, 100), negativeVotes: randomInteger(0, 100)}))))
      .then(() => setLoading(false));
  }, [account]);

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

  useEffect(() => {
    if(location.pathname.includes('reviews')) {
      getReviews();
    }
  }, [location.pathname, getReviews])

  return (
    <AccountContext.Provider value={{
      account, 
      loading,
      reviews,
      updateAccount, 
      markAsFavotite,
      addReview,
      removeReview,
      logIn,
      logOut,
      signUp,
      editAccount,
      getUserFromResponce,
      getResponceFromUser}}>
        {children}
    </AccountContext.Provider>
  );
};

export {useAccount, AccountProvider, emptyAccount};
