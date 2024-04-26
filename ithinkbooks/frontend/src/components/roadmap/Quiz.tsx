import React from 'react';
import { Answer, AnswerToQuestion, Question } from '../Quiz';
import { useQuiz } from '../hooks/QuizProvider';
import { Link } from 'react-router-dom';

const AnswerBlock: React.FC<{
  answer: Answer, 
  questionId: number, 
  responce: AnswerToQuestion,
  updateResponce: (answer: Answer) => void
}> = ({answer, questionId, responce, updateResponce}) => (
  <label className={`answer ${responce.answer.answer_value === answer.answer_value ? 'highlight-label': ''}`} htmlFor={answer.id.toString()}>
    <input 
      type='radio' 
      value={answer.answer_value} 
      id={answer.id.toString()} 
      name={questionId.toString()} 
      onChange={() => updateResponce(answer)}
      checked={responce.answer.answer_value === answer.answer_value}/>
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
        {question.answer.map((answer, i) => (
          <AnswerBlock 
            key={i} 
            answer={answer} 
            questionId={question.id}
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
  const {questionNumber, moveToQuestion, responces, quiz, loading} = useQuiz();

  if(loading) {
    return (
      <h2>Загрузка...</h2>
    );
  }
  return (
    <>
      <h2>{quiz.name}</h2>

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

        <QuestionBlock question={quiz.question[questionNumber]}/>
      </div>
    </>
  );
};

export default Quiz;
