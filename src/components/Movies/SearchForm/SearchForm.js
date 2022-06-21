import React from 'react';
import './SearchForm.css';
import { getMoviesNomoreparties } from '../../../utils/MoviesApi';

function SearchForm({ setMovies, movies, checked, setChecked }) {

    const [search, setSearch] = React.useState('');
    const onChange = (e) => {
        setSearch(e.target.value)
    }
    const [validate, setValidate] = React.useState(false);
    // const [checked, setChecked] = React.useState(false);

    // ищем фильмы
    const searchMovies = (e) => {
        e.preventDefault();
        if (search < 1) {
            setValidate(true);
        } else {
            //  localStorage.setItem('checked', checked);
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
                    localStorage.setItem('movies', JSON.stringify(moviesFilter));
                    setMovies(moviesFilter);
                    console.log(moviesFilter);
                })
                .catch((e) => { console.log(e.message) })
        }
    }

    const checkedCheckbox = () => {
        console.log(checked);
        if (!checked) {
            setMovies(movies.filter(i => i.duration <= 40));
            setChecked(true);
        } else { setChecked(false); setMovies(JSON.parse(localStorage.getItem('movies'))); }
    }
    return (
        <div className='search-form'>
            <div className='search-form__container' onSubmit={searchMovies}>
                <form className='search-form__box'>
                    <input type='search' placeholder='Фильм' value={search || ''} onChange={onChange} onClick={() => { setValidate(false) }} className='search-form__field' minLength={1} />
                    <button className='search-form__button'>Найти</button>
                </form>
                <div className='search__error-container'>
                    <p className={validate ? 'search__name-error' : 'search__name-error_none'}>Нужно ввести ключевое слово</p>
                </div>
                <div className='search-form__checkbox-container'>
                    <div className='search-form__checkbox-box'>
                        <input type='checkbox' className='search-form__checkbox' checked={checked} onChange={checkedCheckbox} />
                    </div>
                    <p className='search-form__checkbox-text'>Короткометражки</p>
                </div>
                <div className='search-form__line'></div>
            </div>
        </div>
    );
}

export default SearchForm;