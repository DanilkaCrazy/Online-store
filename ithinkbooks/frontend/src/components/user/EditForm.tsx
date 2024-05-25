import React, { useState } from 'react';
import { useAccount } from '../hooks/AccountProvider';
import { Link } from 'react-router-dom';
import {DateField, DropdownField, MultiselectDropdown, TextField, TextareaField} from '../ui/FormFields';
import cities from '../mock/cities.json';
import statuses from '../mock/statuses.json';
import themes from '../mock/themes.json';
import { User } from '../types/User';
import Validation, { fieldsValidation } from '../types/Validation';
import AvatarField from './AvatarField';

const EditFrom: React.FC<{}> = () => {
  const {account, updateUser} = useAccount();

  const [updatingAccount, setUpdatingAccount] = useState<User>({...account});
  const [city, setCity] = useState<string | undefined>(account.location.city);
  const [status, setStatus] = useState<string | undefined>(account.user_status.name);
  const [chosenThemes, setChosenThemes] = useState<string[]>(account.user_directions.map((theme) => theme.shortName));

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
      ? updatingAccount.user_directions.filter((t) => t.shortName !== foundTheme.shortName) 
      : updatingAccount.user_directions.concat(foundTheme);

    setChosenThemes(resultThemes.map((theme) => theme.shortName));
    setUpdatingAccount((value) => ({...value, branches: resultThemes}))
  }

  return (
    <div className='page'>
      <form className='separated-form'>
        <h2>Редактирование профиля</h2>
        
        <AvatarField
          accountAvatar={updatingAccount.image}
          changeAccount={(dataUrl: string) => {
            setUpdatingAccount({...updatingAccount, image: dataUrl});
          }}/>

        <TextField 
          fieldHeader='Имя*'
          type='text'
          placeholder='Введите имя'
          defaultValue={updatingAccount.first_name}
          isValid={validation.name}
          warning={fieldsValidation.name.caution}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setValidation({...validation,  name: fieldsValidation.name.isValid(evt.target.value)});
            setUpdatingAccount({...updatingAccount, first_name: evt.target.value.trim(), last_name: evt.target.value});
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
          defaultValue={updatingAccount.phone_number}
          placeholder='Введите номер телефона'
          isValid={validation.phoneNumber}
          warning={fieldsValidation.phoneNumber.caution}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setValidation({...validation, phoneNumber: fieldsValidation.phoneNumber.isValid(evt.target.value)});
            setUpdatingAccount({...updatingAccount, phone_number: evt.target.value.trim()});
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
          defaultValue={updatingAccount.about_self}
          placeholder='Введите информацию о себе'
          onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => setUpdatingAccount({...updatingAccount, about_self: evt.target.value})}/>

        <div className='buttons-group'>
          <button 
            className={`main-button ${Object.values(validation).every((isValid) => isValid) ? '' : 'disabled-link'}`} 
            onClick={(evt) => {
              evt.preventDefault();
              updateUser(updatingAccount);
            }}>
              Сохранить
          </button>
          <Link to='/account/basket' className='secondary-button'>Отменить</Link>
        </div>
      </form>
    </div>
  );
};

export default EditFrom;
