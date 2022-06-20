import React from 'react';
import './More.css';

function More({ more }) {
    return (
        <section className={more ? 'more' : 'more_none'}>
            <div className='more__container'>
                <button className='more__button'>Ещё</button>
            </div>
        </section>
    );
}

export default More;