import './SavedMovies.css';
import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ loggedIn, movie, movieSave, onClick, isOpen }) {

    return (
        <section className={isOpen ? 'movies_noScroll' : 'movies'}>
            <Header loggedIn={loggedIn} movie={movie} movieSave={movieSave} onClick={onClick} />
            <SearchForm />
            <MoviesCardList movie={movie} />
            <Footer />
        </section>
    );
}

export default SavedMovies; 