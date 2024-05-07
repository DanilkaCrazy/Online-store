import React, { useState } from 'react';
import { emptyAccount } from '../hooks/AccountProvider';
import { Link } from 'react-router-dom';
import {DateField, DropdownField, ImageField, MultiselectDropdown, TextField, TextareaField} from '../ui/FormFields';
import cities from '../mock/cities.json';
import statuses from '../mock/statuses.json';
import themes from '../mock/themes.json';
import User from '../User';
import Validation, {fieldsValidation} from '../Validation';

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
        
        <ImageField
          fieldHeader='Добавить фото'
          image={newAccount.avatar}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setNewAccount({
              ...newAccount, 
              avatar: !evt.target.files || evt.target.files.length <= 0 ? newAccount.avatar : URL.createObjectURL(evt.target.files[0])})
          }}/>

        <TextField 
          fieldHeader='Логин*'
          type='text'
          placeholder='Введите логин'
          isValid={validation.login}
          warning={fieldsValidation.login.caution}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setValidation({...validation, login: fieldsValidation.login.isValid(evt.target.value)});
            setNewAccount({...newAccount, login: evt.target.value.trim()});
          }}/>

        <TextField
          fieldHeader='Пароль*'
          type='text'
          placeholder='Введите пароль'
          isValid={validation.password}
          warning={fieldsValidation.password.caution}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            const password = evt.target.value.trim();
            setValidation({...validation, password: fieldsValidation.password.isValid(evt.target.value)});
            setNewAccount({...newAccount, password});
          }}/>

        <TextField
          fieldHeader='Повторите пароль*'
          type='text'
          placeholder='Введите пароль'
          isValid={validation.repeatedPassword}
          warning={fieldsValidation.repeatPassword.caution}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setValidation({...validation, repeatedPassword: fieldsValidation.repeatPassword.isValid(evt.target.value, newAccount.password)});
          }}/>

        <TextField 
          fieldHeader='Имя*'
          type='text'
          placeholder='Введите имя'
          defaultValue={newAccount.name} 
          isValid={validation.name}
          warning={fieldsValidation.name.caution}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setValidation({...validation,  name: fieldsValidation.name.isValid(evt.target.value)});
            setNewAccount({...newAccount, name: evt.target.value.trim()});
          }}/>

        <TextField
          fieldHeader='Электронная почта*'
          type='email'
          placeholder='Введите адрес элктронной почты'
          defaultValue={newAccount.email}
          isValid={validation.email}
          warning={fieldsValidation.email.caution}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setValidation({...validation,  email: fieldsValidation.email.isValid(evt.target.value)});
            setNewAccount({...newAccount, email: evt.target.value.trim()});
          }}/>

        <TextField
          fieldHeader='Номер Телефона*'
          type='tel'
          defaultValue={newAccount.phoneNumber}
          placeholder='Введите номер телефона'
          isValid={validation.phoneNumber}
          warning={fieldsValidation.phoneNumber.caution}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setValidation({...validation, phoneNumber: fieldsValidation.phoneNumber.isValid(evt.target.value)});
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
