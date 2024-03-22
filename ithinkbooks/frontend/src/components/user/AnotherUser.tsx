import React from 'react';
import {useParams} from 'react-router-dom';
import { users } from '../mock/mock';
import Stub from '../layout/Stub';
import { getPluralNoun } from '../utils';

const AnotherUser: React.FC<{}> = () => {
  const {id} = useParams();
  const user = users.find((u) => u.id === id);

  if(!user) {
    return <Stub pageName='Error'/>
  }

  return(
    <>
      <img src={user.avatar} alt={user.name}/>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      <p>{user.age}</p>
      <h3>{user.status}</h3>
      {user.branches.map((branch, i) => <h2 key={i}>{branch.name}</h2>)}
      <h2>{user.reviewsAmount} {getPluralNoun(user.reviewsAmount, 'отзыв', 'отзыва', 'отзывов')}</h2>
    </>
  );
}; 

export default AnotherUser;
