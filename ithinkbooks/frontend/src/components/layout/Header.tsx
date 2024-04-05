import React from 'react';
import Logo from '../../images/header/Logo.svg';
import SearchIcon from '../../images/header/Search.svg';
import DarkMode from '../../images/header/Dark.svg';
import StarIcon from '../../images/header/Star.svg';
import BasketIcon from '../../images/header/Basket.svg';
import AccountIcon from '../../images/header/Account.svg';
import Arrow from '../../images/header/Arrow.svg';
import '../../css/Header.css';
import {Link, Outlet} from 'react-router-dom';
import { useLightMode } from '../hooks/LightModeProvider';

const Header: React.FC<{}> = () => {
  const {toggleLightMode} = useLightMode();

  return (
    <header>
      <Link to='/'><img className='logo' src={Logo} alt='IThink books'/></Link>
      <button className='catalog'>
          <p>Каталог</p>
          <img src={Arrow} alt=''/>
      </button>
      <div className='search'>
        <input type='text' placeholder='Поиск'/>
        <img src={SearchIcon} alt='Найти'/>
      </div>
      <Link to='/roadmap' className='main-button'>Построить роадмап</Link>
      <button onClick={toggleLightMode}><img src={DarkMode} alt='Тёмный режим'/></button>
      <Link to='/account/favorities'><img src={StarIcon} alt='Избранное'/></Link>
      <Link to='/account/basket'><img src={BasketIcon} alt='Корзина'/></Link>
      <Link to='/account/basket'><img src={AccountIcon} alt='Личный кабиент'/></Link>
      <Outlet/>
    </header>
  );
};

export default Header;
