import Book from "./Book";
import Review, { getVoteValue } from "./Review";
import { getAverageNumber } from "./utils";

const SortTypes = {
  POPULARITY: 'popularity',
  ASCENDING_RATING: 'ascending-rating',
  DESCENDING_RATING: 'descending-rating',
  ASCENDING_PRICE: 'ascending-price',
  DESCENDING_PRICE: 'descending-price',
  A_Z: 'a-z',
  Z_A: 'z-a',
  ASCENDING_YEAR: 'ascending-year',
  DESCENDING_YEAR: 'descending-year'
};

const SortTranslations = {
  [SortTypes.POPULARITY]: 'Популярность',
  [SortTypes.ASCENDING_RATING]: 'Возрастание оценки',
  [SortTypes.DESCENDING_RATING]: 'Убывание оценки',
  [SortTypes.ASCENDING_PRICE]: 'Возрастание цены',
  [SortTypes.DESCENDING_PRICE]: 'Убывание цены',
  [SortTypes.A_Z]: 'A-Z, А-Я',
  [SortTypes.Z_A]: 'Я-А, Z-A',
  [SortTypes.ASCENDING_YEAR]: 'Возрастание года',
  [SortTypes.DESCENDING_YEAR]: 'Убывание года'
}

const SortBooks = {
  [SortTypes.POPULARITY]: (array: Book[]) => [...array].sort((bookA, bookB) => bookB.reviews.length - bookA.reviews.length),
  [SortTypes.ASCENDING_RATING]: (array: Book[]) => [...array].sort(
    (bookA, bookB) => (
      getAverageNumber(bookA.reviews.map((review) => review.rating)) - getAverageNumber(bookB.reviews.map((review) => review.rating))
    )),
  [SortTypes.DESCENDING_RATING]: (array: Book[]) => [...array].sort(
    (bookA, bookB) => (
      getAverageNumber(bookB.reviews.map((review) => review.rating)) - getAverageNumber(bookA.reviews.map((review) => review.rating))
    )),
  [SortTypes.ASCENDING_PRICE]: (array: Book[]) => [...array].sort((bookA, bookB) => bookA.price - bookB.price),
  [SortTypes.DESCENDING_PRICE]: (array: Book[]) => [...array].sort((bookA, bookB) => bookB.price - bookA.price),
  [SortTypes.A_Z]: (array: Book[]) => [...array].sort((bookA, bookB) => bookA.title.localeCompare(bookB.title)),
  [SortTypes.Z_A]: (array: Book[]) => [...array].sort((bookA, bookB) => bookB.title.localeCompare(bookA.title)),
  [SortTypes.ASCENDING_YEAR]: (array: Book[]) => [...array].sort((bookA, bookB) => bookA.year - bookB.year),
  [SortTypes.DESCENDING_YEAR]: (array: Book[]) => [...array].sort((bookA, bookB) => bookB.year - bookA.year)
}

const SortReviews = {
  [SortTypes.POPULARITY]: (array: Review[]) => [...array].sort((reviewA, reviewB) => getVoteValue(reviewB) - getVoteValue(reviewA)),
  [SortTypes.ASCENDING_RATING]: (array: Review[]) => [...array].sort((reviewA, reviewB) => reviewA.rating - reviewB.rating),
  [SortTypes.DESCENDING_RATING]: (array: Review[]) => [...array].sort((reviewA, reviewB) => reviewB.rating - reviewA.rating),
};

export {SortTypes, SortTranslations, SortBooks, SortReviews};
