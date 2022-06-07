import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import krest from '../../images/krest.svg';

function Navigation({ isOpen, isClose }) {
    return (
        <section className={isOpen ? 'navigation_open' : 'navigation'}>
            <div className='navigation__container'>
                <button className='navigation__button' onClick={isClose}><img className='navigation__image' src={krest} alt='крестик закрытия меню' /></button>
                <Link to='/' className='navigation__main' onClick={isClose}>Главная</Link>
                <Link to='/movies' className='navigation__movies_border' onClick={isClose}>Фильмы</Link>
                <Link to='/saved-movies' className='navigation__saved-movies' onClick={isClose}>Сохраненные фильмы</Link>
                <Link to='/profile' className='navigation__pfofile' onClick={isClose}>Аккаунт</Link>
            </div>
            <div className='navigation__overlay'></div>
        </section>
    );
}


export default Navigation;