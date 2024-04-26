import React, { useState } from 'react';
import { emptyAccount } from '../hooks/AccountProvider';
import { Link } from 'react-router-dom';
import {DateField, DropdownField, MultiselectDropdown, TextField, TextareaField} from '../ui/FormFields';
import cities from '../mock/cities.json';
import statuses from '../mock/statuses.json';
import themes from '../mock/themes.json';
import User from '../User';
import Validation, {validationScheme} from '../Validation';

const SignUpForm: React.FC<{}> = () => {
  const [newAccount, setNewAccount] = useState<User>(emptyAccount);

  const [city, setCity] = useState<string | undefined>(newAccount.city.city);
  const [status, setStatus] = useState<string | undefined>(newAccount.status.name);
  const [chosenThemes, setChosenThemes] = useState<string[]>(newAccount.branches.map((theme) => theme.shortName));

  const [validation, setValidation] = useState<Validation>({
    login: false,
    password: false,
    repeatedPassword: false,
    name: false,
    email: false,
    phoneNumber: false
  });

  const onCitySelect = (eventKey: string | null) => {
    const foundCity = cities.find((c) => c.city === eventKey);

    if(!foundCity) {
      return;
    }

    setCity(foundCity.city);
    setNewAccount((value) => ({...value, city: foundCity}))
  };

  const onStatusSelect = (eventKey: string | null) => {
    const foundStatus = statuses.find((s) => s.name === eventKey);

    if(!foundStatus) {
      return;
    }

    setStatus(foundStatus.name);
    setNewAccount((value) => ({...value, status: foundStatus}))
  };

  const onThemeClick = (eventKey: string, isChosen: boolean) => {
    const foundTheme = themes.find((t) => t.shortName === eventKey);

    if(!foundTheme) {
      return;
    }

    const resultThemes = isChosen 
      ? newAccount.branches.filter((t) => t.shortName !== foundTheme.shortName) 
      : newAccount.branches.concat(foundTheme);

    setChosenThemes(resultThemes.map((theme) => theme.shortName));
    setNewAccount((value) => ({...value, branches: resultThemes}));
  }

  return (
    <div className='page'>
      <form className='separated-form' action='' method='post'>
        <h2>Регистрация</h2>
        
        <TextField 
          fieldHeader='Логин*'
          type='text'
          placeholder='Введите логин'
          isValid={validation.login}
          warning='Можно использовать только английский алфавит и цифры'
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setValidation({...validation, login: !validationScheme.validate({login: evt.target.value}).error});
            setNewAccount({...newAccount, login: evt.target.value.trim()});
          }}/>

        <TextField
          fieldHeader='Пароль*'
          type='text'
          placeholder='Введите пароль'
          isValid={validation.password}
          warning='Можно использовать только английский алфавит, цифры и символы ~!@#$%^&*()_-+={[}]|:;<,>.?/'
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            const password = evt.target.value.trim();
            setValidation({...validation, password: !validationScheme.validate({password: evt.target.value}).error});
            setNewAccount({...newAccount, password});
          }}/>

        <TextField
          fieldHeader='Повторите пароль*'
          type='text'
          placeholder='Введите пароль'
          isValid={validation.repeatedPassword}
          warning='Пароли не совпадают'
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setValidation({
              ...validation, 
              repeatedPassword: !validationScheme.validate({repeatPassword: evt.target.value.trim()}, {context: {password: newAccount.password}}).error
            });
          }}/>

        <TextField 
          fieldHeader='Имя*'
          type='text'
          placeholder='Введите имя'
          defaultValue={newAccount.name} 
          isValid={validation.name}
          warning='Можно использовать только английский и русский алфавиты, цифры, символы ~!@#$%^&*()_-+={[}]|:;<,>.?/ и пробел'
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setValidation({...validation,  name: !validationScheme.validate({name: evt.target.value}).error});
            setNewAccount({...newAccount, name: evt.target.value.trim()});
          }}/>

        <TextField
          fieldHeader='Электронная почта*'
          type='email'
          placeholder='Введите адрес элктронной почты'
          defaultValue={newAccount.email}
          isValid={validation.email}
          warning='Обязательно использование доменного имени через @. Можно использовать только английский алфавит, цифры и символ @'
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setValidation({...validation,  email: !validationScheme.validate({email: evt.target.value}).error});
            setNewAccount({...newAccount, email: evt.target.value.trim()});
          }}/>

        <TextField
          fieldHeader='Номер Телефона*'
          type='tel'
          defaultValue={newAccount.phoneNumber}
          placeholder='Введите номер телефона'
          isValid={validation.phoneNumber}
          warning='Можно использовать только цифры'
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setValidation({...validation, phoneNumber: !validationScheme.validate({phoneNumber: evt.target.value}).error});
            setNewAccount({...newAccount, phoneNumber: evt.target.value.trim()});
          }}/>

        <DateField
          fieldHeader='Дата рождения*'
          defaultValue={newAccount.birthdate}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setNewAccount({...newAccount, birthdate: new Date(evt.target.value)})}/>

        <DropdownField 
          fieldHeader='Город*'
          options={cities.map((c) => c.city)}
          placeholder={city}
          onOptionSelect={onCitySelect}/>

        <DropdownField
          fieldHeader='Статус'
          options={statuses.map((s) => s.name)}
          placeholder={status}
          onOptionSelect={onStatusSelect}/>

        <MultiselectDropdown
          fieldHeader='Направления'
          options={themes.map((t) => t.shortName)}
          chosenOptions={chosenThemes}
          onOptionClick={onThemeClick}/>

        <TextareaField
          fieldHeader='О себе'
          defaultValue={newAccount.bio}
          placeholder='Введите информацию о себе'
          onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => setNewAccount({...newAccount, bio: evt.target.value})}/>

        <Link
          to='/account/basket' 
          className={`main-button sign-button ${Object.values(validation).every((isValid) => isValid) ? '' : 'disabled-link'}`}>
            Зарегистрироваться
        </Link>

        <div className='form-field sign-field'>
          <h3>Уже есть аккаунт?</h3>
          <Link to='/log-in' className='secondary-button sign-button'>Войдите!</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
