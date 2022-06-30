export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export const elementContainer = '.elements';
export const template = document.querySelector('.template');

export const imageContainer = document.querySelector('.popup__image-container');
export const imageTitle = document.querySelector('.popup__image-title');

//export const profileTitle = document.querySelector('.profile__title');
//export const profileSubtitle = document.querySelector('.profile__subtitle');

export const profileTitle = '.profile__title';
export const profileSubtitle = '.profile__subtitle';

//export const popupProfile = document.querySelector('.popup_profile');
//export const popupAddCard = document.querySelector('.popup_add');
//export const popupImage = document.querySelector('.popup_image');
export const popupImage = '.popup_image';
export const popupProfile = '.popup_profile';
export const popupAddCard = '.popup_add';



export const formAddCardElement = document.querySelector('.popup__form_add');
export const inputPlaceName = formAddCardElement.querySelector('.popup__input_type_place-name');
export const inputPlaceUrl = formAddCardElement.querySelector('.popup__input_type_place-url');

export const formProfileElement = document.querySelector('.popup__form_profile');
export const inputName = formProfileElement.querySelector('.popup__input_type_name');
export const inputJob = formProfileElement.querySelector('.popup__input_type_job');
