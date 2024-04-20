import React from 'react';
import { Answer, AnswerToQuestion, Question } from '../Quiz';
import { useQuiz } from '../hooks/QuizProvider';
import { Link } from 'react-router-dom';

const AnswerBlock: React.FC<{
  answer: Answer, 
  questionType: string, 
  responce: AnswerToQuestion,
  updateResponce: (answer: Answer) => void
}> = ({answer, questionType, responce, updateResponce}) => (
  <label className={`answer ${responce.answer.value === answer.value ? 'highlight-label': ''}`} htmlFor={answer.value.toString()}>
    <input 
      type='radio' 
      value={answer.value} 
      id={answer.value.toString()} 
      name={questionType} 
      onChange={() => updateResponce(answer)}
      checked={responce.answer.value === answer.value}/>
    <p className='main-p'>{answer.text}</p>
  </label>
);

const QuestionBlock: React.FC<{ question: Question }> = ({question}) => { 
  const {questionNumber, sendResponce, updateResponce, responce, finishQuiz, isEveryQuestionCompleted} = useQuiz();

  const onQuestionComplete = () => {
    sendResponce();
  };

  return (
    <div className='question'>
      <h3>{questionNumber + 1}. {question.text}</h3>

      <div className='answers-block'>
        {question.answers.map((answer, i) => (
          <AnswerBlock 
            key={i} 
            answer={answer} 
            questionType={question.type}
            responce={responce}
            updateResponce={updateResponce}/>
        ))}
      </div>

      <div className='buttons-group'>
        <button 
          onClick={onQuestionComplete} 
          className='main-button'
          disabled={!responce.isCompleted}>
            Ответить
        </button>
        <Link 
          to='/roadmap'
          onClick={finishQuiz}
          className='secondary-button'
          hidden={!isEveryQuestionCompleted()}>
            Завершить
        </Link>
      </div>
    </div>
  );
};

const Quiz: React.FC<{}> = () => {
  const {questionNumber, moveToQuestion, responces, quiz} = useQuiz();

  return (
    <>
      <h2>{quiz.title}</h2>

      <div className='quiz-inner-page quiz'>
        <div className='quiz-pagination'>
          {responces.map((responce, i) => (
            <button
            key={i}
            className={i === questionNumber ? 'main-button' : `secondary-button ${responce.isCompleted ? 'highlighted-button' : ''}`}
            onClick={() => moveToQuestion(i)}>
              {i + 1}
            </button>
          ))}
        </div>

        <QuestionBlock question={quiz.questions[questionNumber]}/>
      </div>
    </>
  );
};

export default Quiz;
