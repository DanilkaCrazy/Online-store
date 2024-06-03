interface Answer {
  id: number;
  text: string;
  answer_value: number | string;
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
  quiz_theme: 'other',
  question: [
    {
      id: 2,
      text: "Оцените свой уровень знаний в этой области.",
      question_type: "level",
      specific_question_type: "all",
      answer: [
        {
          id: 1,
          text: "Новичок (только начинаю знакомство с этим);",
          answer_value: 1
        },
        {
          id: 2,
          text: "Средний (есть базовые знания, но хотелось бы их расширить);",
          answer_value: 2
        },
        {
          id: 3,
          text: "Профессионал (обладаю продвинутыми знаниями).",
          answer_value: 3
        }
      ]
    }
  ]
}

export type {Quiz, Question, Answer, AnswerToQuestion};
export {emptyQuiz};
