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
            return (data) });
        }

    patchUserInfoApi(userName, userAbout) {
        this._name = userName;
        this._about = userAbout;
        console.log('patch', this._name, this._about);
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
                // если ошибка, отклоняем промис
               return Promise.reject(`Ошибка: ${res.status}`);
              })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    addNewCard(name, link) {
        this._cardName = name;
        this._cardLink = link;
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers, 
            body: JSON.stringify({
                name: this._cardName,
                link: this._cardLink
            })
        })
            .then(res => {
                if (res.ok) {
                    res.json()
                    }
                // если ошибка, отклоняем промис
               return Promise.reject(`Ошибка: ${res.status}`);
              })
              .catch((err) => {
                console.log(err); // выведем ошибку в консоль
              })
    }

}

