import React from 'react';
import Review from '../Review';
import Star from './Star';
import VoteArrow from '../../images/pages/desktop/VoteArrow.svg';
import '../../css/Review.css';
import Book from '../Book';
import { books } from '../mock/mock';
import User from '../User';
import { DesktopImages } from '../ui/ImagesCollection';

const Reviewer: React.FC<{user: User}> = ({user}) => (
  <div className='review-user'>
    <div className='review-user-name'>
      <img src={user.avatar} alt={user.name}></img>
      <p className='secondary-p'>{user.name}</p>
    </div>
    <div className='review-user-status'>
      <img src={DesktopImages.find((image) => image.theme === user.status.title)?.image} alt={user.status.name}></img>
      <p className='secondary-p'>{user.status.name}</p>
    </div>
  </div>
);

const ReviewedBook: React.FC<{book: Book | undefined}> = ({book}) => { 
  if(!book) {
    return <></>
  }

  return (
    <div className='review-book'>
      <div className='cover-stumb'></div>
      <p className='secondary-p'>{book.title}</p>
    </div>
  );
};

const ReviewComponent: React.FC<{review: Review, isInBookPage?: boolean}> = ({review, isInBookPage = false}) => {
  const votingResult = review.positiveVotes - review.negativeVotes;

  return (
    <div className='review-block'>
      {isInBookPage 
      ? <Reviewer user={review.user}/>
      : <ReviewedBook book={books.find((book) => book.id === review.bookId)}/>}
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
