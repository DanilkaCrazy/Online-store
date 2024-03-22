import React from 'react';
import User from '../User';

interface Review {
  id: string;
  rating: number;
  title: string;
  text: string;
  user: User;
  positiveVotes: number;
  negativeVotes: number;
  book: string;
}

const ReviewComponent: React.FC<{review: Review}> = ({review}) => (
  <div>
    <div>
      <img src={review.user.avatar} alt={review.user.name}></img>
      <p>{review.user.name}</p>
    </div>
    <div>
      <img src={review.user.avatar} alt={review.user.status}></img>
      <p>{review.user.status}</p>
    </div>
    <div>
      <p>{review.rating} / 5</p>
      <h3>{review.title}</h3>
      <p>{review.text}</p>
      <div>
        <p>{review.positiveVotes - review.negativeVotes}</p>
      </div>
    </div>
  </div>
);

export default ReviewComponent;
