const NEW_MONTHS_AMOUNT = 2;
const MONTH_AMOUNT = 12;

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

const isReleased = (year: number, month: number) => currentYear > year || (currentYear === year && currentMonth >= month);

const isNew = (year: number, month: number) => 
  isReleased(year, month) &&
  ((year === currentMonth - 1 && currentMonth <= NEW_MONTHS_AMOUNT && month <= MONTH_AMOUNT - NEW_MONTHS_AMOUNT) 
  || (year === currentYear && (currentMonth - month > 0 || currentMonth - month <= 2)));

export {isReleased, isNew};
