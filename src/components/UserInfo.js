export default class UserInfo {
    constructor (name, info) {
        this._name = document.querySelector(name);
        this._info = document.querySelector(info);
    }

    setUserInfo (data) {
        this._name.textContent = data.name;
        this._info.textContent = data.job;
    }

    getUserInfo() {
        return ({name: this._name.textContent, info: this._info.textContent});
    }

}