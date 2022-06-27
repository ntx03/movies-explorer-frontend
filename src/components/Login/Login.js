import React, { useEffect } from 'react';
import './Login.css';
import logo from '../../images/smile_header.svg'
import { Link } from 'react-router-dom';
import { useState } from "react";

function Login({ onLogin, loginError, loginErrorAuthorize }) {

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

    const [validate, setValidate] = useState(false);
    useEffect(() => {
        if (!passwordValidate || !emailValidate) {
            setValidate(false);
        } else { setValidate(true); }
    }, [passwordValidate, emailValidate])

    function login(e) {
        e.preventDefault()
        onLogin(password, email);
    }

    return (
        <section className='login'>
            <form className='login__container' onSubmit={login}>
                <Link to='/' className='login__logo'><img src={logo} alt='зеленый смайлик' /></Link>
                <h2 className='login__title'>Рады видеть!</h2>
                <p className='login__input-name'>E-mail</p>
                <input type="email" className={emailValidate ? 'login__input' : 'login__input-error'} required onChange={onChangeEmail} value={email || ''} />
                <p className='login__input-name'>Пароль</p>
                <input type="password" className={passwordValidate ? 'login__input' : 'login__input-error'} onChange={onChangePassword} required value={password || ''} />
                <div className='login__name-error-container'>
                    <p className={loginErrorAuthorize ? 'login__name-error' : 'login__name-error-none'}> {loginError ? 'На сервере произошла ошибка.' : 'Вы ввели неправильный логин или пароль.'}</p>
                </div>
                <button disabled={!validate} className={validate ? 'login__button' : 'login__button-disable'} >Войти</button>
                <div className='login__signin-container'>
                    <p className='login__signin-text'>Еще не зарегистрированы?</p>
                    <Link to='/signup' className='login__signin-link'>Регистрация</Link>
                </div>
            </form>
        </section>
    );
}

export default Login;