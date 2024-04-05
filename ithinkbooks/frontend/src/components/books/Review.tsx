import React from 'react';
import Review from '../Review';
import Star from './Star';
import VoteArrow from '../../images/pages/desktop/VoteArrow.svg';
import '../../css/Review.css';

const ReviewComponent: React.FC<{review: Review}> = ({review}) => {
  const votingResult = review.positiveVotes - review.negativeVotes;

  return (
    <div className='review-block'>
      <div className='review-user'>
        <div className='review-user-name'>
          <img src={review.user.avatar} alt={review.user.name}></img>
          <p className='secondary-p'>{review.user.name}</p>
        </div>
        <div className='review-user-status'>
          <img src={review.user.avatar} alt={review.user.status}></img>
          <p className='secondary-p'>{review.user.status}</p>
        </div>
      </div>
      <div className='review'>
        <Star rating={review.rating}/>
        <p className='price-p'>{review.title}</p>
        <p className='main-p'>{review.text}</p>
        <div className='review-voting'>
          <button className='secondary-button vote-button'><img className='arrow-up' src={VoteArrow} alt='За'/></button>
          <p className={`secondary-p ${votingResult > 0 ? 'highlighted-p' : ''}`}>{votingResult > 0 ? `+${votingResult}` : votingResult}</p>
          <button className='secondary-button vote-button'><img className='arrow-down' src={VoteArrow} alt='Против'/></button>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
