import './App.css';
import React from 'react';
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import { useLocation } from 'react-router-dom';
import Movies from '../Movies/Movies';
import Navigation from '../Navigation/Navigation';
import SavedMovies from '../SavedMovies/SavedMovies';
import { register, authorize, getContent } from '../../utils/auth';
import api from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/currentUserContext';
import { getMoviesNomoreparties } from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute';
import Preloader from '../Preloader/Preloader';

function App() {
  let location = useLocation();

  const navigate = useNavigate();

  // проверка регистрации
  const [loggedIn, setLoggedIn] = useState(false);

  // меняем шрифт в header "фильмы"
  const [movie, setMovie] = useState(false);

  // меняем шрифт в header "Сохраненные фильмы"
  const [movieSave, setMovieSave] = useState(false);

  // открытие попапа навигации
  const [navigation, setNavigation] = useState(false);

  //ошибка при регистрации email
  const [registerErrorEmail, setRegisterErrorEmail] = useState(false);

  // ошибка при регистрации общая
  const [registerError, setRegisterError] = useState(false);

  // общая ошибка при авторизации
  const [loginError, setLoginError] = useState(false);

  // ошибка при вводе данных
  const [loginErrorAuthorize, setLoginErrorAuthorize] = useState(false);

  //ошибка при обновлении профиля
  const [errorUpdate, setErrorUpdate] = useState(false);

  //ошибка при обновлении профиля (email уже существует)
  const [errorEmailUpdate, setErrorEmailUpdate] = useState(false);

  // данный пользователя
  const [currentUser, setCurrentUser] = useState({});

  // фильмы c общего сервера
  const [movies, setMovies] = useState();

  // фильмы с нашего сервера
  const [saveMovies, setSaveMovies] = useState();

  // управление компонентом More
  const [more, setMore] = useState(false);
  // управление чекбоксом короткометражек
  const [checked, setChecked] = React.useState(false);


  useEffect(() => {
    if (location.pathname === '/movies') {
      setMovie(false); setMovieSave(true);
    }
    if (location.pathname === '/saved-movies') {
      setMovie(true); setMovieSave(false);
      api.getMovies()
        .then((c) => {
          setSaveMovies(c.filter(c => c.owner === currentUser._id));
          console.log(c.filter(c => c.owner === currentUser._id));
        })
        .catch((e) => { console.log(e.message) })
    }
  }, [location.pathname])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const movies = localStorage.getItem('movies');
      const checked = localStorage.getItem('checked');
      if (token) {
        Promise.all([getContent(token), api.getMovies()])
          .then(([res, c]) => {
            if (res) {
              setCurrentUser(res);
              setLoggedIn(true);
              setErrorUpdate(false);
              navigate('/movies');
              setMovies(JSON.parse(movies));
              setChecked(checked);
            }
            setSaveMovies(c.filter(c => c.owner === currentUser._id));
            console.log(c.filter(c => c.owner === currentUser._id));
          })
          .catch((e) => console.log(e.message))
      }
    }
  }, [loggedIn])

  // открываем меню навигации
  function openNavigationMenu() {
    setNavigation(true);
  }
  // закрываем меню навигации
  function closeNavigationMenu() {
    setNavigation(false);
  }

  // регистрируем пользователя
  function onRegister(password, email, name) {
    register(password, email, name)
      .then((res) => {
        if (res === 409) {
          setRegisterErrorEmail(true);
          setRegisterError(false);
        } else {
          navigate('/movies');
          setRegisterErrorEmail(false);
          setLoggedIn(true);
        }
      })
      .catch(() => {
        setRegisterErrorEmail(true);
        setRegisterError(true);
      });
  }
  // проходим авторизацию
  function onLogin(password, email) {
    authorize(password, email)
      .then((res) => {
        //setIsInfoTooltipOpen(true);
        if (res === 401) {
          setLoginErrorAuthorize(true);
          setLoggedIn(false);
          setLoginError(false);
        } else {
          navigate('/movies');
          setLoggedIn(true);
          setMovies([]);
        }
      })
      .catch(() => {
        setLoginErrorAuthorize(true);
        setLoginError(true);
        setLoggedIn(false);
      });
  }
  // выходим из профиля
  function logOut() {
    navigate('/');
    localStorage.removeItem('token', 'checked', 'search');
    localStorage.setItem('movies', []);
    setLoggedIn(false);
  }

  // обновление профиля
  function updateUser(name, email) {
    setCurrentUser({
      name: name,
      email: email
    })
    api.patchUser({ name, email })
      .then((res) => {
        if (res) {
          navigate('/movies');
          setErrorUpdate(false);
        }
      })
      .catch((err) => {
        if (err === 'Ошибка: 409') {
          setErrorUpdate(true);
          setErrorEmailUpdate(true);
        } else {
          setErrorUpdate(true);
          setErrorEmailUpdate(false);
        }
      });
  }
  // удаление карточки
  function handleMovieDelete(movie) {
    api.removeMovie(movie._id)
      .then(() => {
        setSaveMovies(state => state.filter(c => c._id !== movie._id))
      })
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path='/' element={<Main loggedIn={loggedIn} movie={movie} movieSave={movieSave} errorRegisterEmail={() => setRegisterErrorEmail(false)} errorloginAuthorize={() => setLoginErrorAuthorize(false)} />} />
          <Route path='/movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies loggedIn={loggedIn}
                more={more}
                movies={movies}
                movie={movie}
                movieSave={movieSave}
                isOpen={navigation}
                saveMovies={saveMovies}
                onClick={openNavigationMenu}
                setMovies={setMovies}
                checked={checked}
                setChecked={setChecked} />
            </ProtectedRoute>} />
          <Route path='/profile' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile loggedIn={loggedIn} movie={movie} movieSave={movieSave} onClick={openNavigationMenu} logOut={logOut} setErrorUpdate={setErrorUpdate} updateUser={updateUser} errorUpdate={errorUpdate} errorEmailUpdate={errorEmailUpdate} />
            </ProtectedRoute>} />
          <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies loggedIn={loggedIn} movie={movie} movieSave={movieSave} onClick={openNavigationMenu} isOpen={navigation} saveMovies={saveMovies} movies={movies} handleMovieDelete={handleMovieDelete} />
            </ProtectedRoute>} />
          <Route path='/signup' element={<Register onRegister={onRegister} errorRegisterEmail={registerErrorEmail} errorRegister={registerError} />} />
          <Route path='/signin' element={<Login onLogin={onLogin} loginErrorAuthorize={loginErrorAuthorize} loginError={loginError} />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <Navigation isOpen={navigation} movie={movie} isClose={closeNavigationMenu} goToMain={() => { setLoggedIn(false); setNavigation(false); }} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
