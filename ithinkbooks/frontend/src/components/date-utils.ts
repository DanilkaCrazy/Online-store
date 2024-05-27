import months from './mock/months.json';
import { declineNounAfterNumber } from './utils';

const NEW_MONTHS_AMOUNT = 2;
const MONTH_AMOUNT = 12;

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_YEAR = 365;
const DAYS_IN_LEAP_YEAR = 366;

const currentDate = new Date();

const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

const MIN_YEAR = 1990;
const MAX_YEAR = currentYear + 1;

const isReleased = (year: number, month: number) => currentYear > year || (currentYear === year && currentMonth >= month);

const isNew = (year: number, month: number) => 
  isReleased(year, month) &&
  ((year === currentMonth - 1 && currentMonth <= NEW_MONTHS_AMOUNT && month <= MONTH_AMOUNT - NEW_MONTHS_AMOUNT) 
  || (year === currentYear && (currentMonth - month > 0 || currentMonth - month <= 2)));

const getAge = (birthdate: Date) => {
  const timeDiff = Math.abs(currentDate.getTime() - birthdate.getTime());
  return Math.round(currentYear % 4 === 0 
    ? timeDiff / (MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY * DAYS_IN_LEAP_YEAR)
    : timeDiff / (MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY * DAYS_IN_YEAR));
}

const getFormatedWithDotsDate = (date: Date) => `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;

const getFormatedWithWordsDate = (date: Date) => { 
  const month = months[date.getMonth() - 1];

  if(!month) {
    return (`${date.getDay()} 
      ${date.getDay()} 
      ${date.getFullYear()} г.`
    )
  }

  return (
    `${date.getDay()} 
    ${declineNounAfterNumber(date.getMonth(), month.nominative, month.genitiveSingular, month.genitiveSingular)} 
    ${date.getFullYear()} г.`
  );
};

export {isReleased, isNew, getAge, getFormatedWithDotsDate, getFormatedWithWordsDate, MIN_YEAR, MAX_YEAR};
