import React from 'react';
import { reviews } from '../mock/mock';
import ReviewComponent from '../books/Review';
import { useAccount } from '../hooks/AccountProvider';

const ReviewsList: React.FC<{}> = () => {
  const {account} = useAccount();
  const foundReviews = reviews.filter((review) => account.reviews.some((bookId) => bookId === review.bookId));

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
