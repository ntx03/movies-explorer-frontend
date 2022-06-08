import React from 'react';
import './SearchForm.css';

function SearchForm() {
    return (
        <div className='search-form'>
            <div className='search-form__container' noValidate>
                <form className='search-form__box'>
                    <input type='search' placeholder='Фильм' className='search-form__field' required />
                    <button className='search-form__button'>Найти</button>
                </form>
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