
export const BASE_URL = 'https://api.nomoreparties.co';

export const getMoviesNomoreparties = () => {
    return fetch(`${BASE_URL}/beatfilm-movies`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
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