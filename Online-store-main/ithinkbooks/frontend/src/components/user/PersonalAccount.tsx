import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import UserProfile from './UserProfile';
import '../../css/User.css';
import { useAccount } from '../hooks/AccountProvider';

const ProfilePages = {
  BASKET: {
    TITLE: 'basket',
    TRANSLATION: 'Корзина'
  },
  FAVORITIES: {
    TITLE: 'favorities',
    TRANSLATION: 'Избранное'
  },
  HISTORY: {
    TITLE: 'history',
    TRANSLATION: 'История покупок'
  },
  ROADMAPS: {
    TITLE: 'roadmaps',
    TRANSLATION: 'Роадмапы'
  },
  REVIEWS: {
    TITLE: 'reviews',
    TRANSLATION: 'Отзывы'
  }
};

const PersonalAccount: React.FC<{}> = () => {
  const {account} = useAccount();
  const pageLocation = useLocation();
  const paths = pageLocation.pathname.split('/');
  const currentPage = paths[paths.length - 1];

  return (
    <div className='divided-page user-page'>
      <UserProfile user={account} isPersonal/>

      <div className='tab'>
        <div className='tab-buttons'>
          {Object.values(ProfilePages).map((page, i) => (
            <Link 
              key={i}
              to={page.TITLE} 
              className={currentPage === page.TITLE ? 'main-button' : 'secondary-button'}>
                {page.TRANSLATION}
            </Link>
          ))}
        </div>
        <Outlet/>
      </div>
    </div>
  );
};

export default PersonalAccount;
