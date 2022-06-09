import React from 'react';
import Header from '../Header/Header';
import './Profile.css';
import ProfileSection from './ProfileSection/ProfileSection';

function Profile({ loggedIn, movie, movieSave, onClick }) {
    return (
        <section className='profile-section'>
            <Header loggedIn={loggedIn} movie={movie} movieSave={movieSave} onClick={onClick} />
            <ProfileSection />
        </section>
    )
}

export default Profile;