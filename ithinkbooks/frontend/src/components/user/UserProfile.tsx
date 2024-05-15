import React from 'react';
import User from '../User';
import { DesktopImages } from '../ui/ImagesCollection';
import { declineNounAfterNumber } from '../utils';
import EditorImage from '../../images/pages/Pen.svg';
import { Link } from 'react-router-dom';
import { getAge } from '../date-utils';

const Status: React.FC<{title: string, name: string}> = ({title, name}) => (
  <div className='status'>
    <img src={DesktopImages.find((image) => image.theme === title)?.image} alt={name}/>
    <h3>{name}</h3>
  </div>
);

const Job: React.FC<{title: string, shortName: string}> = ({title, shortName}) => (
  <div className='job'>
    <div className='job-icon'><img src={DesktopImages.find((image) => image.theme === title)?.image} alt={shortName}/></div>
    <h3>{shortName}</h3>
  </div>
);

const UserProfile: React.FC<{user: User, isPersonal?: boolean}> = ({user, isPersonal = false}) => {
  const age = getAge(user.birthdate);

  return (
    <div className='user-profile'>
      <Link to='/editor' className='editor-button' hidden={!isPersonal}>
        <img src={EditorImage} alt='Редактировать профиль'/>
      </Link>

      <div className='user-avatar-holder'>
        <img className='user-avatar' src={user.image} alt={user.first_name}/>
      </div>

      <div className='user-bio'>
        <h1>{user.first_name}</h1>
        <p className='main-p secondary-color'>{user.about_self}</p>
        <p className='main-p secondary-color'>{`${age} ${declineNounAfterNumber(age, 'год', 'года', 'лет')}`}</p>
        <p className='main-p secondary-color' hidden={!isPersonal}>{user.location.city}</p>
      </div>

      <div className='user-statuses'>
        <Status title={user.user_status.title} name={user.user_status.name}/>
        {user.user_directions.map((theme, i) => <Job key={i} title={theme.title} shortName={theme.shortName}/>)}
      </div>
    </div>
  );
};

export default UserProfile;
