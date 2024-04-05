import Status from './Status';
import Theme from './Theme';

export default interface User {
  id: string;
  login: string;
  password: string;
  name: string;
  avatar: string;
  age: number;
  bio: string;
  status: Status;
  branches: Theme[];
  reviewsAmount: number;
  city: string;
  books: string[];
  reviews: string[];
};
