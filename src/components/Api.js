export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
        console.log('api ', this._baseUrl, this._headers);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
        headers:
          this._headers
        })

        .then(res => {
            if (res.ok) {
            return  res.json()
            .then((data) => {
              return (data) })
              }
              return Promise.reject(`Ошибка: ${res.status}`);
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
         });
      }

    getUserInfoApi() {
        return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
        })

        .then(res => res.json())
        .then((data) => {
            this._userId = data._id;
            console.log('userInfo', data);
            return (data)
         });
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
        });
    }

    patchUserAvatarApi(newAvatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers, 
            body: JSON.stringify({
              avatar: newAvatar} )
        });
    }

    toggleLikeApi(cardId, isLikes) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLikes ? 'DELETE' : 'PUT',
            headers: this._headers
            })
            .then(res => {
                if (res.ok) {
                    res.json()
                    }
                // если ошибка, отклоняем промис
               return Promise.reject(`Ошибка: ${res.status}`);
              });
    }

    deleteCardApi(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
            })
            .then(res => {
                if (res.ok) {
                    res.json()
                    }
                return Promise.reject(`Ошибка: ${res.status}`);
              })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
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
            .then(res => {
                if (res.ok) {
                    res.json()
                    }
                return Promise.reject(`Ошибка: ${res.status}`);
              })
              .catch((err) => {
                console.log(err); // выведем ошибку в консоль
              })
    }

    setLikesCard(cardID, like) {
        return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
              method: like ? 'PUT' : 'DELETE',
              headers: this._headers
            })
            .then(res => {
                if (res.ok) {
                    res.json()
                    }
                return Promise.reject(`Ошибка: ${res.status}`);
              })
              .catch((err) => {
                console.log(err); // выведем ошибку в консоль
              })

    }
}

