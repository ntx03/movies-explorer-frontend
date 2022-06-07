import React from 'react';
import './Login.css';
import logo from '../../images/smile_header.svg'
import { Link } from 'react-router-dom';
import { useState } from "react";


function Login({ toMovies }) {

    const [email, setEmail] = useState('');
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const [password, setPassword] = useState('');
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <section className='login'>
            <form className='login__container' onSubmit={toMovies}>
                <Link to='/' className='login__logo'><img src={logo} alt='зеленый смайлик' /></Link>
                <h2 className='login__title'>Рады видеть!</h2>
                <p className='login__input-name'>E-mail</p>
                <input type="email" className='login__input' required onChange={onChangeEmail} value={email || ''} />
                <p className='login__input-name'>Пароль</p>
                <input type="password" className='login__input' onChange={onChangePassword} required value={password || ''} />
                <div className='login__name-error-container'>
                    <p className='login__name-error'>Что-то пошло не так так так...</p>
                </div>
                <button className='login__button'>Войти</button>
                <div className='login__signin-container'>
                    <p className='login__signin-text'>Еще не зарегистрированы?</p>
                    <Link to='/signup' className='login__signin-link'>Регистрация</Link>
                </div>
            </form>
        </section>
    );
}


export default Login;