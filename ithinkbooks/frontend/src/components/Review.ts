import User from './User';

const getVoteValue = (review: Review) => review.positiveVotes - review.negativeVotes;

export default interface Review {
  id: string;
  rating: number;
  title: string;
  text: string;
  user: User;
  positiveVotes: number;
  negativeVotes: number;
  bookId: string;
};

export {getVoteValue};
