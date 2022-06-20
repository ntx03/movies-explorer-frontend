class Api {
    constructor(config) {
        this._headers = config.headers
    }

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    //получаем информацию о пользователе
    getUser() {
        return fetch('https://back.kachur.nomoreparties.sbs/users/me', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(this._checkError);
    }

    //получаем информацию о пользователе
    getMovies() {
        return fetch('https://back.kachur.nomoreparties.sbs/movies', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then(this._checkError);
    }

    //обновляем пользователя
    patchUser({ name, email }) {
        const newConfing = {
            method: 'PATCH',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email })
        }
        return fetch(`https://back.kachur.nomoreparties.sbs/users/me`, newConfing)
            .then(this._checkError);
    }

    // удаляем фильм из базы
    removeMovie(movieId) {
        const newConfing = {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
        }
        return fetch(`https://back.kachur.nomoreparties.sbs/movies/${movieId}`, newConfing)
            .then(this._checkError);
    }

    //создаем новую карточку
    patchMovie(dataMovie) {
        const newConfing = {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataMovie),
        }
        return fetch('https://back.kachur.nomoreparties.sbs/movies', newConfing)
            .then(this._checkError);
    }

    // ставим лайк 
    /* changeLikeCardStatus(cardId, isLiked) {
         const updateLike = {
             headers: {
                 'authorization': `Bearer ${localStorage.getItem('token')}`,
                 'Content-Type': 'application/json',
             },
             method: 'PUT',
         }
 
         const deleteLike = {
             headers: {
                 'authorization': `Bearer ${localStorage.getItem('token')}`,
                 'Content-Type': 'application/json',
             },
             method: 'DELETE',
         }
         return fetch(`https://back.kachur.nomoreparties.sbs/cards/${cardId}/likes`, isLiked ? deleteLike : updateLike)
             .then(this._checkError);
     }
 
     // отправляем информацию 
     patchProfileInfo(userData) {
         const newConfing = {
             method: 'PATCH',
             headers: {
                 'authorization': `Bearer ${localStorage.getItem('token')}`,
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(userData),
         }
         return fetch('https://back.kachur.nomoreparties.sbs/users/me', newConfing)
             .then(this._checkError);
     }*/


}

export default new Api({
    baseUrl: `https://back.kachur.nomoreparties.sbs`,
    headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`,
    }
});


