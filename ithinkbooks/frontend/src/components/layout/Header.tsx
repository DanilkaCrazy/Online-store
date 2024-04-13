import React, { useState } from 'react';
import Logo from '../../images/header/Logo.svg';
import SearchIcon from '../../images/header/Search.svg';
import DarkMode from '../../images/header/Dark.svg';
import StarIcon from '../../images/header/Star.svg';
import BasketIcon from '../../images/header/Basket.svg';
import AccountIcon from '../../images/header/Account.svg';
import '../../css/Header.css';
import {Link, Outlet} from 'react-router-dom';
import { useLightMode } from '../hooks/LightModeProvider';
import { Button, Dropdown } from 'react-bootstrap';
import Theme from '../Theme';
import themes from '../mock/themes.json';
import { mockBooks } from '../mock/mock';
import Book from '../Book';
import SmallBookComponent from '../books/SmallBookComponent';

const SEARCH_INTERVAL = 750;

const Catalog: React.FC<{themes: Theme[]}> = ({themes}) => (
  <Dropdown className='dropdown-header'>
    <Dropdown.Toggle>Каталог</Dropdown.Toggle>
    <Dropdown.Menu className='dropdown-menu-header'>
      {themes.map((theme, i) => <Dropdown.Item as={Button} key={i}><Link to={`/${theme.title}`}>{theme.shortName}</Link></Dropdown.Item>)}
    </Dropdown.Menu>
  </Dropdown>
);

const Search: React.FC<{}> = () => {
  const [foundBooks, setFoundBooks] = useState<Book[]>([]);
  const [seacrhWord, setSearchWord] = useState<string>('');

  const findBooks = (bookTitle: string) => {
    setSearchWord(bookTitle);
    setTimeout(() => setFoundBooks(mockBooks.filter((book) => book.title.toLowerCase().includes(bookTitle))), SEARCH_INTERVAL);
  };

  return (
    <div className='search-panel'>
      <div className='search'>
        <input type='text' value={seacrhWord} placeholder='Поиск' onChange={(evt: React.ChangeEvent<HTMLInputElement>) => findBooks(evt.target.value.toLowerCase())}/>
        <img src={SearchIcon} alt='Найти'/>
      </div>
      <div className='search-result' hidden={seacrhWord === ''}>
        {foundBooks.length 
          ? foundBooks.slice(0, 3).map((book, i) => <SmallBookComponent key={i} book={book} onClick={() => setSearchWord('')}/>)
          : <p className='main-p'>Ничего не найдено</p>}
      </div>
    </div>
  );
};

const Header: React.FC<{}> = () => {
  const {toggleLightMode} = useLightMode();

  return (
    <header>
      <Link to='/'><img className='logo' src={Logo} alt='IThink books'/></Link>
      <Catalog themes={themes}/>
      <Search/>
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
