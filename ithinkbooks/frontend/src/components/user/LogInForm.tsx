import React, { useReducer, useState } from 'react';
import { TextField } from '../ui/FormFields';
import LogInInfo from '../types/LogInInfo';
import { Link } from 'react-router-dom';
import Validation, {fieldsValidation} from '../types/Validation';
import { useAccount } from '../hooks/AccountProvider';

const LogInForm: React.FC<{}> = () => {
  const {logInOrOut, error} = useAccount();

  const [logInInfo, setLogInInfo] = useState<LogInInfo>({
    username: '',
    password: ''
  });

  const [validation, setValidation] = useState<Validation>({
    login: false,
    password: false,
    repeatedPassword: true,
    name: true,
    email: true,
    phoneNumber: true
  });

  const [passwordType, togglePasswordType] = useReducer((value) => value === 'password' ? 'text' : 'password', 'password');

  return (
    <div className='page'>
      <form className='separated-form'>
        <h2>Вход</h2>

        <h3 hidden={!error} className='danger-p'>Аккаунт не найден.<br/>
        Возможно, вы ввели неправльный логин или пароль</h3>
        
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
          type={passwordType}
          placeholder='Введите пароль'
          isValid={validation.password}
          warning={fieldsValidation.password.caution}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            const password = evt.target.value.trim();
            setValidation({...validation, password: fieldsValidation.password.isValid(evt.target.value)});
            setLogInInfo({...logInInfo, password});
          }}/>

        <label className='password-checkbox' htmlFor='passwordVisibility'>
          <input type='checkbox' name='passwordVisibility' id='passwordVisibility' onChange={togglePasswordType}/>
          <p className='main-p'>Показать пароль</p>
        </label>
        
        <button 
          onClick={(evt) => {
            evt.preventDefault();
            logInOrOut(logInInfo);
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
