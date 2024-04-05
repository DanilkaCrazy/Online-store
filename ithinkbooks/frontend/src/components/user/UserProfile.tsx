import React from 'react';
import User from '../User';

const Status: React.FC<{title: string, name: string}> = ({title, name}) => (
  <div className='status'>
    <div className={`cover-stumb ${title}`}></div>
    <h3>{name}</h3>
  </div>
);

const UserProfile: React.FC<{user: User, isPersonal?: boolean}> = ({user, isPersonal = false}) => (
  <div className='user-profile'>
    <img className='user-avatar' src={user.avatar} alt={user.name}/>
    <div className='user-bio'>
      <h1>{user.name}</h1>
      <p className='main-p secondary-color'>{user.bio}</p>
      <p className='main-p secondary-color'>{user.age}</p>
      <p className='main-p secondary-color' hidden={!isPersonal}>{user.city}</p>
    </div>
    <div className='user-statuses'>
      <Status title={user.status.title} name={user.status.name}/>
      {user.branches.map((theme, i) => <Status key={i} title={theme.title} name={theme.shortName}/>)}
    </div>
  </div>
);

export default UserProfile;
