import dayjs, { Dayjs } from 'dayjs';
import months from './mock/months.json';

const NEW_MONTHS_AMOUNT = 2;

const MIN_YEAR = 1990;
const MAX_YEAR = new Date().getFullYear() + 1;

const isReleased = (year: number, month: number) => dayjs().diff(dayjs(`${year}-${month}`, 'YYYY-MM'), 'month') >= 0;

const isNew = (year: number, month: number) => {
  const diff = dayjs().diff(dayjs(`${year}-${month}`, 'YYYY-MM'), 'month');
  return diff >= 0 && diff < NEW_MONTHS_AMOUNT;
};

const getAge = (birthdate: Dayjs) => dayjs().diff(dayjs(birthdate, 'YYYY-MM-DD'), 'year');

const getFormatedWithWordsDate = (date: Dayjs) => `${date.date()} ${months[date.month()]?.nominative} ${date.year()}`;

export {isReleased, isNew, getAge, getFormatedWithWordsDate, MIN_YEAR, MAX_YEAR};
