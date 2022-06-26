import React from 'react';
import Header from '../Header/Header';
import './Profile.css';
import ProfileSection from './ProfileSection/ProfileSection';

function Profile({ loggedIn, movie, movieSave, onClick, logOut, updateUser, errorUpdate, errorEmailUpdate, setErrorUpdate, button, setButton, userName, setUserName, email, setEmail, name, setName }) {
    return (
        <section className='profile-section'>
            <Header loggedIn={loggedIn} movie={movie} movieSave={movieSave} onClick={onClick} />
            <ProfileSection
                logOut={logOut}
                updateUser={updateUser}
                errorUpdate={errorUpdate}
                errorEmailUpdate={errorEmailUpdate}
                setErrorUpdate={setErrorUpdate}
                button={button}
                setButton={setButton}
                userName={userName}
                setUserName={setUserName}
                setEmail={setEmail}
                email={email}
                name={name}
                setName={setName} />
        </section>
    )
}

export default Profile;