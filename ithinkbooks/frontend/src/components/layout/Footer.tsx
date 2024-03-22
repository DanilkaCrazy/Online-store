import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import themes from '../mock/themes.json';
import Theme from '../Theme';

const Commercial: React.FC<{}> = () => (
  <div>
    <Link to='/'>IThink books</Link>
    <div>
      <h4>Контакты:</h4>
      <ul>
        <li>Telegram</li>
        <li>VK</li>
        <li>WhatsApp</li>
      </ul>
    </div>
    <div>
      <h4>Партнёры:</h4>
      <ul>
        <li>mockup inc.</li>
        <li>something & co</li>
      </ul>
    </div>
  </div>
);

const Catalog: React.FC<{themes: Array<Theme>}> = ({themes}) => (
  <div>
    <h4>Каталог:</h4>
    <ul>
      {themes.map((theme, i) => <li key={i}><Link to={theme.title}>{theme.name}</Link></li>)}
    </ul>
  </div>
);

const FAQ: React.FC<{}> = () => (
  <div>
    <h4>Помощь:</h4>
    <ul>
      <Link to='faq/roadmap-help'>Составление роадмапа</Link>
      <Link to='faq/payment'>Оплата и доставка</Link>
      <Link to='faq'>Вопросы и ответы</Link>
      <Link to='faq/feedback'>Обратная связь</Link>
    </ul>
  </div>
);

const Footer: React.FC<{}> = () => (
  <div>
    <Commercial/>
    <Catalog themes={themes}/>
    <FAQ/>
    <Outlet/>
  </div>
);

export default Footer;
