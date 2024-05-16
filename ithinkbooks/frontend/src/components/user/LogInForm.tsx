import React, { useState } from 'react';
import { TextField } from '../ui/FormFields';
import LogInInfo from '../types/LogInInfo';
import { Link } from 'react-router-dom';
import Validation, {fieldsValidation} from '../types/Validation';
import { useAccount } from '../hooks/AccountProvider';

const LogInForm: React.FC<{}> = () => {
  const {logIn} = useAccount();

  const [logInInfo, setLogInInfo] = useState<LogInInfo>({
    username: '',
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
          warning={fieldsValidation.login.caution}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setValidation({...validation, login: fieldsValidation.login.isValid(evt.target.value)});
            setLogInInfo({...logInInfo, username: evt.target.value.trim()});
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
            setLogInInfo({...logInInfo, password});
          }}/>

        <TextField
          fieldHeader='Повторите пароль*'
          type='text'
          placeholder='Введите пароль'
          isValid={validation.repeatedPassword}
          warning={fieldsValidation.repeatPassword.caution}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            setValidation({...validation, repeatedPassword: fieldsValidation.repeatPassword.isValid(evt.target.value, logInInfo.password)});}}/>
        
        <button 
          onClick={(evt) => {
            evt.preventDefault();
            logIn(logInInfo);
          }}
          className={`main-button sign-button ${Object.values(validation).every((isValid) => isValid) ? '' : 'disabled-link'}`}>
            Войти
        </button>

        <div className='form-field sign-field'>
          <h3>Ещё не регистрировались?</h3>
          <Link to='/sign-up' className='secondary-button sign-button'>Зарегистрируйтесь!</Link>
        </div>
      </form>
    </div>
  );
};

export default LogInForm;
