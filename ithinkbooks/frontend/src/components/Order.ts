import City from "./City";

export default interface Order {
  id: string;
  city: City;
  address: string;
  booksId: string[];
  price: number;
  date: Date;
};
