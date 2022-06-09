import './App.css';
import React from 'react';
import { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import { useLocation } from 'react-router-dom';
import Movies from '../Movies/Movies';
import Navigation from '../Navigation/Navigation';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {

  // хук useLocation();
  let location = useLocation();

  // проверка регистрации
  const [loggedIn, setLoggedIn] = useState(false);

  // меняем шрифт в header "фильмы"
  const [movie, setMovie] = useState(false);

  // меняем шрифт в header "Сохраненные фильмы"
  const [movieSave, setMovieSave] = useState(false);

  // открытие попапа навигации
  const [navigation, setNavigation] = useState(false);

  useEffect(() => {
    if (location.pathname === '/') {
      setLoggedIn(false);
    }
    if (location.pathname === '/movies') {
      setLoggedIn(true); setMovie(false); setMovieSave(true);
    }
    if (location.pathname === '/profile') {
      setLoggedIn(true);
    }
    if (location.pathname === '/saved-movies') {
      setLoggedIn(true); setMovie(true); setMovieSave(false);
    }
  })

  function openNavigationMenu() {
    setNavigation(true);
  }

  function closeNavigationMenu() {
    setNavigation(false);
  }

  return (
    <div className='app'>
      <div className="page">
        <Routes>
          <Route path='/' element={<Main loggedIn={loggedIn} movie={movie} movieSave={movieSave} />} />
          <Route path='/movies' element={<Movies loggedIn={loggedIn} movie={movie} movieSave={movieSave} onClick={openNavigationMenu} isOpen={navigation} />} />
          <Route path='/profile' element={<Profile loggedIn={loggedIn} movie={movie} movieSave={movieSave} onClick={openNavigationMenu} />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/saved-movies' element={<SavedMovies loggedIn={loggedIn} movie={movie} movieSave={movieSave} onClick={openNavigationMenu} isOpen={navigation} />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <Navigation isOpen={navigation} movie={movie} isClose={closeNavigationMenu} />
      </div>

    </div>
  );
}

export default App;
