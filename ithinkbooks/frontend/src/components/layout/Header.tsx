import React from 'react';
import Logo from '../../images/header/Logo.svg';
import DarkMode from '../../images/header/Dark.svg';
import LightMode from '../../images/header/Light.svg';
import StarIcon from '../../images/header/Star.svg';
import BasketIcon from '../../images/header/Basket.svg';
import AccountIcon from '../../images/header/Account.svg';
import '../../css/Header.css';
import {Link, Outlet} from 'react-router-dom';
import { useLightMode } from '../hooks/LightModeProvider';
import { Button, Dropdown } from 'react-bootstrap';
import Theme from '../types/Theme';
import themes from '../mock/themes.json';
import { useAccount } from '../hooks/AccountProvider';
import Search from './Search';

const Catalog: React.FC<{themes: Theme[]}> = ({themes}) => (
  <Dropdown className='dropdown-header'>
    <Dropdown.Toggle>Каталог</Dropdown.Toggle>
    <Dropdown.Menu className='dropdown-menu-header'>
      {themes.map((theme, i) => <Dropdown.Item as={Button} key={i}><Link to={`/themes/${theme.title}`}>{theme.shortName}</Link></Dropdown.Item>)}
    </Dropdown.Menu>
  </Dropdown>
);

const Header: React.FC<{}> = () => {
  const {toggleLightMode, isDark} = useLightMode();
  const {account} = useAccount();

  return (
    <header>
      <Link to='/'><img className='logo' src={Logo} alt='IThink books'/></Link>
      <Catalog themes={themes}/>
      <Search/>
      <Link to='/quiz/theme' className='main-button'>Построить роадмап</Link>
      <button onClick={toggleLightMode}><img src={!isDark ? DarkMode : LightMode} alt='Тёмный режим'/></button>
      <Link to={account.id < 0 ? '/log-in' : '/account/favorities'}><img src={StarIcon} alt='Избранное'/></Link>
      <Link to={account.id < 0 ? '/log-in' : '/account/basket'}><img src={BasketIcon} alt='Корзина'/></Link>
      <Link to={account.id < 0 ? '/log-in' : '/account/basket'}><img src={AccountIcon} alt='Личный кабиент'/></Link>
      <Outlet/>
    </header>
  );
};

export default Header;
