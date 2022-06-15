import React, { useState } from 'react';
import './MoviesCard.css';

function MoviesCard({ movie, item }) {

    const URL = 'https://api.nomoreparties.co';

    const [like, setLike] = useState(false);

    // преобразуем данные со временем
    function duration(item) {
        const time = item.duration;
        const hour = Math.floor(time / 60);
        const minutes = time - (60 * hour);
        if (hour > 1) {
            return `${hour}ч ${minutes}м`
        } else return `${time}м`
    }

    function likeClick() {
        if (!like) {
            setLike(true);
        } else { setLike(false) }
    }
    return (
        <article className='card'>
            <div className="card__image-container">
                <img className="card__image" src={URL + item.image.url} alt={item.nameRU} />
            </div>
            <div className="card__title-container">
                <h2 className="card__title">{item.nameRU}</h2>
                <button className={movie ? 'card__heard_none' : (like ? 'card__heard' : 'card__heard_black')} type="button" onClick={likeClick} aria-label="лайк карточки"></button>
                <button className={movie ? 'card__delete' : 'card__delete_none'} type="button" aria-label="значок удаления карточки"></button>
            </div>
            <div className='card__time-movie'>{duration(item)}</div>
        </article>
    );
}

export default MoviesCard;