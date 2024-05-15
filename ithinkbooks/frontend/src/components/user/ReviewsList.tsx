import React from 'react';
import ReviewComponent from '../books/Review';
import { useAccount } from '../hooks/AccountProvider';

const ReviewsList: React.FC<{}> = () => {
  const {reviews} = useAccount();

  return (
    <div className='reviews-page reviews'>
      {reviews.map((review, i) => <ReviewComponent key={i} review={review}/>)}
    </div>
  );
};

export default ReviewsList;
