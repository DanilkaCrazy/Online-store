import React, { useState } from 'react';
import { TextField, TextareaField } from '../ui/FormFields';
import Review, { emptyReview } from '../types/Review';
import { ChangingStar } from './Star';
import { useAccount } from '../hooks/AccountProvider';
import { useBooks } from '../hooks/BooksProvider';
import { randomInteger } from '../mock/mock';
import { getRandomId } from '../utils';

const ReviewForm: React.FC<{ 
  bookId: number,
  setFormOpened: React.Dispatch<React.SetStateAction<boolean>>
}> = ({bookId, setFormOpened}) => {
  const {account, addReview} = useAccount();
  const {addBookReview} = useBooks();
  const [newReview, setNewReview] = useState<Review>({...emptyReview, user: account, id: getRandomId(), product: bookId});

  const onRatingChange = ((star: number) => {
    setNewReview({...newReview, star});
  });

  const onFormSubmit = () => {
    addReview(newReview);
    addBookReview(newReview);
    setFormOpened(false);
  };

  const onFormCancel = () => {
    setFormOpened(false);
    setNewReview(emptyReview);
  };

  return (
    <div className='review-from review-block'>
      <TextField
        fieldHeader='Тема'
        type='text'
        placeholder='Введите тему'
        isValid
        warning=''
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setNewReview({...newReview, title: evt.target.value})}/>
      
      <TextareaField
        fieldHeader='Отзыв'
        placeholder='Введите отзыв'
        onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => setNewReview({...newReview, text: evt.target.value})}/>

      <div className='rating-field'>
        <h3>Оценка</h3>
        <ChangingStar
          rating={newReview.star}
          onChange={onRatingChange}/>
      </div>

      <div className='buttons-group'>
        <button className='main-button' onClick={onFormSubmit}>Опубликовать</button>
        <button className='secondary-button' onClick={onFormCancel}>Отменить</button>
      </div>
    </div>
  );
};

export default ReviewForm;
