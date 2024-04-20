import Book from "./Book";
import { MAX_YEAR, MIN_YEAR } from "./date-utils";
import { BookFormat } from "./mock/mock";
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
const hasFormat = (isBookPaperback: boolean, formats: string[]) => (
  !formats.length || formats.includes(BookFormat.ELECTRONIC) || formats.includes(BookFormat.PAPERBACK) && isBookPaperback
);
const isInBetweenPrices = (bookPrice: number, minPrice: number, maxPrice: number) => bookPrice >= minPrice && bookPrice <= maxPrice;
const isInBetweenYears = (bookYear: number, minYear: number, maxYear: number) => bookYear >= minYear && bookYear <= maxYear;

const filterBooks = (books: Book[], filter: Filter) => {
  return SortBooks[filter.sortType](books.filter((book) => (
      hasLanguage(book.language.language, filter.languages) 
      && hasFormat(book.canBePaperback, filter.formats)
      && isInBetweenPrices(book.price, filter.minPrice, filter.maxPrice)
      && isInBetweenYears(book.year, filter.minYear, filter.maxYear))));
};

export {defaultFilter, filterBooks};
