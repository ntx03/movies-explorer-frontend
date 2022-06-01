import React from 'react';
import './Profile.css';

function Profile() {
    return (
        <section className='profile'>
            <div className='profile__container'>
                <h2 className='profile__title'>Привет, Андрей!</h2>
                <div className='profile__box'>
                    <p className='profile__input-name'>Имя</p>
                    <input type="text" className='profile__input' required value='Андрей' />
                </div>
                <div className='profile__line'></div>
                <div className='profile__box'>
                    <p className='profile__input-name'>E-mail</p>
                    <input type="email" className='profile__input' required value='ntx033@yandex.ru' />
                </div>

                <p className='profile__edit-error_none'>При обновлении профиля произошла ошибка.</p>
                <button className='profile__edit'>Сохранить</button>
                <button className='profile__exit'>Выйти из аккаунта</button>
            </div>
        </section>
    );
}

export default Profile;