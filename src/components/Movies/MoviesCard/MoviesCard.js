import React from 'react';
import './MoviesCard.css';
import image from '../../../images/image_card.svg';
import likeRed from '../../../images/likered.svg';

function MoviesCard() {
    return (
        <div className='card'>
            <div className="card__image-container">
                <img className="card__image" src={image} alt={'33 слова о дизайне'} />
            </div>
            <div className="card__title-container">
                <h2 className="card__title">33 слова о дизайне</h2>
                <button className='card__heard' type="button" aria-label="лайк карточки"></button>
            </div>
            <div className='card__time-movie'>1ч 47м</div>
        </div>
    );
}

export default MoviesCard;