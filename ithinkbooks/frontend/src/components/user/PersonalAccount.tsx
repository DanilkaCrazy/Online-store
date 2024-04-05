import React from 'react';
import { personalAccount } from '../mock/mock';
import { Link, Outlet, useLocation } from 'react-router-dom';
import UserProfile from './UserProfile';
import '../../css/User.css';

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
  const pageLocation = useLocation();
  const paths = pageLocation.pathname.split('/');
  const currentPage = paths[paths.length - 1];

  return (
    <div className='divided-page user-page'>
      <UserProfile user={personalAccount} isPersonal/>

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
