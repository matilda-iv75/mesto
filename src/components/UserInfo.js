export default class UserInfo {
    constructor (name, info, avatar) {
        this._name = document.querySelector(name);
        this._info = document.querySelector(info);
        this._avatar = document.querySelector(avatar);
    }

    setUserInfo (data) {
        this._name.textContent = data.name;
        this._info.textContent = data.about;
    }

    setUserAvatar(data) {
        this._avatar.src = data.avatar;
    }

    getUserInfo() {
        return ({name: data.name, about: this._info, avatar: this._avatar.src});
    }
}