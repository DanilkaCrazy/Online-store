import React, { useState } from 'react';
import { TextField } from '../ui/FormFields';
import LogInInfo from '../LogInInfo';
import { Link } from 'react-router-dom';
import Validation, {validationScheme} from '../Validation';

const LogInForm: React.FC<{}> = () => {
  const [logInInfo, setLogInInfo] = useState<LogInInfo>({
    login: '',
    password: ''
  });

  const [validation, setValidation] = useState<Validation>({
    login: false,
    password: false,
    repeatedPassword: false,
    name: true,
    email: true,
    phoneNumber: true
  });

  return (
    <div className='page'>
      <form className='separated-form' action='' method='post'>
        <h2>Вход</h2>
        
        <TextField 
          fieldHeader='Логин*'
          type='text'
          placeholder='Введите логин'
          isValid={validation.login}
          warning='Можно использовать только английский алфавит и цифры'
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setValidation({...validation, login: !validationScheme.validate({login: evt.target.value}).error});
            setLogInInfo({...logInInfo, login: evt.target.value.trim()});
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
            setLogInInfo({...logInInfo, password});
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
              repeatedPassword: !validationScheme.validate({repeatPassword: evt.target.value.trim()}, {context: {password: logInInfo.password}}).error
            });
          }}/>
        
        <Link 
          to='/account/basket' 
          className={`main-button sign-button ${Object.values(validation).every((isValid) => isValid) ? '' : 'disabled-link'}`}>
            Войти
        </Link>

        <div className='form-field sign-field'>
          <h3>Ещё не регистрировались?</h3>
          <Link to='/sign-up' className='secondary-button sign-button'>Зарегистрируйтесь!</Link>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;
