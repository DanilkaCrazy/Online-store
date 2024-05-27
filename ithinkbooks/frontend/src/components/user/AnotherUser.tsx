import React from 'react';
import {useParams} from 'react-router-dom';
import Stub from '../layout/Stub';

const AnotherUser: React.FC<{}> = () => {
  /*const {id} = useParams();
  const intId = !id ? -1 : parseInt(id);
  const user = users.find((u) => u.id === intId);

  if(!user) {
    return <Stub pageName='Error'/>
  }

  return(
    <>
      <img src={user.image} alt={user.first_name}/>
      <h1>{user.first_name}</h1>
      <p>{user.about_self}</p>
      <h3>{user.user_status.name}</h3>
      {user.user_directions.map((branch, i) => <h2 key={i}>{branch.name}</h2>)}
    </>
  );*/
  return <></>;
}; 

export default AnotherUser;
