import React from 'react';
import '../../css/Quiz.css';
import {QuizProvider} from '../hooks/QuizProvider';
import { Outlet } from 'react-router-dom';

const QuizPage: React.FC<{}> = () => (
    <QuizProvider>
      <div className='quiz-page'>
        <Outlet/>
      </div>
    </QuizProvider>
  );

export default QuizPage;
