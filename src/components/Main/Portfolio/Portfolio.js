import React from 'react';
import './Portfolio.css';
import arrow from '../../../images/text__COLOR_font-main.svg';
import { a } from 'react-router-dom';

function Portfolio() {
    return (
        <div className='portfolio'>
            <div className='portfolio__container'>
                <h4 className='portfolio__title'>Портфолио</h4>
                <div className='portfolio__box-item'>
                    <a href={'https://ntx03.github.io/how-to-learn'} target='_blank' className='portfolio__link-project'>Статичный сайт</a>
                    <a href={'https://ntx03.github.io/how-to-learn'} target='_blank' className='portfolio__link'><img src={arrow} alt="фото Качур Андрея" className='portfolio__arrow' /></a>
                </div>
                <div className='portfolio__line'></div>
                <div className='portfolio__box-item'>
                    <a href={'https://ntx03.github.io/russian-travel'} target='_blank' className='portfolio__link-project'>Адаптивный сайт</a>
                    <a href={'https://ntx03.github.io/russian-travel'} target='_blank' className='portfolio__link'><img src={arrow} alt="фото Качур Андрея" className='portfolio__arrow' /></a>
                </div>
                <div className='portfolio__line portfolio__line_last'></div>
                <div className='portfolio__box-item'>
                    <a href={'https://ntx033.kachur.nomoreparties.sbs'} target='_blank' className='portfolio__link-project'>Одностраничное приложение</a>
                    <a href={'https://ntx033.kachur.nomoreparties.sbs'} target='_blank' className='portfolio__link'><img src={arrow} alt="фото Качур Андрея" className='portfolio__arrow' /></a>
                </div>
            </div>
        </div>
    );
}

export default Portfolio;