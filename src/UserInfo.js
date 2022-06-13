const formProfileElement = document.querySelector('.popup__form_profile');
const inputName = formProfileElement.querySelector('.popup__input_type_name');
const inputJob = formProfileElement.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

export default class UserInfo {
    constructor (name, info){
        this._name = name;
        this._info = info;
    }

    getUserInfo () {
        inputName.value = this._name;
        inputJob.value =  this._info;
    }

    setUserInfo(){
        profileTitle.textContent = this._name;
        profileSubtitle.textContent = this._info;
    }

}