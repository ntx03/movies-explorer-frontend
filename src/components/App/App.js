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
import { getMovies } from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute';

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
  // фильмы
  const [movies, setMovies] = useState();

  useEffect(() => {
    if (location.pathname === '/movies') {
      setMovie(false); setMovieSave(true);
      const token = localStorage.getItem('token');
      if (token) {
        getContent(token)
          .then((res) => {
            if (res) {
              setCurrentUser(res);
            }
          })
          .catch((e) => console.log(e.message))

      }
    }
    if (location.pathname === '/saved-movies') {
      setMovie(true); setMovieSave(false);
    }
  }, [location.pathname])

  // проверка токена при входе на сайт
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (token) {
        getContent(token)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              setErrorUpdate(false);
            }
          })
          .catch((e) => console.log(e.message))
        getMovies()
          .then((item) => {
            setMovies(item)
            console.log(item)
            navigate('/movies');
          })
          .catch((e) => console.log(e.message))
      }
    }

  }, [loggedIn])

  /*// берем карточки с сервера
    useEffect(() => {
      getMovies()
        .then((item) => {
          setMovies(item)
          console.log(item)
        })
        .catch((e) => console.log(e.message))
  
    }, [])*/

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
        //setIsInfoTooltipOpen(true);
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
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  // обновление профиля
  function updateUser(name, email) {
    api.patchUser({ name, email })
      .then((res) => {
        //setIsInfoTooltipOpen(true);
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
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path='/' element={<Main loggedIn={loggedIn} movie={movie} movieSave={movieSave} errorRegisterEmail={() => setRegisterErrorEmail(false)} errorloginAuthorize={() => setLoginErrorAuthorize(false)} />} />
          <Route path='/movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies loggedIn={loggedIn} movies={movies} movie={movie} movieSave={movieSave} isOpen={navigation} onClick={openNavigationMenu} />
            </ProtectedRoute>} />
          <Route path='/profile' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile loggedIn={loggedIn} movie={movie} movieSave={movieSave} onClick={openNavigationMenu} logOut={logOut} setErrorUpdate={setErrorUpdate} updateUser={updateUser} errorUpdate={errorUpdate} errorEmailUpdate={errorEmailUpdate} />
            </ProtectedRoute>} />
          <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies loggedIn={loggedIn} movie={movie} movieSave={movieSave} onClick={openNavigationMenu} isOpen={navigation} />
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
