import './Movies.css';
import React from 'react';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import More from './More/More';
import Preloader from '../Preloader/Preloader';

function Movies({ loggedIn, movie, movieSave, onClick, isOpen, movies, saveMovies, more, setMovies, setChecked, checked }) {

    return (
        <section className={isOpen ? 'movies_noScroll' : 'movies'}>
            <Header loggedIn={loggedIn} movie={movie} movieSave={movieSave} onClick={onClick} />
            <SearchForm setMovies={setMovies} movies={movies} checked={checked} setChecked={setChecked} />
            <Preloader />
            <MoviesCardList movie={movie} movies={movies} saveMovies={saveMovies} />
            <More more={more} />
            <Footer />
        </section>
    );
}

export default Movies;