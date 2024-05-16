import City from "./City";

export default interface Order {
  id: string;
  city: City;
  address: string;
  booksId: number[];
  price: number;
  date: Date;
};
