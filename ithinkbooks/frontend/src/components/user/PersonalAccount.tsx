import React from 'react';
import { personalAccount } from '../mock/mock';
import { Link, Outlet } from 'react-router-dom';

const PersonalAccount: React.FC<{}> = () => (
  <>
    <img src={personalAccount.avatar} alt={personalAccount.name}/>
    <h1>{personalAccount.name}</h1>
    <p>{personalAccount.bio}</p>
    <p>{personalAccount.age}</p>
    <p>{personalAccount.city}</p>
    <h3>{personalAccount.status}</h3>
    {personalAccount.branches.map((branch, i) => <h2 key={i}>{branch.name}</h2>)}
    
    <ul>
      <li><Link to='basket'>Корзина</Link></li>
      <li><Link to='favorities'>Избранное</Link></li>
      <li><Link to='history'>История покупок</Link></li>
      <li><Link to='roadmaps'>Роадмапы</Link></li>
      <li><Link to='reviews'>Рецензии</Link></li>
    </ul>

    <Outlet/>
  </>
);

export default PersonalAccount;
