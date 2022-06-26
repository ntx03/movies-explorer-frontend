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

  // фильмы c общего сервера
  const [movies, setMovies] = useState([]);

  // фильмы с нашего сервера
  const [saveMovies, setSaveMovies] = useState([]);

  // управление компонентом More
  const [more, setMore] = useState(false);

  //  управление прелоадером в общем
  const [preloader, setPreloader] = useState(false);

  //  управление прелоадером поиск
  const [preloaderSearch, setPreloaderSearch] = useState(false);

  //  управление прелоадером c надписбю ошибки
  const [preloaderError, setPreloaderError] = useState(false);

  //  управление надписью "не найдено" в прелоадере 
  const [preloaderNotFound, setPreloaderNotFound] = useState(false);

  // управление cardlist
  const [list, setList] = useState(true);

  // состояние ширины экрана
  const [width, setWidth] = useState(window.innerWidth);

  // счетчик 
  const [counter, setCounter] = useState(0);

  // управление чекбоксом короткометражек в фильмах
  const [checked, setChecked] = React.useState(false);

  // управление чекбоксом короткометражек в сохраненных фильмах
  const [saveChecked, setSaveChecked] = React.useState(false);

  // управление кнопкой в профиле пользователя
  const [button, setButton] = useState(false);

  // имя пользователя в профиле пользователя
  const [userName, setUserName] = useState('Вася');

  // емайл пользователя в инпуте профиля
  const [email, setEmail] = useState('');

  // имя пользователя в инпуте профиля
  const [name, setName] = useState('');

  // мониторим ширину экрана
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  // приводим в порядок данные 
  function filterMoviesBadData() {
    const moviesStorage = localStorage.getItem('movies');
    if (moviesStorage == '') {
      return []
    } else if (moviesStorage == null) {
      return []
    } else return JSON.parse(moviesStorage);
  }

  function widthFilmFilter(i) {
    if (width > 850) {
      if (i.length <= 12) {
        setMovies(i);
        setMore(false);
      } else {
        setMovies(i.slice(0, 12));
        setCounter(12);
        setMore(true);
      }

    } else if (450 > width <= 850) {
      if (i.length <= 8) {
        setMovies(i);
        setMore(false);
      } else {
        setMovies(i.slice(0, 8));
        setCounter(8);
        setMore(true);
      }
    }
    if (width <= 450) {
      if (i.length <= 5) {
        setMovies(i);
        setMore(false);
      } else {
        setMovies(i.slice(0, 5));
        setCounter(5);
        setMore(true);
      }
    }
  }

  // отключаем кнопку ЕЩЕ 
  useEffect(() => {
    if (filterMoviesBadData().length <= counter) {
      setMore(false);
    }
  }, [counter]);

  useEffect(() => {
    if (location.pathname === '/signup') {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        const checkedMovies = localStorage.getItem('checked');
        if (token) {
          Promise.all([getContent(token), api.getMovies()])
            .then(([res, c]) => {
              if (res) {
                setCurrentUser(res);
                setLoggedIn(true);
                setErrorUpdate(false);
              }
              localStorage.setItem('savemovies', JSON.stringify(c.filter(c => c.owner === currentUser._id)));
              setSaveMovies(c.filter(c => c.owner === currentUser._id));
              { !checkedMovies ? widthFilmFilter(filterMoviesBadData().filter(i => i.duration <= 40)) : widthFilmFilter(filterMoviesBadData()) }
              navigate('/movies');
            })
            .catch((e) => console.log(e.message))
        }
      } else return;
    }
    if (location.pathname === '/signin') {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        const checkedMovies = localStorage.getItem('checked');

        if (token) {
          Promise.all([getContent(token), api.getMovies()])
            .then(([res, c]) => {
              if (res) {
                setCurrentUser(res);
                setLoggedIn(true);
                setErrorUpdate(false);
              }
              localStorage.setItem('savemovies', JSON.stringify(c.filter(c => c.owner === currentUser._id)));
              setSaveMovies(c.filter(c => c.owner === currentUser._id));
              { !checkedMovies ? widthFilmFilter(filterMoviesBadData().filter(i => i.duration <= 40)) : widthFilmFilter(filterMoviesBadData()) }
              navigate('/movies');
            })
            .catch((e) => console.log(e.message))
        }
      } else return;
    }
    if (location.pathname === '/movies') {
      setMovie(false); setMovieSave(true);
      const token = localStorage.getItem('token');
      const checkedMovies = localStorage.getItem('checked');
      Promise.all([getContent(token), api.getMovies()])
        .then(([res, c]) => {
          if (res) {
            setCurrentUser(res);
            setErrorUpdate(false);
            setLoggedIn(true);
          }
          localStorage.setItem('savemovies', JSON.stringify(c.filter(c => c.owner === currentUser._id)));
          setSaveMovies(c.filter(c => c.owner === currentUser._id));
          { !checkedMovies ? widthFilmFilter(filterMoviesBadData().filter(i => i.duration <= 40)) : widthFilmFilter(filterMoviesBadData()) }
        })
        .catch((e) => console.log(e.message))
    }
    if (location.pathname === '/saved-movies') {
      setMovie(true); setMovieSave(false); setList(true);
      const token = localStorage.getItem('token');
      Promise.all([getContent(token), api.getMovies()])
        .then(([res, c]) => {
          if (res) {
            setCurrentUser(res);
            setErrorUpdate(false);
            setLoggedIn(true);
          }
          setSaveMovies(c.filter(c => c.owner === res._id));
          localStorage.setItem('savemovies', JSON.stringify(c.filter(c => c.owner === res._id)));
          if (saveChecked) {
            setSaveMovies(saveMovies.filter(i => i.duration <= 40));
          } else setSaveMovies(JSON.parse(localStorage.getItem('savemovies')))
        })
        .catch((e) => { console.log(e.message) })
    }
    if (location.pathname === '/profile') {
      const token = localStorage.getItem('token');
      setButton(false);
      getContent(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
          setUserName(res.name);
          setName(res.name);
          setEmail(res.email);
        })
        .catch((e) => { console.log(e.message) })
    }
  }, [location.pathname])


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
          authorize(password, email)
            .then((res) => {
              const token = localStorage.getItem('token');
              if (res === 401) {
                setLoginErrorAuthorize(true);
                setLoggedIn(false);
                setLoginError(false);
              } else {
                getContent(token)
                  .then((res) => {
                    if (res) {
                      setCurrentUser(res);
                      setLoggedIn(true);
                      setErrorUpdate(false);
                      setMovies([]);
                      localStorage.setItem('movies', []);
                      localStorage.setItem('loggedIn', true);
                      navigate('/movies');
                    }
                  })
                  .catch((e) => console.log(e.message))
              }
            })
            .catch(() => {
              setRegisterErrorEmail(true);
              setRegisterError(true);
            });
        }
      })
  }
  // проходим авторизацию
  function onLogin(password, email) {
    authorize(password, email)
      .then((res) => {
        const token = localStorage.getItem('token');
        if (res === 401) {
          setLoginErrorAuthorize(true);
          setLoggedIn(false);
          setLoginError(false);
        } else {
          Promise.all([getContent(token), api.getMovies()])
            .then(([res, c]) => {
              if (res) {
                setCurrentUser(res);
                setLoggedIn(true);
                setErrorUpdate(false);
                localStorage.setItem('loggedIn', true);
                localStorage.setItem('movies', []);
                navigate('/movies');
              }
              localStorage.setItem('savemovies', JSON.stringify(c.filter(c => c.owner === currentUser._id)));
              setSaveMovies(c.filter(c => c.owner === currentUser._id));
            })
            .catch((e) => console.log(e.message))
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
    localStorage.removeItem('search');
    localStorage.removeItem('checked');
    localStorage.removeItem('savechecked');
    localStorage.removeItem('movies');
    localStorage.removeItem('savemovies');
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
  }

  // обновление профиля
  function updateUser(name, email) {
    setCurrentUser({
      name: name,
      email: email,
      _id: currentUser._id
    })
    api.patchUser({ name, email })
      .then((res) => {
        if (res) {
          setButton(false);
          setErrorUpdate(false);
          setUserName(res.name);
          navigate('/profile');
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
        setSaveMovies(state => state.filter(c => c._id !== movie._id));
        localStorage.setItem('savemovies', JSON.stringify(saveMovies.filter(c => c._id !== movie._id)));
      })
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path='/' element={<Main loggedIn={loggedIn}
            movie={movie}
            movieSave={movieSave}
            errorRegisterEmail={() => setRegisterErrorEmail(false)}
            errorloginAuthorize={() => setLoginErrorAuthorize(false)} />} />
          <Route path='/movies' element={
            <ProtectedRoute loggedIn={localStorage.getItem('loggedIn')}>
              <Movies
                loggedIn={localStorage.getItem('loggedIn')}
                more={more}
                setMore={setMore}
                movies={movies}
                movie={movie}
                movieSave={movieSave}
                isOpen={navigation}
                saveMovies={saveMovies}
                onClick={openNavigationMenu}
                setMovies={setMovies}
                checked={checked}
                setChecked={setChecked}
                preloader={preloader}
                setPreloader={setPreloader}
                list={list}
                setList={setList}
                preloaderNotFound={preloaderNotFound}
                setPreloaderNotFound={setPreloaderNotFound}
                preloaderSearch={preloaderSearch}
                setPreloaderSearch={setPreloaderSearch}
                preloaderError={preloaderError}
                setPreloaderError={setPreloaderError}
                setCounter={setCounter}
                counter={counter}
              />
            </ProtectedRoute>} />
          <Route path='/profile' element={
            <ProtectedRoute loggedIn={localStorage.getItem('loggedIn')}>
              <Profile loggedIn={localStorage.getItem('loggedIn')}
                movie={movie}
                movieSave={movieSave}
                onClick={openNavigationMenu}
                logOut={logOut}
                setErrorUpdate={setErrorUpdate}
                updateUser={updateUser}
                errorUpdate={errorUpdate}
                errorEmailUpdate={errorEmailUpdate}
                button={button}
                setButton={setButton}
                userName={userName}
                setUserName={setUserName}
                email={email}
                setEmail={setEmail}
                name={name}
                setName={setName} />
            </ProtectedRoute>} />
          <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={localStorage.getItem('loggedIn')}>
              <SavedMovies loggedIn={localStorage.getItem('loggedIn')}
                movie={movie}
                movieSave={movieSave}
                onClick={openNavigationMenu}
                isOpen={navigation}
                saveMovies={saveMovies}
                movies={movies}
                handleMovieDelete={handleMovieDelete}
                setSaveMovies={setSaveMovies}
                saveChecked={saveChecked}
                setSaveChecked={setSaveChecked}
                setPreloader={setPreloader}
                preloader={preloader}
                list={list}
                setList={setList}
                preloaderNotFound={preloaderNotFound}
                setPreloaderNotFound={setPreloaderNotFound}
                preloaderSearch={preloaderSearch}
                setPreloaderSearch={setPreloaderSearch}
                preloaderError={preloaderError}
                setPreloaderError={setPreloaderError} />
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
