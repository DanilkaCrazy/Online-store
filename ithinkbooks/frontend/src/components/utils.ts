const getArraySum = (array: Array<number>) => array.reduce((prev, current) => prev + current, 0);

const getAverageNumber = (array: Array<number>) => getArraySum(array) / array.length;

export {getArraySum, getAverageNumber};
