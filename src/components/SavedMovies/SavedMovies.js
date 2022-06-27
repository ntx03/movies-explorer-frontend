import './SavedMovies.css';
import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function SavedMovies({
    loggedIn,
    movie,
    movieSave,
    onClick,
    isOpen,
    saveMovies,
    handleMovieDelete,
    movies,
    setSaveMovies,
    saveChecked,
    setSaveChecked,
    preloader,
    setPreloader,
    list,
    setList,
    preloaderNotFound,
    setPreloaderNotFound,
    preloaderSearch,
    setPreloaderSearch,
    preloaderError,
    setPreloaderError
}) {

    return (
        <section className={isOpen ? 'movies_noScroll' : 'movies'}>
            <Header loggedIn={loggedIn} movie={movie} movieSave={movieSave} onClick={onClick} />
            <SearchForm
                movie={movie}
                saveMovies={saveMovies}
                setSaveMovies={setSaveMovies}
                setSaveChecked={setSaveChecked}
                saveChecked={saveChecked}
                setPreloader={setPreloader}
                setList={setList}
                setPreloaderNotFound={setPreloaderNotFound}
                setPreloaderError={setPreloaderError}
                setPreloaderSearch={setPreloaderSearch}
            />
            <Preloader preloader={preloader} preloaderNotFound={preloaderNotFound} preloaderSearch={preloaderSearch} preloaderError={preloaderError} />
            <MoviesCardList
                movie={movie}
                movies={saveMovies}
                handleMovieDelete={handleMovieDelete}
                saveMovies={movies}
                list={list}
            />
            <Footer />
        </section>
    );
}

export default SavedMovies; 