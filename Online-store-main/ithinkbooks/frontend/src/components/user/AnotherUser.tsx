import React from 'react';
import {useParams} from 'react-router-dom';
import { users } from '../mock/mock';
import Stub from '../layout/Stub';
import { declineNounAfterNumber } from '../utils';

const AnotherUser: React.FC<{}> = () => {
  const {id} = useParams();
  const intId = !id ? -1 : parseInt(id);
  const user = users.find((u) => u.id === intId);

  if(!user) {
    return <Stub pageName='Error'/>
  }

  return(
    <>
      <img src={user.avatar} alt={user.name}/>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      <h3>{user.status.name}</h3>
      {user.branches.map((branch, i) => <h2 key={i}>{branch.name}</h2>)}
      <h2>{user.reviewsAmount} {declineNounAfterNumber(user.reviewsAmount, 'отзыв', 'отзыва', 'отзывов')}</h2>
    </>
  );
}; 

export default AnotherUser;
