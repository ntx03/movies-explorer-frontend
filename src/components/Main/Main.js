import './Main.css';
import React from 'react';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function Main(props) {


    return (
        <section className='main'>
            <Header loggedIn={props.loggedIn} movie={props.movie} movieSave={props.movieSave} errorRegisterEmail={props.errorRegisterEmail} errorloginAuthorize={props.errorloginAuthorize} />
            <Promo />
            <NavTab />
            <AboutProject />
            <Techs id='about' />
            <AboutMe id='faq-1' />
            <Portfolio />
            <Footer id='ap' />
        </section>
    );
}

export default Main;