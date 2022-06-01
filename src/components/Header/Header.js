import './Header.css';
import React from 'react';
import logo from '../../images/smile_header.svg'
import { Link } from 'react-router-dom';

function Header({ way }) {
    return (
        <div className="header">
            <div className='header__container'>
                <img src={logo} className='header__logo' alt='зеленый смайлик' />
                <div className='header__menu'>
                    <Link className='header__menu-signup'>Регистрация</Link>
                    <Link className='header__menu-signin'>Войти</Link>
                </div>
            </div>
        </div>
    );
}

export default Header;