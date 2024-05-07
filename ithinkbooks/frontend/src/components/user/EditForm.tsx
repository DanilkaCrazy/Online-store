import React, { useState } from 'react';
import { useAccount } from '../hooks/AccountProvider';
import { Link } from 'react-router-dom';
import {DateField, DropdownField, ImageField, MultiselectDropdown, TextField, TextareaField} from '../ui/FormFields';
import cities from '../mock/cities.json';
import statuses from '../mock/statuses.json';
import themes from '../mock/themes.json';
import User from '../User';
import Validation, { fieldsValidation } from '../Validation';

const EditFrom: React.FC<{}> = () => {
  const {account, updateAccount} = useAccount();

  const [updatingAccount, setUpdatingAccount] = useState<User>({...account});
  const [city, setCity] = useState<string | undefined>(account.city.city);
  const [status, setStatus] = useState<string | undefined>(account.status.name);
  const [chosenThemes, setChosenThemes] = useState<string[]>(account.branches.map((theme) => theme.shortName));

  const [validation, setValidation] = useState<Validation>({
    login: true,
    password: true,
    repeatedPassword: true,
    name: true,
    email: true,
    phoneNumber: true
  });

  const onCitySelect = (eventKey: string | null) => {
    const foundCity = cities.find((c) => c.city === eventKey);

    if(!foundCity) {
      return;
    }

    setCity(foundCity.city);
    setUpdatingAccount((value) => ({...value, city: foundCity}))
  };

  const onStatusSelect = (eventKey: string | null) => {
    const foundStatus = statuses.find((s) => s.name === eventKey);

    if(!foundStatus) {
      return;
    }

    setStatus(foundStatus.name);
    setUpdatingAccount((value) => ({...value, status: foundStatus}))
  };

  const onThemeClick = (eventKey: string, isChosen: boolean) => {
    const foundTheme = themes.find((t) => t.shortName === eventKey);

    if(!foundTheme) {
      return;
    }

    const resultThemes = isChosen 
      ? updatingAccount.branches.filter((t) => t.shortName !== foundTheme.shortName) 
      : updatingAccount.branches.concat(foundTheme);

    setChosenThemes(resultThemes.map((theme) => theme.shortName));
    setUpdatingAccount((value) => ({...value, branches: resultThemes}))
  }

  const onFormSubmit = () => {
    updateAccount(updatingAccount);
  };

  return (
    <div className='page'>
      <form className='separated-form' action='' method='post'>
        <h2>Редактирование профиля</h2>
        
        <ImageField
          fieldHeader='Добавить фото'
          image={updatingAccount.avatar}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setUpdatingAccount({
              ...updatingAccount, 
              avatar: !evt.target.files || evt.target.files.length <= 0 ? updatingAccount.avatar : URL.createObjectURL(evt.target.files[0])})
          }}/>

        <TextField 
          fieldHeader='Имя*'
          type='text'
          placeholder='Введите имя'
          defaultValue={updatingAccount.name}
          isValid={validation.name}
          warning={fieldsValidation.name.caution}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setValidation({...validation,  name: fieldsValidation.name.isValid(evt.target.value)});
            setUpdatingAccount({...updatingAccount, name: evt.target.value.trim()});
          }}/>

        <TextField
          fieldHeader='Электронная почта*'
          type='email'
          placeholder='Введите адрес элктронной почты'
          defaultValue={updatingAccount.email}
          isValid={validation.email}
          warning={fieldsValidation.email.caution}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setValidation({...validation,  email: fieldsValidation.email.isValid(evt.target.value)});
            setUpdatingAccount({...updatingAccount, email: evt.target.value.trim()});
          }}/>

        <TextField
          fieldHeader='Номер Телефона*'
          type='tel'
          defaultValue={updatingAccount.phoneNumber}
          placeholder='Введите номер телефона'
          isValid={validation.phoneNumber}
          warning={fieldsValidation.phoneNumber.caution}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setValidation({...validation, phoneNumber: fieldsValidation.phoneNumber.isValid(evt.target.value)});
            setUpdatingAccount({...updatingAccount, phoneNumber: evt.target.value.trim()});
          }}/>

        <DateField
          fieldHeader='Дата рождения*'
          defaultValue={updatingAccount.birthdate}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setUpdatingAccount({...updatingAccount, birthdate: new Date(evt.target.value)})}/>

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
          defaultValue={updatingAccount.bio}
          placeholder='Введите информацию о себе'
          onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => setUpdatingAccount({...updatingAccount, bio: evt.target.value})}/>

        <div className='buttons-group'>
          <Link 
            to='/account/basket' 
            className={`main-button ${Object.values(validation).every((isValid) => isValid) ? '' : 'disabled-link'}`} 
            onClick={onFormSubmit}>
              Сохранить
          </Link>
          <Link to='/account/basket' className='secondary-button'>Отменить</Link>
        </div>
      </form>
    </div>
  );
};

export default EditFrom;
