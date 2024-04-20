import React, { ReactNode, createContext, useContext, useState } from 'react';
import mockQuiz from '../roadmap/quiz.json';
import { Answer, AnswerToQuestion, Quiz } from '../Quiz';
import themes from '../mock/themes.json';
import Theme from '../Theme';

const defaultResponce: AnswerToQuestion = {
  question: mockQuiz.questions[0],
  answer: {
    text: '',
    value: -1
  },
  isCompleted: false
};

const defaultQuizContext = {
  quiz: mockQuiz,
  updateTheme: (newTheme: Theme) => {},
  responces: [defaultResponce],
  sendResponce: () => {},
  responce: defaultResponce,
  updateResponce: (answer: Answer) => {},
  isEveryQuestionCompleted: () => false,
  questionNumber: 0,
  moveToQuestion: (number: number) => {},
  finishQuiz: () => {}
};

const QuizContext = createContext(defaultQuizContext);

const useQuiz = () => useContext(QuizContext);

const QuizProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [quiz, setQuiz] = useState<Quiz>(mockQuiz);
  const [theme, setTheme] = useState<string>(themes[0].title);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme.title);
  };

  const [responces, setResponces] = useState<AnswerToQuestion[]>(quiz.questions.map((question) => ({
    question,
    answer: {
      text: '',
      value: -1
    },
    isCompleted: false
  })));

  const [responce, setResponce] = useState<AnswerToQuestion>(defaultResponce);

  const [questionNumber, setQuestionNumber] = useState<number>(0);

  const [isFinished, setFinish] = useState<boolean>(false);

  const sendResponce = () => {
    setResponces(responces.map((r, i) => i === questionNumber ? responce : r));
    moveToQuestion(questionNumber + 1);
  };

  const updateResponce = (answer: Answer) => {
    setResponce({...responce, answer, isCompleted: true});
  };

  const isEveryQuestionCompleted = () => responces.every((responce) => responce.isCompleted);

  const moveToQuestion = (number: number) => {
    const next = number >= quiz.questions.length ? number % quiz.questions.length : number;
    setQuestionNumber(next);
    setResponce(responces[next]);
  };

  const finishQuiz = () => {
    setFinish(true);
  };

  return (
    <QuizContext.Provider value={{
      quiz,
      updateTheme,
      responces, 
      sendResponce, 
      responce,
      updateResponce, 
      isEveryQuestionCompleted, 
      questionNumber, 
      moveToQuestion, 
      finishQuiz}}>
        {children}
    </QuizContext.Provider>
  );
};

export {QuizProvider, useQuiz};
