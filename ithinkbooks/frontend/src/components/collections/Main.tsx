import React from 'react';
import themes from '../mock/themes.json';
import { Link } from 'react-router-dom';

const Main: React.FC<{}> = () => (
  <>
    <div>
      <div style={{width: 850, height: 500, backgroundColor: '#B3B3B3'}}></div>
      <div>
        <div style={{width: 400, height: 225, backgroundColor: '#B3B3B3'}}></div>
        <div style={{width: 400, height: 225, backgroundColor: '#B3B3B3'}}></div>
      </div>
    </div>
    <div>
      {themes.map((theme, i) => (
        <div key={i}>
          <img src='#' alt={theme.name}/>
          <Link to='/s'>{theme.shortName}</Link>
        </div>
      ))}
    </div>
  </>
);

export default Main;
