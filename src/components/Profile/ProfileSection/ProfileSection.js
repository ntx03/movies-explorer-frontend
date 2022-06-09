import React from 'react';
import './ProfileSection.css';
import { useState } from "react";
import { Link } from 'react-router-dom';

function ProfileSection() {
    const [email, setEmail] = useState('');
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const [name, setName] = useState('');
    const onChangeName = (e) => {
        setName(e.target.value)
    }

    return (
        <section className='profile'>
            <div className='profile__container'>
                <h2 className='profile__title'>Привет, Андрей!</h2>
                <div className='profile__box'>
                    <p className='profile__input-name'>Имя</p>
                    <input type="text" className='profile__input' required value={name || ''} onChange={onChangeName} placeholder='Имя' />
                </div>
                <div className='profile__line'></div>
                <div className='profile__box'>
                    <p className='profile__input-name'>E-mail</p>
                    <input type="email" className='profile__input' required value={email || ''} onChange={onChangeEmail} placeholder='Email' />
                </div>

                <p className='profile__edit-error_none'>При обновлении профиля произошла ошибка.</p>
                <button className='profile__edit'>Сохранить</button>
                <Link to={'/'} className='profile__exit'>Выйти из аккаунта</Link>
            </div>
        </section>
    );
}

export default ProfileSection;