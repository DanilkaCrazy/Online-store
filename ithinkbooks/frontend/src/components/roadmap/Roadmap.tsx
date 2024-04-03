import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Quiz.css';

const Roadmap: React.FC<{onExit: React.DispatchWithoutAction}> = ({onExit}) => (
  <div className='quiz'>
    <h1>Страница с построенным роадмапом</h1>
    <Link className='main-button roadmap-button' to='/account/roadmaps' onClick={onExit}>Сохранить</Link>
  </div>
);

export default Roadmap;
