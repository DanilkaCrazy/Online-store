interface Answer {
  id: number;
  text: string;
  answer_value: string;
};

interface Question {
  id: number;
  text: string;
  question_type: string;
  answer: Answer[];
  specific_question_type: string;
};

interface Quiz {
  id: number;
  name: string;
  quiz_theme: string;
  question: Question[];
};

interface AnswerToQuestion {
  question: Question;
  answer: Answer;
  isCompleted: boolean;
}

const emptyQuiz: Quiz = {
  id: 1,
  name: '',
  quiz_theme: 'OT',
  question: [
    {
      id: 2,
      text: '',
      question_type: '',
      answer: [],
      specific_question_type: 'all'
    }
  ]
}

export type {Quiz, Question, Answer, AnswerToQuestion};
export {emptyQuiz};
