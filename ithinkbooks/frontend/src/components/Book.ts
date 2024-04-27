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
