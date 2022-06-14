import React from 'react';
import Header from '../Header/Header';
import './Profile.css';
import ProfileSection from './ProfileSection/ProfileSection';

function Profile({ loggedIn, movie, movieSave, onClick, logOut, updateUser, errorUpdate, errorEmailUpdate, setErrorUpdate }) {
    return (
        <section className='profile-section'>
            <Header loggedIn={loggedIn} movie={movie} movieSave={movieSave} onClick={onClick} />
            <ProfileSection logOut={logOut} updateUser={updateUser} errorUpdate={errorUpdate} errorEmailUpdate={errorEmailUpdate} setErrorUpdate={setErrorUpdate} />
        </section>
    )
}

export default Profile;