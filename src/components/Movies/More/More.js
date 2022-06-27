import React from 'react';
import './More.css';

function More({ more, setCounter, counter, setMovies }) {
    // состояние ширины экрана
    const [width, setWidth] = React.useState(window.innerWidth);

    // мониторим ширину экрана
    React.useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);

    function moreMovies() {
        if (width > 850) {
            setCounter(counter + 3);
            setMovies(JSON.parse(localStorage.getItem('movies')).slice(0, counter + 3));
        } else {
            setCounter(counter + 2);
            setMovies(JSON.parse(localStorage.getItem('movies')).slice(0, counter + 2));
        }

    }

    return (
        <section className={more ? 'more' : 'more_none'}>
            <div className='more__container'>
                <button className='more__button' onClick={moreMovies} >Ещё</button>
            </div>
        </section>
    );
}

export default More;