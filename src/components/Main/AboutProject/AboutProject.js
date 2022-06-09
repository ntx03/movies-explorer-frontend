import React from 'react';
import './AboutProject.css';

function AboutProject() {
    return (
        <div className='about-project' id='aboutProject'>
            <div className='about-project__container'>
                <h3 className='about-project__title'>О проекте</h3>
                <div className='about-project__title-line'></div>
                <div className='about-project__text-container'>
                    <div className='about-project__card'>
                        <h3 className='about-project__card-title'>Дипломный проект включал 5 этапов</h3>
                        <p className='about-project__card-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className='about-project__card'>
                        <h3 className='about-project__card-title'>На выполнение диплома ушло 5 недель</h3>
                        <p className='about-project__card-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className='about-project__time'>
                    <div className='about-project__time-backend'>1 неделя</div>
                    <div className='about-project__time-frontend'>4 недели</div>
                </div>
                <div className='about-project__time'>
                    <div className='about-project__time-backend about-project__time-frontend_black'>Back-end</div>
                    <div className='about-project__time-frontend about-project__time-frontend_black'>Front-end</div>
                </div>
            </div>
        </div>
    );
}

export default AboutProject;