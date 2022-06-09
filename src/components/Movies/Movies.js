import './Movies.css';
import React from 'react';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from './Preloader/Preloader';

function Movies({ loggedIn, movie, movieSave, onClick, isOpen }) {

    return (
        <section className={isOpen ? 'movies_noScroll' : 'movies'}>
            <Header loggedIn={loggedIn} movie={movie} movieSave={movieSave} onClick={onClick} />
            <SearchForm />
            <MoviesCardList movie={movie} />
            <Preloader />
            <Footer />
        </section>
    );
}

export default Movies;