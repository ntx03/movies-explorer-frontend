import './NavTab.css';
import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

function NavTab() {
    return (
        <div className='navtab'>
            <div className='navtab__container'>
                <Link to='/#aboutProject' className='navtab__link'>О проекте</Link>
                <Link to='/#techs' className='navtab__link'>Технологии</Link>
                <Link to='/#aboutMe' className='navtab__link'>Студент</Link>
            </div>
        </div>
    );
}

export default NavTab;