/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import mockQuiz from '../roadmap/quiz.json';
import { Answer, AnswerToQuestion, Quiz } from '../types/Quiz';
import themes from '../mock/themes.json';
import Theme from '../types/Theme';
import axiosInstance from '../Axios';

const defaultResponce: AnswerToQuestion = {
  question: mockQuiz.question[0],
  answer: {
    id: 0,
    text: '',
    answer_value: -1
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
  finishQuiz: () => {},
  loading: false
};

const QuizContext = createContext(defaultQuizContext);

const useQuiz = () => useContext(QuizContext);

const QuizProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [quiz, setQuiz] = useState<Quiz>(mockQuiz);
  const [theme, setTheme] = useState<string>(themes[0].title);
  const [loading, setLoading] = useState<boolean>(false);

  const [responces, setResponces] = useState<AnswerToQuestion[]>([]);

  const [responce, setResponce] = useState<AnswerToQuestion>(defaultResponce);

  const [questionNumber, setQuestionNumber] = useState<number>(0);

  const [isFinished, setFinish] = useState<boolean>(false);

  const updateQuiz = (data: Quiz) => {
    setQuiz(data);
    setResponces(data.question.map((question) => ({
      question,
      answer: {
        id: 0,
        text: '',
        answer_value: -1
      },
      isCompleted: false
    })));
  };

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme.title);
  };

  const sendResponce = () => {
    setResponces(responces.map((r, i) => i === questionNumber ? responce : r));
    moveToQuestion(questionNumber + 1);
  };

  const updateResponce = (answer: Answer) => {
    setResponce({...responce, answer, isCompleted: true});
  };

  const isEveryQuestionCompleted = () => responces.every((responce) => responce.isCompleted);

  const moveToQuestion = (number: number) => {
    const next = number >= quiz.question.length ? number % quiz.question.length : number;
    setQuestionNumber(next);
    setResponce(responces[next]);
  };

  const finishQuiz = () => {
    setFinish(true);
  };

  const getQuiz = useCallback(() => {
    axiosInstance
      .get('http://127.0.0.1:8000/quiz')
      .then((resp) => resp.data[0])
      .then(updateQuiz)
      .then(() => setLoading(false));
  }, []);

  const postQuizResult = useCallback(() => {
    const data = responces.map((r) => (
      {question_id: r.question.id, answer_id: r.answer.id}
    ));

    axiosInstance
      .post(`http://127.0.0.1:8000/quiz/quizes/${quiz.id}/vote`, data)
      .then((resp) => console.log(resp.data))
      .then(() => setLoading(false))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    getQuiz();
  }, [theme, getQuiz]);

  useEffect(() => {
    if(isFinished) {
      setLoading(true);
      postQuizResult();
    }
  }, [isFinished, postQuizResult]);

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
      finishQuiz,
      loading}}>
        {children}
    </QuizContext.Provider>
  );
};

export {QuizProvider, useQuiz};
