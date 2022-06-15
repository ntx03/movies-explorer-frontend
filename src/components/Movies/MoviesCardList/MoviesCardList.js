import React, { useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ movie, movies }) {
    return (
        <div className='list'>
            <div className='list__container'>
                <div className='list__cards'>
                    {Array.prototype.map.call(movies, function (item) {
                        return (
                            <MoviesCard movie={movie} key={item._id} item={item} />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default MoviesCardList;