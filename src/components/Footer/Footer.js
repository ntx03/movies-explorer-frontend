import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='footer'>
            <div className='footer__container'>
                <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
                <div className='footer__line'></div>
                <div className='footer__box'>
                    <p className='footer__year'>© 2022</p>
                    <div className='footer__link-container'>
                        <a href="https://practicum.yandex.ru1" target='_blank' className='footer__link'>Яндекс.Практикум</a>
                        <a href="https://github.com/ntx03" target='_blank' className='footer__link'>Github</a>
                        <a href="https://www.facebook.com/profile.php?id=100000369908392" target='_blank' className='footer__link'>Facebook</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;