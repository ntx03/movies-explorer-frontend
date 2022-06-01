import React from 'react';
import './Portfolio.css';
import arrow from '../../../images/text__COLOR_font-main.svg';
import { Link } from 'react-router-dom';

function Portfolio() {
    return (
        <div className='portfolio'>
            <div className='portfolio__container'>
                <h4 className='portfolio__title'>Портфолио</h4>
                <div className='portfolio__box-item'>
                    <Link to={'https://github.com/ntx03'} className='portfolio__link-project'>Статичный сайт</Link>
                    <Link to={'https://github.com/ntx03'} className='portfolio__link'><img src={arrow} alt="фото Качур Андрея" className='portfolio__arrow' /></Link>
                </div>
                <div className='portfolio__line'></div>
                <div className='portfolio__box-item'>
                    <Link to={'https://github.com/ntx03'} className='portfolio__link-project'>Адаптивный сайт</Link>
                    <Link to={'https://github.com/ntx03'} className='portfolio__link'><img src={arrow} alt="фото Качур Андрея" className='portfolio__arrow' /></Link>
                </div>
                <div className='portfolio__line'></div>
                <div className='portfolio__box-item'>
                    <Link to={'https://github.com/ntx03'} className='portfolio__link-project'>Одностраничное приложение</Link>
                    <Link to={'https://github.com/ntx03'} className='portfolio__link'><img src={arrow} alt="фото Качур Андрея" className='portfolio__arrow' /></Link>
                </div>
            </div>
        </div>
    );
}

export default Portfolio;