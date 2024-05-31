/* eslint-disable react-hooks/exhaustive-deps */
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
import dayjs from 'dayjs';

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
  birthdate: dayjs(),
  last_name: '',
  is_staff: false,
  is_active: false,
  is_superuser: false
};

const defaultAccountValue = {
  account: emptyAccount,
  loading: false,
  error: false,
  reviews: [emptyReview],
  updateAccount: (update: object) => {},
  logInOrOut: (info: LogInInfo) => {},
  updateUser: (newUserInfo: User) => {},
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
  const [error, setError] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const token = getCookie('csrftoken');

  const updateAccount = (update: object) => {
    const updatedAccount: User = {
      ...account,
      ...update
    }
    setAccount(updatedAccount);
  };

  const logInOrOut = (info: LogInInfo) => {
    setLogInInfo(info);
  };

  const updateUser = (newUserInfo: User) => {
    setNewAccount(newUserInfo);
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
      birthdate: dayjs(data.birthdate)
    });
  };

  const getResponceFromUser = useCallback((user: User) => {
    return ({
        ...user, 
        user_status: user.user_status.title,
        user_directions: user.user_directions.map((theme) => theme.title),
        location: user.location.city,
        birthdate: user.birthdate.format('YYYY-MM-DD'),
        is_active: true
      }
    );
  }, []);

  const getUser = async (username: string) => {
    const user: User = await axiosInstance.get(`http://ratchekx.beget.tech/users/user/${username}`, {
      headers: {
        'X-CSRFToken': getCookie('csrftoken')
      }
    })
    .then((resp) => resp.data)
    .then((data: UserResponce) => getUserFromResponce(data));

    return user;
  };

  const postLogIn = useCallback(() => {
    axiosInstance
      .post('http://ratchekx.beget.tech/users/login', logInInfo, {
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        }
      })
      .then((resp) => resp.data)
      .then((data) => getUser(data.username))
      .then((user) => setAccount(user))
      .then(() => setLogInInfo({username: '', password: ''}))
      .then(() => navigate('/account/basket'))
      .then(() => setError(false))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [logInInfo, getResponceFromUser, token]);

  const postLogOut = useCallback(() => {
    axiosInstance
      .post('http://ratchekx.beget.tech/users/logout', logInInfo, {
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        }
      })
      .then(() => setLogInInfo({username: '', password: ''}))
      .then(() => setAccount(emptyAccount))
      .then(() => navigate('/log-in'))
      .then(() => setLoading(false));
  }, []);

  const postNewAccount = useCallback(() => {
    axiosInstance
      .post('http://ratchekx.beget.tech/users/register', getResponceFromUser(newAccount), {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then(() => updateAccount(newAccount))
      .then(() => setLoading(false))
      .then(() => navigate('/account/basket'));
  }, [newAccount, token]);

  const putEditedAccount = useCallback(() => {
    axiosInstance
      .put(`http://ratchekx.beget.tech/users/update_profile/${newAccount.id}`, getResponceFromUser(newAccount), {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then(() => updateAccount(newAccount))
      .then(() => setLoading(false))
      .then(() => navigate('/account/basket'));
  }, [newAccount, token]);
  
  const getReviews = useCallback(() => {
    axiosInstance
      .get(`http://ratchekx.beget.tech/${account.id}/reviews`, {
        headers: {
          'X-CSRFToken': token
        }
      })
      .then((resp) => resp.data)
      .then((data) => setReviews(data.map((r: Review) => ({...r, positiveVotes: randomInteger(0, 100), negativeVotes: randomInteger(0, 100)}))))
      .then(() => setLoading(false));
  }, [account, token]);

  useEffect(() => {
    if(logInInfo.username) {
      setLoading(true);
      account.id < 0 ? postLogIn() : postLogOut();
    }
  }, [postLogIn, logInInfo]);

  useEffect(() => {
    if(newAccount.id >= 0) {
      setLoading(true);
      account.id < 0 ? postNewAccount() : putEditedAccount();
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
      error,
      reviews,
      updateAccount,
      logInOrOut,
      updateUser,
      getUserFromResponce,
      getResponceFromUser}}>
        {children}
    </AccountContext.Provider>
  );
};

export {useAccount, AccountProvider, emptyAccount};
