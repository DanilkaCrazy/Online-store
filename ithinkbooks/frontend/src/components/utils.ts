const getArraySum = (array: Array<number>) => array.reduce((prev, current) => prev + current, 0);

const getAverageNumber = (array: Array<number>) => getArraySum(array) / array.length;

const getPluralNoun = (number: number, singular: string, pluralFromTwoToFour: string, plural: string) => {
  if(number % 10 === 1 && number % 100 !== 11) {
    return singular;
  } else if (number % 10 > 1 && number % 10 < 5 && !(number % 100 > 11 && number % 100 < 15)) {
    return pluralFromTwoToFour;
  }

  return plural;
}

export {getArraySum, getAverageNumber, getPluralNoun};
