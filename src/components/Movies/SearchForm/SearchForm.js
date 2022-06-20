import React from 'react';
import './SearchForm.css';
import { getMoviesNomoreparties } from '../../../utils/MoviesApi';

function SearchForm() {

    const [search, setSearch] = React.useState('');
    const onChange = (e) => {
        setSearch(e.target.value)
    }
    const [validate, setValidate] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    // ищем фильмы
    const searchMovies = (e) => {
        e.preventDefault();
        if (search < 1) {
            setValidate(true);
        } else {
            localStorage.setItem('checked', checked);
            localStorage.setItem('search', search);
            getMoviesNomoreparties()
                .then((res) => {
                    console.log(res);
                    localStorage.setItem('movies', res);
                    const movies = res.filter((movie) => {
                        const item = movie.nameRU.split(' ').filter((i) => {
                            return i.toUpperCase() == search.toUpperCase();
                        })

                        function countryNull(movie) {
                            if (movie.country == null) {
                                return 'неизвестно'
                            } else return movie.country;
                        }
                        console.log(countryNull(movie));
                        return item.join().toUpperCase() == search.toUpperCase() ||
                            countryNull(movie) == search.toUpperCase() ||
                            movie.description == search ||
                            movie.director == search ||
                            movie.nameEN == search ||
                            movie.year == search
                    });
                    console.log(movies);
                })
                .catch((e) => { console.log(e.message) })
        }
    }

    const checkedCheckbox = () => {
        console.log(checked);
        if (!checked) {
            setChecked(true);
            alert('true');
        } else { setChecked(false); alert('false'); }
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