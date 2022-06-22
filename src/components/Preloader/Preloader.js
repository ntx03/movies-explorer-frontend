import React from 'react'
import './Preloader.css'

const Preloader = ({ preloader, preloaderNotFound, preloaderSearch, preloaderError }) => {
    return (
        <div className={preloader ? "preloader" : "preloader_none"}>
            <div className="preloader__container">
                <span className={preloaderSearch ? "preloader__round" : "preloader__round-none"}></span>
            </div>
            <h2 className={preloaderNotFound ? 'preloader__text-not-found' : 'preloader__text-not-found_none'}>Ничего не найдено</h2>
            <h2 className={preloaderError ? 'preloader__text-not-found' : 'preloader__text-not-found_none'}>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</h2>
        </div>
    )
};

export default Preloader;
