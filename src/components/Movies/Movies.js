import './Movies.css';
import React from 'react';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import More from './More/More';
import Preloader from '../Preloader/Preloader';

function Movies({
    loggedIn,
    movie,
    movieSave,
    onClick,
    isOpen,
    movies,
    saveMovies,
    more,
    setMore,
    setMovies,
    setChecked,
    checked,
    setPreloader,
    preloader,
    list,
    setList,
    preloaderNotFound,
    setPreloaderNotFound,
    preloaderSearch,
    setPreloaderSearch,
    preloaderError,
    setPreloaderError,
    setCounter,
    counter
}) {

    return (
        <section className={isOpen ? 'movies_noScroll' : 'movies'}>
            <Header loggedIn={loggedIn} movie={movie} movieSave={movieSave} onClick={onClick} />
            <SearchForm setMovies={setMovies}
                movies={movies}
                checked={checked}
                setChecked={setChecked}
                movie={movie}
                setPreloader={setPreloader}
                setList={setList}
                setPreloaderNotFound={setPreloaderNotFound}
                setPreloaderSearch={setPreloaderSearch}
                setPreloaderError={setPreloaderError}
                setMore={setMore}
                setCounter={setCounter} />
            <Preloader preloader={preloader} preloaderNotFound={preloaderNotFound} preloaderSearch={preloaderSearch} preloaderError={preloaderError} />
            <MoviesCardList movie={movie} movies={movies} saveMovies={saveMovies} list={list} />
            <More more={more} setCounter={setCounter} counter={counter} setMovies={setMovies} />
            <Footer />
        </section>
    );
}

export default Movies;