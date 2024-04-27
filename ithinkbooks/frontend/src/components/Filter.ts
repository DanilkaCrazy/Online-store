import Book from "./Book";
import { MAX_YEAR, MIN_YEAR } from "./date-utils";
import { SortBooks, SortTypes } from "./sort";
import { MAX_PRICE, MIN_PRICE } from "./utils";

export default interface Filter {
  sortType: string;
  languages: string[];
  formats: string[];
  tag: string;
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
}; 

const defaultFilter: Filter = {
  sortType: SortTypes.POPULARITY,
  languages: [],
  formats: [],
  tag: '',
  minPrice: MIN_PRICE,
  maxPrice: MAX_PRICE,
  minYear: MIN_YEAR,
  maxYear: MAX_YEAR
};

const hasLanguage = (bookLang: string, languages: string[]) => !languages.length || languages.includes(bookLang);
const hasFormat = (bookFormat: string, formats: string[]) => !formats.length || formats.includes(bookFormat);

const isInBetweenPrices = (bookPrice: number, minPrice: number, maxPrice: number) => bookPrice >= minPrice && bookPrice <= maxPrice;
const isInBetweenYears = (bookYear: number, minYear: number, maxYear: number) => bookYear >= minYear && bookYear <= maxYear;

const filterBooks = (books: Book[], filter: Filter) => {
  return SortBooks[filter.sortType](books.filter((book) => (
      hasLanguage(book.book_language, filter.languages) 
      && hasFormat(book.book_format, filter.formats)
      && isInBetweenPrices(book.price, filter.minPrice, filter.maxPrice)
      && isInBetweenYears(book.year, filter.minYear, filter.maxYear))));
};

export {defaultFilter, filterBooks};
