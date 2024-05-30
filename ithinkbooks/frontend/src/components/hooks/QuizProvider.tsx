/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import mockQuiz from '../roadmap/quiz.json';
import { Answer, AnswerToQuestion, Quiz } from '../types/Quiz';
import themes from '../mock/themes.json';
import Theme from '../types/Theme';
import axiosInstance, { getCookie } from '../Axios';
import { Roadmap, emptyRoadmap } from '../types/Roadmap';
import { useLocation, useNavigate } from 'react-router-dom';

const defaultResponce: AnswerToQuestion = {
  question: mockQuiz.question[0],
  answer: {
    id: 0,
    text: '',
    answer_value: -1
  },
  isCompleted: false
};

const emptyRoadmaps: Roadmap[] = [];

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
  loading: false,
  getRoadmap: (roadmapId: number) => emptyRoadmap,
  roadmaps: emptyRoadmaps,
  deleteRoadmap: (roadmapId: number) => {}
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

  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [deletedRoadmap, setDeletedRoadmap] = useState<number>(-1);

  const navigate = useNavigate();
  const location = useLocation();

  //const token = getCookie('csrftoken'); ?

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

  const getRoadmap = (roadmapId: number) => roadmaps[roadmapId];

  const deleteRoadmap = (roadmapId: number) => {
    setDeletedRoadmap(roadmapId);
  };

  // data fetch

  const getQuiz = useCallback(() => {
    axiosInstance
      .get('http://ratchekx.beget.tech/quiz', {
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        }
      })
      .then((resp) => resp.data[0])
      .then((data) => {
        updateQuiz(data);
        return data;
      })
      .then((data) => setResponce({...defaultResponce, question: data.question[0]}))
      .then(() => setLoading(false));
  }, []);

  const getRoadmaps = useCallback((redirect = false) => {
    axiosInstance
      .get('http://ratchekx.beget.tech/quiz/user_roadmaps', {
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        }
      })
      .then((resp) => resp.data)
      .then((data) => {
        setRoadmaps(data);
        return data;
      })
      .then((data) => {
        if(redirect) {
          navigate(`/roadmaps/${data[data.length - 1].id}`)
        }
      })
      .then(() => setLoading(false))
  }, []);

  const postQuizResult = useCallback((resps: AnswerToQuestion[]) => {
    const data = resps.map((r) => (
      {question_id: r.question.id, answer_id: r.answer.id}
    ));

    axiosInstance
      .post(`http://ratchekx.beget.tech/quiz/quizes/${quiz.id}/vote`, data, {
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        }
      })
      .then(() => setResponces([]))
      .then(() => setResponce(defaultResponce))
      .then(() => setFinish(false))
      .then(() => getRoadmaps(true))
      .catch(console.error);
  }, []);

  const deleteRoadmapFromServer = useCallback((roadmapId: number) => {
    axiosInstance
      .delete(`http://ratchekx.beget.tech/quiz/roadmap/${roadmapId}`, {
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        }
      })
      .then(() => setDeletedRoadmap(-1))
      .then(() => getRoadmaps());
  }, []);

  useEffect(() => {
    setLoading(true);
    getQuiz();
  }, [theme, getQuiz]);

  useEffect(() => {
    if(isFinished) {
      setLoading(true);
      postQuizResult(responces);
    }
  }, [isFinished, postQuizResult]);

  useEffect(() => {
    if(location.pathname === '/account/roadmaps') {
      setLoading(true);
      getRoadmaps();
    }
  }, [location.pathname]);

  useEffect(() => {
    if(deletedRoadmap >= 0) {
      setLoading(true);
      deleteRoadmapFromServer(deletedRoadmap);
    }
  }, [deletedRoadmap])

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
      loading,
      getRoadmap,
      roadmaps,
      deleteRoadmap}}>
        {children}
    </QuizContext.Provider>
  );
};

export {QuizProvider, useQuiz};
