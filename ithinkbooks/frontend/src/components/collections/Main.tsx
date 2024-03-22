/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import themes from '../mock/themes.json';
import { Link } from 'react-router-dom';

const Main: React.FC<{}> = () => (
  <>
    <h2>Тематики:</h2>
    <div>
      {themes.map((theme, i) => (
        <div key={i}>
          <img src='#'/>
          <Link to={`/${theme.title}`}>{theme.shortName}</Link>
        </div>
      ))}
    </div>
  </>
);

export default Main;
