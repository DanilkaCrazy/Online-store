import React from 'react';
import { personalAccount, reviews } from '../mock/mock';
import ReviewComponent from '../books/Review';

const ReviewsList: React.FC<{}> = () => {
  const foundReviews = reviews.filter((review) => personalAccount.reviews.some((bookId) => bookId === review.bookId));

  if(!foundReviews.length) {
    return (
      <div className='reviews-page'>
        <h2>Вы ещё не оставляли отзывов</h2>
      </div>
    );
  }

  return (
    <div className='reviews-page reviews'>
      {foundReviews.map((review, i) => <ReviewComponent key={i} review={review}/>)}
    </div>
  );
};

export default ReviewsList;
