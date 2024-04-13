import Joi from 'joi';

const validationScheme = Joi.object({
  login: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]+$')).min(8).max(30),
  repeatPassword: Joi.ref('$password'),
  name: Joi.string().pattern(new RegExp('^[a-zA-Zа-яёА-ЯЁ0-9]+$')).min(3).max(60),
  email: Joi.string().email({ tlds: false }),
  phoneNumber: Joi.string().pattern(new RegExp('^[0-9]+$'))
});

export default interface Validation {
  login: boolean;
  password: boolean;
  repeatedPassword: boolean;
  name: boolean;
  email: boolean;
  phoneNumber: boolean;
};

export {validationScheme};
