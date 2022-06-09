import React from 'react';
import './Register.css';
import logo from '../../images/smile_header.svg'
import { Link } from 'react-router-dom';
import { useState } from "react";

function Register() {

    const [email, setEmail] = useState('');
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = useState('');
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const [name, setName] = useState('');
    const onChangeName = (e) => {
        setName(e.target.value)
    }

    return (
        <section className='register'>
            <form className='register__container'>
                <Link to={'/'} className='login__logo'><img src={logo} alt='зеленый смайлик' /></Link>
                <h2 className='register__title'>Добро пожаловать!</h2>
                <p className='register__input-name'>Имя</p>
                <input type="text" className='pegister__input' value={name || ''} onChange={onChangeName} required placeholder='Имя' />
                <p className='register__input-name'>E-mail</p>
                <input type="email" className='pegister__input' value={email || ''} onChange={onChangeEmail} required placeholder='Email' />
                <p className='register__input-name'>Пароль</p>
                <input type="password" className='pegister__input' value={password || ''} onChange={onChangePassword} required />
                <div className='register__name-error-container'>
                    <p className='register__name-error'>Что-то пошло не так так так...</p>
                </div>
                <button className='register__button'>Зарегистрироваться</button>
                <div className='register__signin-container'>
                    <p className='register__signin-text'>Уже зарегистрированы?</p>
                    <Link to={'/signin'} className='register__signin-link'>Войти</Link>
                </div>
            </form>
        </section>
    );
}


export default Register;