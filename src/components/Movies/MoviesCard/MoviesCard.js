import React, { useEffect, useState } from 'react';
import './MoviesCard.css';
import api from '../../../utils/MainApi'

function MoviesCard({ movie, item, handleMovieDelete, saveMovies }) {
    const URL = 'https://api.nomoreparties.co';

    const [like, setLike] = useState(false);

    useEffect(() => {
        saveMovies.forEach((i) => {
            if (item.id === i.movieId) {
                setLike(true);
            }
        })
    }, [item])

    // преобразуем данные со временем
    function durationMovie(item) {
        const time = item.duration;
        const hour = Math.floor(time / 60);
        const minutes = time - (60 * hour);
        if (hour > 1) {
            return `${hour}ч ${minutes}м`
        } else return `${time}м`
    }
    // ставим или убираем лайк на карточке с фильмом
    function likeClick() {

        // валидация ссылок
        const linkValidation = () => {
            const re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
            if (!re.test(String(item.trailerLink).toLowerCase())) {
                return 'https://www.youtube.com/'
            } else return item.trailerLink;
        }
        //данные фильма
        const dataMovie = {
            country: item.country || 'Неизвестно',
            director: item.director || 'Неизвестно',
            duration: item.duration || 'Неизвестно',
            year: item.year || 'Неизвестно',
            description: item.description || 'Неизвестно',
            image: URL + item.image.url || 'https://djkazu.supervinyl.net/application/files/9914/6139/6114/diary_detail_no_image.png',
            trailerLink: linkValidation(),
            nameRU: item.nameRU || 'Неизвестно',
            nameEN: item.nameEN || 'Неизвестно',
            thumbnail: URL + item.image.formats.thumbnail.url || URL,
            movieId: item.id,
        }

        if (!like) {
            api.patchMovie(dataMovie)
                .then((res) => {
                    setLike(true);
                })
                .catch((e) => console.log(e.message))
        } else {
            api.getMovies()
                .then((res) => {
                    res.forEach((movie) => {
                        if (movie.movieId === item.id) {
                            api.removeMovie(movie._id)
                                .then(() => {
                                    setLike(false)
                                })
                                .catch((e) => console.log(e.message))
                        }
                    })
                })
                .catch((e) => console.log(e.message))
        }
    }

    // удаление фильма
    function movieDelete() {
        handleMovieDelete(item);
    }

    return (
        <article className='card'>
            <div className="card__image-container">
                <a href={item.trailerLink} target='_blank' ><img className="card__image" src={movie ? item.image : URL + item.image.url} alt={item.nameRU} /></a>
            </div>
            <div className="card__title-container">
                <h2 className="card__title">{item.nameRU}</h2>
                <button className={movie ? 'card__heard_none' : (like ? 'card__heard' : 'card__heard_black')} type="button" onClick={likeClick} aria-label="лайк карточки"></button>
                <button className={movie ? 'card__delete' : 'card__delete_none'} type="button" onClick={movieDelete} aria-label="значок удаления карточки"></button>
            </div>
            <div className='card__time-movie'>{durationMovie(item)}</div>
        </article>
    );
}

export default MoviesCard;