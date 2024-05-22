import React from 'react';
import '../../css/Quiz.css';
import {QuizProvider} from '../hooks/QuizProvider';
import { Outlet } from 'react-router-dom';

const QuizPage: React.FC<{}> = () => (
      <div className='quiz-page'>
        <Outlet/>
      </div>
  );

export default QuizPage;
