import validator from 'validator';

const PHONE_NUMBER_LENGTH = 11;

const fieldsValidation = {
  login: {
    isValid: (value: string) => validator.isAlphanumeric(value, 'en-US'),
    caution: 'Можно использовать только буквы английского алфавита и цифры'
  },
  password: {
    isValid: (value: string) => validator.isAlphanumeric(value, 'en-US', {ignore: '~!@#$%^&*()_-+={[}]|:;<,>.?/'}),
    caution: 'Можно использовать английский алфавит, цифры и символы ~!@#$%^&*()_-+={[}]|:;<,>.?/'
  },
  repeatPassword: {
    isValid: (value: string, password: string) => value === password,
    caution: 'Пароли не совпадают'
  },
  name: {
    isValid: (value: string) => validator.isAlphanumeric(value, 'en-US', {ignore: ' ~!@#$%^&*()_-+={[}]|:;<,>.?/'}) 
      || validator.isAlphanumeric(value, 'ru-RU', {ignore: ' ~!@#$%^&*()_-+={[}]|:;<,>.?/'}),
    caution: 'Можно использовать только английский и русский алфавиты, цифры, символы ~!@#$%^&*()_-+={[}]|:;<,>.?/ и пробел'
  },
  email: {
    isValid: (value: string) => validator.isEmail(value),
    caution: 'Обязательно использование доменного имени через @. Можно использовать только английский алфавит, цифры и символ @'
  },
  phoneNumber: {
    isValid: (value: string) => value.length === PHONE_NUMBER_LENGTH && validator.isNumeric(value),
    caution: 'Можно использовать только цифры, начинать - с цифры 8'
  }
};

export default interface Validation {
  login: boolean;
  password: boolean;
  repeatedPassword: boolean;
  name: boolean;
  email: boolean;
  phoneNumber: boolean;
};

export {fieldsValidation};
