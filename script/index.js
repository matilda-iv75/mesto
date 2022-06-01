import Section from './Section.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards, elementContainer} from './Constants.js';
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from './UserInfo.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popupProfile = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_add');

const formProfileElement = document.querySelector('.popup__form_profile');
const inputName = formProfileElement.querySelector('.popup__input_type_name');
const inputJob = formProfileElement.querySelector('.popup__input_type_job');

const formAddCardElement = document.querySelector('.popup__form_add');
const inputPlaceName = formAddCardElement.querySelector('.popup__input_type_place-name');
const inputPlaceUrl = formAddCardElement.querySelector('.popup__input_type_place-url');

const errorList = document.getElementsByTagName('span');
const submitAdd = document.getElementById('submit_add');
const submitProfile = document.getElementById('submit_profile');
const popups = document.querySelectorAll('.popup');

const imageContainer = document.querySelector('.popup__image-container');
const imageTitle = document.querySelector('.popup__image-title');
const popupImage = document.querySelector('.popup_image');

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const formProfileValidate = new FormValidator(config, formProfileElement);
const formAddCardValidate = new FormValidator(config, formAddCardElement);

export default function handleCardClick (title, link) {
  const popupImg = new PopupWithImage(title, link, popupImage);
  popupImg.open();
  popupImg.setEventListeners();
}

function openPropfilePopup() {
  const userInfo = new UserInfo (profileTitle.textContent, profileSubtitle.textContent);
  userInfo.getUserInfo();
  //inputName.value = profileTitle.textContent;
  //inputJob.value =  profileSubtitle.textContent;
  formProfileValidate.resetValidation();
  const popup = new Popup(popupProfile);
  popup.open();
  popup.setEventListeners();
}

// function closeProfilePopup() {
//   closePopup(popupProfile);
// }

function openCardPopup() {
  formAddCardElement.reset();
  formAddCardValidate.resetValidation();
  const popup = new Popup(popupAddCard);
  popup.open();
  popup.setEventListeners();
}

// function closeCardPopup() {
//   closePopup(popupAddCard);
// }

profileEditButton.addEventListener('click', openPropfilePopup);
profileAddButton.addEventListener('click', openCardPopup);

function saveInputProfile(evt) {
    evt.preventDefault();
    const userInfo = new UserInfo (inputName.value, inputJob.value);
    userInfo.setUserInfo();
    const popup = new Popup(popupProfile);
    popup.close();
}

formProfileElement.addEventListener('submit', saveInputProfile);

// ***** добавляем карточку *****

//const elementContainer = document.querySelector('.elements');
const template = document.querySelector('.template');

const createCard = new Section ({
  data: initialCards,
  renderer: (item) => {
  const card = new Card(item, template);
  const cardElement = card.generateElement();
  createCard.addItem(cardElement);
 }
}, elementContainer);

createCard.renderItems();

// function createCard(item, template) {
//   const card = new Card(item, template);
//   const cardElement = card.generateElement();
//   return cardElement;
// }

// function creatNewElement(evt) {
//   evt.preventDefault();
//   const cardElement = createCard({name: inputPlaceName.value, link: inputPlaceUrl.value}, template);
//   elementContainer.prepend(cardElement);
//   closeCardPopup();
// }

// function creatNewElement(evt) {
//     evt.preventDefault();
//     const cardElement = createCard({name: inputPlaceName.value, link: inputPlaceUrl.value}, template);

//     //elementContainer.prepend(cardElement);
//     //closeCardPopup();
//     const popup = new Popup (popupAddCard);
//     popup.close();
//   }

// formAddCardElement.addEventListener('submit', creatNewElement);

// initialCards.forEach ((item) => {
//     const cardElement = createCard(item, template);
//     elementContainer.append(cardElement);
// });

formAddCardValidate.enableValidation();
formProfileValidate.enableValidation();
