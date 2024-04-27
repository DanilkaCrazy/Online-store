interface Answer {
  id: number;
  text: string;
  answer_value: number;
};

interface Question {
  id: number;
  text: string;
  question_type: string;
  answer: Answer[];
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

export type {Quiz, Question, Answer, AnswerToQuestion};
