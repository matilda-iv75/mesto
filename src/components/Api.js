export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    } 

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
        headers:
          this._headers
        })
        .then(this._getResponseData)
    }

    getUserInfoApi() {
        return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
        })
        .then(this._getResponseData)
        .then((data) => {
            this._userId = data._id;
            return (data)
         })
        }

    patchUserInfoApi(userName, userAbout) {
        this._name = userName;
        this._about = userAbout;
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              name: this._name,
              about: this._about
            })
        })
        .then(this._getResponseData)
    }

    patchUserAvatarApi(newAvatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers, 
            body: JSON.stringify({
              avatar: newAvatar} )
        })
        .then(this._getResponseData)
    }

    toggleLikeApi(cardId, isLikes) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLikes ? 'PUT' : 'DELETE',
            headers: this._headers
            })
            .then(this._getResponseData)
    }

    deleteCardApi(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
            })
            .then(this._getResponseData)
    }

    addNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers, 
            body: JSON.stringify({
                name,
                link
            })
        })
        .then(this._getResponseData)
    }

}

