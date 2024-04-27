/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import themes from '../mock/themes.json';
import Theme from '../Theme';
import '../../css/Footer.css';
import Logo from '../../images/footer/Logo Footer.svg';
import TelegramIcon from '../../images/footer/telegram.svg';
import VkIcon from '../../images/footer/vk.svg';
import WhatsappIcon from '../../images/footer/whatsapp.svg';
import Partner1 from '../../images/footer/MOCKUP Inc.png';
import Partner2 from '../../images/footer/Something & co.png';

const Commercial: React.FC<{}> = () => (
  <div className='footer-part'>
    <Link to='/' className='logo'><img src={Logo} alt='IThink books'/></Link>
    <div className='contacts-block'>
      <h3>Контакты:</h3>
      <ul className='contacts'>
        <li><a href='#'><img src={TelegramIcon} alt='Telegram'/></a></li>
        <li><a href='#'><img src={VkIcon} alt='VK'/></a></li>
        <li><a href='#'><img src={WhatsappIcon} alt='WhatsApp'/></a></li>
      </ul>
    </div>
    <div className='partners-block'>
      <h3>Партнёры:</h3>
      <ul className='partners'>
        <li><a href='#'><img width={138} src={Partner1} alt='Mockup Inc.'/></a></li>
        <li><a href='#'><img width={149} src={Partner2} alt='Something & co'/></a></li>
      </ul>
    </div>
  </div>
);

const Catalog: React.FC<{themes: Array<Theme>}> = ({themes}) => (
  <div className='footer-part'>
    <h3>Каталог:</h3>
    <ul className='footer-nav'>
      {themes.map((theme, i) => <li key={i}><Link to={`/themes/${theme.title}`}>{theme.name}</Link></li>)}
    </ul>
  </div>
);

const FAQ: React.FC<{}> = () => (
  <div className='footer-part'>
    <h3>Помощь:</h3>
    <ul className='footer-nav'>
      <li><Link to='/roadmap-help'>Составление роадмапа</Link></li>
      <li><Link to='/payment'>Оплата и доставка</Link></li>
      <li><Link to='/faq'>Вопросы и ответы</Link></li>
      <li><Link to='/feedback'>Обратная связь</Link></li>
    </ul>
  </div>
);

const Footer: React.FC<{}> = () => (
  <footer>
    <Commercial/>
    <Catalog themes={themes}/>
    <FAQ/>
    <Outlet/>
  </footer>
);

export default Footer;
