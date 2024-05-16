import Review from "./Review";

export default interface Book {
  author: string;
  book_bindings: string;
  book_theme: string;
  description: string;
  id: number;
  isbn: string;
  level: number;
  name: string;
  number_of_pages: number;
  price: number;
  programming_language: string;
  publisher: string;
  quantity: number;
  review: Review[];
  slug: string;
  theme_category: string;
  translator_choice: string;
  year: number;
  month: number;
  book_language: string;
  book_format: string;
};

const emptyBook: Book = {
  author: '',
  book_bindings: '',
  book_theme: '',
  description: '',
  id: -1,
  isbn: '',
  level: 0,
  name: '',
  number_of_pages: 0,
  price: 0,
  programming_language: '',
  publisher: '',
  quantity: 0,
  review: [],
  slug: '',
  theme_category: '',
  translator_choice: '',
  year: 0,
  month: 0,
  book_language: '',
  book_format: ''
};

export {emptyBook};
