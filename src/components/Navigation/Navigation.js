import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import krest from '../../images/krest.svg';

function Navigation({ isOpen, isClose, movie, goToMain }) {
    return (
        <section className={isOpen ? 'navigation_open' : 'navigation'}>
            <div className='navigation__container'>
                <button className='navigation__button' onClick={isClose}><img className='navigation__image' src={krest} alt='крестик закрытия меню' /></button>
                <Link to='/' className='navigation__main' onClick={goToMain}>Главная</Link>
                <Link to='/movies' className={movie ? 'navigation__movies' : 'navigation__movies_border'} onClick={isClose}>Фильмы</Link>
                <Link to='/saved-movies' className={movie ? 'navigation__saved-movies_border' : 'navigation__saved-movies'} onClick={isClose}>Сохранённые фильмы</Link>
                <Link to='/profile' className='navigation__pfofile' onClick={isClose}>Аккаунт</Link>
            </div>
            <div className='navigation__overlay'></div>
        </section>
    );
}


export default Navigation;