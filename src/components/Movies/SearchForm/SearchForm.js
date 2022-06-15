import React from 'react';
import './SearchForm.css';

function SearchForm() {

    const [search, setSearch] = React.useState('');
    const onChange = (e) => {
        setSearch(e.target.value)
    }
    const [validate, setValidate] = React.useState(false);

    const searchMovies = (e) => {
        e.preventDefault();
        if (search < 1) {
            setValidate(true);
        } else { alert('Ищем фильм') }
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
                        <input type='checkbox' className='search-form__checkbox' />
                    </div>
                    <p className='search-form__checkbox-text'>Короткометражки</p>
                </div>
                <div className='search-form__line'></div>
            </div>
        </div>
    );
}

export default SearchForm;