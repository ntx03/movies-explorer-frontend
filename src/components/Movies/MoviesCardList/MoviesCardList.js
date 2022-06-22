import React, { useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ movie, movies, handleMovieDelete, saveMovies, list }) {

    return (
        <div className={list ? 'list' : 'list_none'}>
            <div className='list__container'>
                <div className='list__cards'>
                    {Array.prototype.map.call(movies, function (item) {
                        return (
                            <MoviesCard movie={movie} key={movie ? item.movieId : item.id} item={item} handleMovieDelete={handleMovieDelete} saveMovies={saveMovies} />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default MoviesCardList;