import City from './City';
import Order from './Order';
import Status from './Status';
import Theme from './Theme';

const MAX_ROADMAPS_COUNT = 3;

export default interface User {
  id: number;
  login: string;
  password: string;
  name: string;
  avatar: string;
  bio: string;
  status: Status;
  branches: Theme[];
  reviewsAmount: number;
  city: City;
  reviews: number[];
  orders: Order[];
  booksInBasket: number[];
  favoriteBooks: number[];
  email: string;
  phoneNumber: string;
  birthdate: Date;
  roadmaps: string[];
};

export {MAX_ROADMAPS_COUNT};
