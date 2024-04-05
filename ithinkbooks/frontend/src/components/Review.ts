import User from './User';

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
