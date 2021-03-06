export const BASE_URL = 'https://back.kachur.nomoreparties.sbs';

export const register = (password, email, name) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email, name })
    })
        .then((res) => {
            try {
                if (res.ok) {
                    return res.json();
                } else return res.status;
            } catch (e) {
                return (e)
            }
        })
}

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then((res) => {
            try {
                if (res.ok) {
                    return res.json();
                } else return res.status;
            } catch (e) {
                return (e)
            }
        })
        .then((res) => {
            if (res === 401) {
                return res;
            } else {
                return localStorage.setItem('token', res.token);;
            }
        })
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
        .then((response) => {
            try {
                if (response.ok) {
                    return response.json();
                }
            } catch (e) {
                return (e)
            }
        })
}