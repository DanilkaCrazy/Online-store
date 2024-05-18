import React from 'react';
import Review from '../types/Review';
import {Star} from './Star';
import VoteArrow from '../../images/pages/desktop/VoteArrow.svg';
import '../../css/Review.css';
import Book from '../types/Book';
import { User } from '../types/User';
import { DesktopImages } from '../ui/ImagesCollection';
import { useBooks } from '../hooks/BooksProvider';

const Reviewer: React.FC<{user: User}> = ({user}) => (
  <div className='review-user'>
    <div className='review-user-name'>
      <img src={user.image} alt={user.first_name}></img>
      <p className='secondary-p'>{user.first_name}</p>
    </div>
    <div className='review-user-status'>
      <img src={DesktopImages.find((image) => image.theme === user.user_status.title)?.image} alt={user.user_status.name}></img>
      <p className='secondary-p'>{user.user_status.name}</p>
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
      <p className='secondary-p'>{book.name}</p>
    </div>
  );
};

const ReviewComponent: React.FC<{review: Review, isInBookPage?: boolean}> = ({review, isInBookPage = false}) => {
  const {books, loading} = useBooks();
  const votingResult = review.positiveVotes - review.negativeVotes;

  if(loading) {
    return (
      <div className='review-block'>
        <h2>Загрузка...</h2>
      </div>
    );
  }

  return (
    <div className='review-block'>
      {isInBookPage
      ? <></>
      : <ReviewedBook book={books.find((book) => book.id === review.product)}/>}
      <div className='review'>
        <Star rating={review.star}/>
        <p className='price-p'>{review.title}</p>
        <p className='main-p'>{review.text}</p>
        {/*<div className='review-voting'>
          <button className='secondary-button vote-button'><img className='arrow-up' src={VoteArrow} alt='За'/></button>
          <p className={`secondary-p ${votingResult > 0 ? 'highlighted-p' : ''}`}>{votingResult > 0 ? `+${votingResult}` : votingResult}</p>
          <button className='secondary-button vote-button'><img className='arrow-down' src={VoteArrow} alt='Против'/></button>
        </div>*/}
      </div>
    </div>
  );
};

export default ReviewComponent;
