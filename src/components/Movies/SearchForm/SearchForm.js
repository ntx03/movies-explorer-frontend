import React from 'react';
import './SearchForm.css';
import { getMoviesNomoreparties } from '../../../utils/MoviesApi';
import api from '../../../utils/MainApi';
import CurrentUserContext from '../../../contexts/currentUserContext';

function SearchForm({ setMovies, movies, checked, setChecked, movie, saveMovies, setSaveMovies, setPreloader, setList, setPreloaderNotFound, setPreloaderSearch, setPreloaderError, setMore, setCounter }) {
    const user = React.useContext(CurrentUserContext);
    const [search, setSearch] = React.useState('');
    const onChange = (e) => {
        setSearch(e.target.value)
    }
    // состояние валидации кнопки найти
    const [validate, setValidate] = React.useState(false);

    // состояние ширины экрана
    const [width, setWidth] = React.useState(window.innerWidth);

    // мониторим ширину экрана
    React.useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        // subscribe to window resize event "onComponentDidMount"
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            // unsubscribe "onComponentDestroy"
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);


    function widthMoviesFilter(i) {
        if (width > 850) {
            if (i.length <= 12) {
                setMovies(i);
                setMore(false);
            } else {
                setMovies(i.slice(0, 12));
                setMore(true);
                setCounter(12);
            }

        } else if (450 > width <= 850) {
            if (i.length <= 8) {
                setMovies(i);
                setMore(false);
            } else {
                setMovies(i.slice(0, 8));
                setMore(true);
                setCounter(8);
            }
        }
        if (width <= 450) {
            if (i.length <= 5) {
                setMovies(i);
                setMore(false);
            } else {
                setMovies(i.slice(0, 5));
                setMore(true);
                setCounter(5);
            }
        }

    }

    // ищем фильмы
    const searchMovies = (e) => {
        e.preventDefault();
        console.log(width);
        if (search < 1) {
            setValidate(true);
        } else {
            setPreloader(true);
            setPreloaderSearch(true);
            setPreloaderError(false);
            setPreloaderNotFound(false);
            setList(false);
            setMore(false);
            localStorage.setItem('search', search);
            getMoviesNomoreparties()
                .then((res) => {
                    const moviesFilter = res.filter((movie) => {
                        function noNull(i) {
                            if (i == null) {
                                return 'неизвестно'
                            } else return i;
                        }
                        const ruName = noNull(movie.nameRU).split(' ').filter((i) => {
                            return i.toUpperCase() == search.toUpperCase();
                        })
                        const enName = noNull(movie.nameEN).split(' ').filter((i) => {
                            return i.toUpperCase() == search.toUpperCase();
                        })
                        const description = noNull(movie.description).split(' ').filter((i) => {
                            return i.toUpperCase() == search.toUpperCase();
                        })
                        const director = noNull(movie.director).split(' ').filter((i) => {
                            return i.toUpperCase() == search.toUpperCase();
                        })
                        const country = noNull(movie.country).split(' ').filter((i) => {
                            return i.toUpperCase() == search.toUpperCase();
                        })

                        //console.log(noNull(movie.country));
                        return ruName.join().toUpperCase() == search.toUpperCase() ||
                            country.join().toUpperCase() == search.toUpperCase() ||
                            description.join().toUpperCase() == search.toUpperCase() ||
                            director.join().toUpperCase() == search.toUpperCase() ||
                            enName.join().toUpperCase() == search.toUpperCase() ||
                            noNull(movie.year).toUpperCase() == search.toUpperCase()
                    });

                    if (moviesFilter.length === 0) {
                        setPreloaderNotFound(true);
                        setPreloaderSearch(false);
                    } else {
                        localStorage.setItem('movies', JSON.stringify(moviesFilter));
                        setPreloader(false);
                        setList(true);
                        setCounter(0);
                        widthMoviesFilter(moviesFilter);

                        /*  if (checked) {
                              setMovies(moviesFilter.filter(i => i.duration <= 40));
                              setPreloader(false);
                              setList(true);
                          } else {
                              setMovies(JSON.parse(localStorage.getItem('movies')))
                              console.log(moviesFilter);
                              setPreloader(false);
                              setList(true);
                          }*/
                    }
                })
                .catch((e) => {
                    setPreloaderNotFound(false);
                    setPreloaderSearch(false);
                    setPreloaderError(true);
                    console.log(e.message)
                })
        }
    }

    // Ищем короткометражки
    const checkedCheckbox = () => {
        console.log(checked);

        function filter(i) {
            return i.filter(i => i.duration <= 40);
        }
        if (checked) {
            { movie ? setSaveMovies(filter(saveMovies)) : widthMoviesFilter(filter(movies)) }
            setChecked(false);
        } else {
            setChecked(true);
            const storageMovies = JSON.parse(localStorage.getItem('movies'));
            console.log(storageMovies);
            { movie ? setSaveMovies(JSON.parse(localStorage.getItem('savemovies'))) : widthMoviesFilter(storageMovies) }
        }
    }

    // ищем в сохраненных фильмах
    function searchSaveMovies(e) {
        e.preventDefault();
        if (search < 1) {
            setValidate(true);
        } else {
            setPreloader(true);
            setList(false);
            setPreloaderError(false);
            setPreloaderSearch(true);
            setPreloaderNotFound(false);
            api.getMovies()
                .then((res) => {
                    const moviesFilter = res.filter((movie) => {
                        const ruName = movie.nameRU.split(' ').filter((i) => {
                            return i.toUpperCase() == search.toUpperCase();
                        })
                        const enName = movie.nameEN.split(' ').filter((i) => {
                            return i.toUpperCase() == search.toUpperCase();
                        })
                        const description = movie.description.split(' ').filter((i) => {
                            return i.toUpperCase() == search.toUpperCase();
                        })
                        const director = movie.director.split(' ').filter((i) => {
                            return i.toUpperCase() == search.toUpperCase();
                        })
                        const country = movie.country.split(' ').filter((i) => {
                            return i.toUpperCase() == search.toUpperCase();
                        })
                        return ruName.join().toUpperCase() == search.toUpperCase() ||
                            country.join().toUpperCase() == search.toUpperCase() ||
                            description.join().toUpperCase() == search.toUpperCase() ||
                            director.join().toUpperCase() == search.toUpperCase() ||
                            enName.join().toUpperCase() == search.toUpperCase() ||
                            movie.year.toUpperCase() == search.toUpperCase()
                    });
                    localStorage.setItem('savemovies', JSON.stringify(moviesFilter));
                    if (moviesFilter.length === 0) {
                        setPreloaderNotFound(true);
                        setPreloaderSearch(false);
                    } else {
                        setSaveMovies(moviesFilter.filter(c => c.owner === user._id));
                        setPreloader(false);
                        setList(true);
                        console.log(user);
                        /* if (checked) {
                             setSaveMovies(moviesFilter.filter(i => i.duration <= 40));
                             setPreloader(false); setList(true);
                         } else {
                             setSaveMovies(JSON.parse(localStorage.getItem('savemovies')))
                             setPreloader(false); setList(true);
                         }*/
                        console.log(moviesFilter);
                    }
                })
                .catch((e) => {
                    setPreloaderNotFound(false);
                    setPreloaderSearch(false);
                    setPreloaderError(true);
                    console.log(e.message)
                })
        }
    }

    return (
        <div className='search-form'>
            <div className='search-form__container' onSubmit={movie ? searchSaveMovies : searchMovies}>
                <form className='search-form__box'>
                    <input type='search' placeholder='Фильм' value={search || ''} onChange={onChange} onClick={() => { setValidate(false) }} className='search-form__field' minLength={1} />
                    <button className='search-form__button'>Найти</button>
                </form>
                <div className='search__error-container'>
                    <p className={validate ? 'search__name-error' : 'search__name-error_none'}>Нужно ввести ключевое слово</p>
                </div>
                <div className='search-form__checkbox-container'>
                    <div className='search-form__checkbox-box'>
                        <input type='checkbox' className='search-form__checkbox' checked={!checked} onChange={checkedCheckbox} />
                    </div>
                    <p className='search-form__checkbox-text'>Короткометражки</p>
                </div>
                <div className='search-form__line'></div>
            </div>
        </div>
    );
}

export default SearchForm;