import React from 'react';
import './Techs.css';

function Techs() {
    return (
        <div className='techs'>
            <div className='techs-container' id='techs'>
                <h3 className='techs__title'>Технологии</h3>
                <div className='techs__title-line'></div>
                <h2 className='techs__title-technologies'>7 технологий</h2>
                <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <div className='techs__technologies-container'>
                    <div className='techs__technologies'>HTML</div>
                    <div className='techs__technologies'>CSS</div>
                    <div className='techs__technologies'>JS</div>
                    <div className='techs__technologies'>React</div>
                    <div className='techs__technologies'>Git</div>
                    <div className='techs__technologies'>Express.js</div>
                    <div className='techs__technologies'>mongoDB</div>
                </div>
            </div>
        </div>
    );
}

export default Techs;