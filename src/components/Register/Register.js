import React from 'react';
import './Register.css';
import logo from '../../images/smile_header.svg'
import { Link } from 'react-router-dom';
import { useState } from "react";

function Register({ onRegister, errorRegisterEmail, errorRegister }) {

    const [email, setEmail] = useState('');
    const [emailValidate, setEmailValidate] = useState(false);
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailValidate(false);
        } else { setEmailValidate(true); }
    }

    const [password, setPassword] = useState('');
    const [passwordValidate, setpasswordValidate] = useState('');
    const onChangePassword = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 3) {
            setpasswordValidate(false);
        } else {
            setpasswordValidate(true);
        }

    }

    const [name, setName] = useState('');
    const [nameValidate, setNameValidate] = useState('');
    const onChangeName = (e) => {
        setName(e.target.value)
        if (e.target.value.length < 2) {
            setNameValidate(false);
        } else {
            setNameValidate(true);
        }
    }

    const [validate, setValidate] = useState(false);
    React.useEffect(() => {
        if (!passwordValidate || !emailValidate || !nameValidate) {
            setValidate(false);
        } else { setValidate(true); }
    }, [passwordValidate, emailValidate, nameValidate])


    // собираем данные с инпутов и очищаем поля
    const handleSubmit = (e) => {
        e.preventDefault()
        onRegister(password, email, name);
    }

    return (
        <section className='register'>
            <form className='register__container' onSubmit={handleSubmit}>
                <Link to={'/'} className='login__logo'><img src={logo} alt='зеленый смайлик' /></Link>
                <h2 className='register__title'>Добро пожаловать!</h2>
                <p className='register__input-name'>Имя</p>
                <input type="text" className={nameValidate ? 'register__input' : 'register__input-error'} value={name || ''} onChange={onChangeName} required placeholder='Имя' />
                <p className='register__input-name'>E-mail</p>
                <input type="email" className={emailValidate ? 'register__input' : 'register__input-error'} value={email || ''} onChange={onChangeEmail} required placeholder='Email' />
                <p className='register__input-name'>Пароль</p>
                <input type="password" className={passwordValidate ? 'register__input' : 'register__input-error'} value={password || ''} onChange={onChangePassword} required />
                <div className='register__name-error-container'>
                    <p className={errorRegisterEmail ? 'register__name-error' : 'register__name-error-none'}>{errorRegister ? 'При регистрации пользователя произошла ошибка' : "Пользователь с таким email уже существует"}</p>
                </div>
                <button disabled={!validate} className={validate ? 'register__button' : 'register__button-disable'}>Зарегистрироваться</button>
                <div className='register__signin-container'>
                    <p className='register__signin-text'>Уже зарегистрированы?</p>
                    <Link to={'/signin'} className='register__signin-link'>Войти</Link>
                </div>
            </form>
        </section>
    );
}


export default Register;