/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
//import mockQuiz from '../roadmap/quiz.json';
import { Answer, AnswerToQuestion, Quiz, emptyQuiz } from '../types/Quiz';
import themes from '../mock/themes.json';
import Theme from '../types/Theme';
import axiosInstance, { getCookie } from '../Axios';
import { Roadmap, emptyRoadmap } from '../types/Roadmap';
import { useLocation, useNavigate } from 'react-router-dom';
import { EXCLUDED_QUESTION_TYPE } from '../utils';

const defaultResponce: AnswerToQuestion = {
  question: emptyQuiz.question[0],
  answer: {
    id: 0,
    text: '',
    answer_value: ''
  },
  isCompleted: false
};

const emptyRoadmaps: Roadmap[] = [];

const defaultQuizContext = {
  quiz: emptyQuiz,
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
  const [quiz, setQuiz] = useState<Quiz>(emptyQuiz);
  const [theme, setTheme] = useState<string>(themes[0].title);
  const [loading, setLoading] = useState<boolean>(false);

  const [responces, setResponces] = useState<AnswerToQuestion[]>([]);
  const [responce, setResponce] = useState<AnswerToQuestion>(defaultResponce);
  const [themeResponce, setThemeResponce] = useState<AnswerToQuestion | undefined>(undefined);
  const [questionNumber, setQuestionNumber] = useState<number>(0);

  const [isFinished, setFinish] = useState<boolean>(false);

  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [deletedRoadmap, setDeletedRoadmap] = useState<number>(-1);

  const navigate = useNavigate();
  const location = useLocation();

  //const token = getCookie('csrftoken'); ?

  const updateQuiz = (data: Quiz) => {
    const newResponces = data.question.map((question) => {
      if(question.question_type === EXCLUDED_QUESTION_TYPE) {
        const foundAnswer = question.answer.find((answer) => answer.answer_value === data.quiz_theme);

        return ({
          question,
          answer: !foundAnswer 
            ? {
              id: 0,
              text: '',
              answer_value: ''
            }
            : foundAnswer,
          isCompleted: true
        });
      }

      return ({
        question,
        answer: {
          id: 0,
          text: '',
          answer_value: ''
        },
        isCompleted: false
      });
    });

    setThemeResponce(newResponces.find((r) => r.question.question_type === EXCLUDED_QUESTION_TYPE))
    setResponces(newResponces.filter((r) => r.question.question_type !== EXCLUDED_QUESTION_TYPE));

    setQuiz({
      ...data,
      question: data.question.filter((q) => q.question_type !== EXCLUDED_QUESTION_TYPE)
    });
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

  const filterQuestions = (quiz: Quiz, quizTheme: string): Quiz => ({
    ...quiz,
    quiz_theme: quizTheme,
    question: quiz.question.filter((question) => question.specific_question_type === 'all' || question.specific_question_type === quizTheme)
  });

  const getQuiz = useCallback((quizTheme: string) => {
    axiosInstance
      .get('http://127.0.0.1:8000/quiz', {
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        }
      })
      .then((resp) => resp.data[0])
      .then((data) => {
        updateQuiz(filterQuestions(data, quizTheme));
        return data;
      })
      .then((data) => setResponce({...defaultResponce, question: data.question[0]}))
      .then(() => setLoading(false));
  }, []);

  const getRoadmaps = useCallback((redirect = false) => {
    axiosInstance
      .get('http://127.0.0.1:8000/quiz/user_roadmaps', {
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
      .post(`http://127.0.0.1:8000/quiz/quizes/${quiz.id}/vote`, data, {
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
      .delete(`http://127.0.0.1:8000/quiz/roadmap/${roadmapId}`, {
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        }
      })
      .then(() => setDeletedRoadmap(-1))
      .then(() => getRoadmaps());
  }, []);

  useEffect(() => {
    setLoading(true);
    getQuiz(theme);
  }, [theme, getQuiz]);

  useEffect(() => {
    if(isFinished) {
      setLoading(true);
      postQuizResult(!themeResponce ? responces : responces.concat(themeResponce));
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
