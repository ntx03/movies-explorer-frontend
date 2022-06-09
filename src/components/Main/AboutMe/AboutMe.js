import React from 'react';
import './AboutMe.css';
import { Link } from 'react-router-dom';
import Kachur from '../../../images/Kachur.jpg';

function AboutMe() {

    return (
        <div className='about-me' id='aboutMe'>
            <div className='about-me__box'>
                <div className='about-me__title'>Студент</div>
                <div className='about-me__title-line'></div>
                <div className='about-me__container'>
                    <div className='about-me__resume'>
                        <h3 className='about-me__resume-title'>Андрей</h3>
                        <h2 className='about-me__profession'>фронтенд-разработчик, 35 лет</h2>
                        <p className='about-me__text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                        <div className='about-me__link-container'>
                            <a href="https://www.facebook.com/profile.php?id=100000369908392" target='_blank' className='about-me__link'>Facebook</a>
                            <a href="https://github.com/ntx03" target='_blank' className='about-me__link'>Github</a>
                        </div>
                    </div>
                    <img src={Kachur} alt="фото Качур Андрея" className='about-me__photo' />
                </div>
            </div>
        </div>
    );
}

export default AboutMe;