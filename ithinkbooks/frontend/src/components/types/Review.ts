import { User } from './User';

const getVoteValue = (review: Review) => review.positiveVotes - review.negativeVotes;

export default interface Review {
  id: number;
  star: number;
  title: string;
  text: string;
  user: User | undefined;
  positiveVotes: number;
  negativeVotes: number;
  product: number;
};

const emptyReview: Review = {
  id: -1,
  star: 0,
  title: '',
  text: '',
  user: undefined,
  positiveVotes: 0,
  negativeVotes: 0,
  product: -1
};

export {getVoteValue, emptyReview};
