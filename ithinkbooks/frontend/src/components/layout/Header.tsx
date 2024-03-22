import React from 'react';
import {Link, Outlet} from 'react-router-dom';

const Header: React.FC<{}> = () => (
  <nav>
    <Link to='/'>IThink books</Link>
    <button>
      <div>
        <p>Каталог</p>
      </div>
    </button>
    <div>
      <input type='text' placeholder='Поиск'/>
    </div>
    <Link to='roadmap'>Построить роадмап</Link>
    <button>Dark</button>
    <Link to='account/favorities'>Favs</Link>
    <Link to='account/basket'>Bsk</Link>
    <Link to='acoount'>Acc</Link>
    <Outlet/>
  </nav>
);

export default Header;
