import Theme from './Theme';

export default interface User {
  id: string;
  login: string;
  password: string;
  name: string;
  avatar: string;
  age: number;
  bio: string;
  status: string;
  branches: Theme[];
  reviewsAmount: number;
  city: string;
};
