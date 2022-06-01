import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList() {
    return (
        <div className='list'>
            <div className='list__container'>
                <div className='list__cards'>
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                    <MoviesCard />
                </div>
            </div>
        </div>
    );
}

export default MoviesCardList;