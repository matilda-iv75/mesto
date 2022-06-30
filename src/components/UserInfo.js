const formProfileElement = document.querySelector('.popup__form_profile');
const inputName = formProfileElement.querySelector('.popup__input_type_name');
const inputJob = formProfileElement.querySelector('.popup__input_type_job');

export default class UserInfo {
    constructor (name, info){
        this._name = document.querySelector(name);
        this._info = document.querySelector(info);
    }

    setUserInfo () {
        inputName.value = this._name.textContent;
        inputJob.value =  this._info.textContent;
    }

    getUserInfo(data) {
        this._name.textContent = data.name;
        this._info.textContent = data.job;
    }

}