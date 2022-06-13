import Section from './Section.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import {initialCards, config, elementContainer, template, 
  profileTitle, profileSubtitle, 
  popupProfile, popupAddCard, popupImage, 
  formAddCardElement, inputPlaceName, inputPlaceUrl, formProfileElement, inputName, inputJob} from './Constants.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

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
  formProfileValidate.resetValidation();
  const popup = new Popup(popupProfile);
  popup.open();
  popup.setEventListeners();
}

function openCardPopup() {
  formAddCardElement.reset();
  formAddCardValidate.resetValidation();
  const popup = new Popup(popupAddCard);
  popup.open();
  popup.setEventListeners();
}

profileEditButton.addEventListener('click', openPropfilePopup);
profileAddButton.addEventListener('click', openCardPopup);

const createCard = new Section ({
  data: initialCards,
  renderer: (item) => {
  const card = new Card (item, template);
  const cardElement = card.generateElement();
  createCard.addItem(cardElement);
 }
}, elementContainer);

createCard.renderItems();

const formProfile = new PopupWithForm ({
  selectorPopup: popupProfile,
  handleFormSubmit: () => {
      const userInfo = new UserInfo (inputName.value, inputJob.value);
      userInfo.setUserInfo();
      formProfile.close();
    }
  });

formProfile.setEventListeners();

const formAddCard = new PopupWithForm ({
  selectorPopup: popupAddCard,
  handleFormSubmit: () => {
    createCard._renderer({name: inputPlaceName.value, link: inputPlaceUrl.value}, template, elementContainer);
    formAddCard.close();
  }
});

formAddCard.setEventListeners();

formAddCardValidate.enableValidation();
formProfileValidate.enableValidation();
