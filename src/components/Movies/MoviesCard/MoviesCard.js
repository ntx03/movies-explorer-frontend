import React, { useState } from 'react';
import './MoviesCard.css';
import image from '../../../images/image_card.svg';

function MoviesCard({ movie }) {

    const [like, setLike] = useState(false);

    function likeClick() {
        if (!like) {
            setLike(true);
        } else { setLike(false) }
    }
    return (
        <div className='card'>
            <div className="card__image-container">
                <img className="card__image" src={image} alt={'33 слова о дизайне'} />
            </div>
            <div className="card__title-container">
                <h2 className="card__title">33 слова о дизайне</h2>
                <button className={movie ? 'card__heard_none' : (like ? 'card__heard' : 'card__heard_black')} type="button" onClick={likeClick} aria-label="лайк карточки"></button>
                <button className={movie ? 'card__delete' : 'card__delete_none'} type="button" aria-label="значок удаления карточки"></button>
            </div>
            <div className='card__time-movie'>1ч 47м</div>
        </div>
    );
}

export default MoviesCard;