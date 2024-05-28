import { randomInteger } from "./mock/mock";
import Book from "./types/Book";
import Review from "./types/Review";

const MAX_MONTH = 11;

const ScreensWidth = {
  RELATIVE_WIDTH: {
    DESKTOP: 0.9,
    TABLET: 0.925,
    MOBILE: 0.95
  },
  COLLUMNS_COUNT: {
    DESKTOP: 6,
    TABLET: 4,
    MOBILE: 3
  },
  BOOK_COVER_WIDTH: {
    DESKTOP: 175,
    TABLET: 158,
    MOBILE: 110
  },
  BOOK_COVER_HEIGHT: {
    DESKTOP: 248,
    TABLET: 222,
    MOBILE: 154
  },
  THEME_BUTTON_WIDTH: {
    DESKTOP: 175,
    TABLET: 158,
    MOBILE: 110
  },
  STAR_WIDTH: {
    DESKTOP: 30,
    TABLET: 26,
    MOBILE: 20
  }
};

const AvatarWidth = {
  DESKTOP: 400,
  TABLET: 300,
  MOBILE: 250
};

const MIN_PRICE = 0;
const MAX_PRICE = 10000;

const getArraySum = (array: Array<number>) => array.length ? array.reduce((prev, current) => prev + current, 0) : 0;

const getAverageNumber = (array: Array<number>) => array.length ? getArraySum(array) / array.length : 0;

const declineNounAfterNumber = (number: number, nominative: string, genitiveSingular: string, genitivePlural: string) => {
  if(number % 10 === 1 && number % 100 !== 11) {
    return nominative;
  } else if (number % 10 > 1 && number % 10 < 5 && !(number % 100 > 11 && number % 100 < 15)) {
    return genitiveSingular;
  }

  return genitivePlural;
}

const getRandomId = () => Date.now() % 1000;

const fixBookData = (data: Book): Book => {
  return (
    {
      ...data, 
      month: randomInteger(0, MAX_MONTH), 
      review: !data.review 
        ? [] 
        : data.review.map((r: Review) => ({...r, positiveVotes: randomInteger(0, 100), negativeVotes: randomInteger(0, 100)})),
      price: typeof data.price === 'string' ? parseFloat(data.price) : data.price
    }
  );
};

export {getArraySum, getAverageNumber, declineNounAfterNumber, getRandomId, fixBookData, ScreensWidth, AvatarWidth, MIN_PRICE, MAX_PRICE};
