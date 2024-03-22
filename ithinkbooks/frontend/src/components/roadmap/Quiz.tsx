import React from 'react';
import { Link } from 'react-router-dom';

const Quiz: React.FC<{onComplete: React.DispatchWithoutAction}> = ({onComplete}) => (
  <>
    <h1>Страница тестирования для построения роадмапа</h1>
    <Link to='/roadmap' onClick={onComplete}>Завершить</Link>
  </>
); 

export default Quiz;
