import React from 'react'
import './Preloader.css'

const Preloader = () => {
    return (
        <div className="preloader">
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
            <h2 className='preloader__text-not-found_none'>Ничего не найдено</h2>
            <h2 className='preloader__text-not-found_none'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</h2>
        </div>
    )
};

export default Preloader;
