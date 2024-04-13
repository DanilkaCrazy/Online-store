import React, { useState } from 'react';
import { TextField, TextareaField } from '../ui/FormFields';
import Review from '../Review';
import { ChangingStar } from './Star';
import { useAccount } from '../hooks/AccountProvider';
import { useBooks } from '../hooks/BooksProvider';

const ReviewForm: React.FC<{ 
  bookId: string
  emptyReview: Review 
  setFormOpened: React.Dispatch<React.SetStateAction<boolean>>
}> = ({bookId, emptyReview, setFormOpened}) => {
  const {addReview} = useAccount();
  const {addBookReview} = useBooks();
  const [newReview, setNewReview] = useState<Review>(emptyReview);

  const onRatingChange = ((rating: number) => {
    setNewReview({...newReview, rating});
  });

  const onFormSubmit = () => {
    addReview(newReview.id);
    addBookReview(bookId, newReview);
    setFormOpened(false);
  };

  const onFormCancel = () => {
    setFormOpened(false);
    setNewReview(emptyReview);
  };

  return (
    <form className='review-from review-block'>
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
          rating={newReview.rating}
          onChange={onRatingChange}/>
      </div>

      <div className='buttons-group'>
          <button className='main-button' onClick={onFormSubmit}>Опубликовать</button>
          <button className='secondary-button' onClick={onFormCancel}>Отменить</button>
        </div>
    </form>
  );
};

export default ReviewForm;
