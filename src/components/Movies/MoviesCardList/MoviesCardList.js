import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ movie }) {
    return (
        <div className='list'>
            <div className='list__container'>
                <div className='list__cards'>
                    <MoviesCard movie={movie} />
                    <MoviesCard movie={movie} />
                    <MoviesCard movie={movie} />
                    <MoviesCard movie={movie} />
                    <MoviesCard movie={movie} />
                </div>
            </div>
        </div>
    );
}

export default MoviesCardList;