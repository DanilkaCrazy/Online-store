import React from 'react';
import ReviewComponent from '../books/Review';
import { useAccount } from '../hooks/AccountProvider';

const ReviewsList: React.FC<{}> = () => {
  const {reviews, loading} = useAccount();

  if(!reviews.length || loading) {
    return (
      <div className='reviews-page'>
        <h2>Вы ещё не оставляли отзывы у нас</h2>
      </div>
    );
  }

  return (
    <div className='reviews-page reviews'>
      {reviews.map((review, i) => <ReviewComponent key={i} review={review}/>)}
    </div>
  );
};

export default ReviewsList;
