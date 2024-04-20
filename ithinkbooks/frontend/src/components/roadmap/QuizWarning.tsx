import React from 'react';
import Warning from '../../images/pages/Warning.svg';
import { Link } from 'react-router-dom';

const QuizWarning: React.FC<{}> = () => (
  <>
    <h2>Вы не можете построить ещё один роадмап</h2>
    <div className='quiz-inner-page quiz-warning'>
      <img src={Warning} alt='Предупреждение'/>
      <h3 className='normal-h3'>У Вас уже построено 3 роадмапа. 
        Если Вы хотите составить новый, то придётся расстаться с одним из старых :&#40;</h3>
      
      <div className='buttons-group'>
        <Link className='main-button' to='/account/roadmaps'>Список роадмапов</Link>
      </div>
    </div>
  </>
  );

export default QuizWarning;
