interface Answer {
  text: string;
  value: number;
  bottomLine?: number;
  topLine?: number;
};

interface Question {
  text: string;
  type: string;
  answers: Answer[];
};

interface Quiz {
  title: string;
  theme: string;
  questions: Question[];
};

interface AnswerToQuestion {
  question: Question;
  answer: Answer;
  isCompleted: boolean;
}

export type {Quiz, Question, Answer, AnswerToQuestion};
