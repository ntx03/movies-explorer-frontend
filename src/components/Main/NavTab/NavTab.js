import './NavTab.css';
import React from 'react';
import { Link } from 'react-router-dom';

function NavTab() {
    return (
        <div className='navtab'>
            <div className='navtab__container'>
                <Link to='/' className='navtab__link'>О проекте</Link>
                <Link to='/' className='navtab__link'>Технологии</Link>
                <Link to='/' className='navtab__link'>Студент</Link>
            </div>
        </div>
    );
}

export default NavTab;