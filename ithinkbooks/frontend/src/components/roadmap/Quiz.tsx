import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Quiz.css';

const Quiz: React.FC<{onComplete: React.DispatchWithoutAction}> = ({onComplete}) => (
  <div className='quiz'>
    <h1>Страница тестирования для построения роадмапа</h1>
    <Link className='main-button roadmap-button' to='/roadmap' onClick={onComplete}>Завершить</Link>
  </div>
); 

export default Quiz;
