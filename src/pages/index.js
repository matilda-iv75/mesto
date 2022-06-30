import '../pages/index.css';
import Section from '../components/Section.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards, config, elementContainer, template, 
  profileTitle, profileSubtitle, 
  popupProfile, popupAddCard, popupImage, 
  formAddCardElement, inputPlaceName, inputPlaceUrl, formProfileElement, inputName, inputJob} from '../components/Constants.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const formProfileValidate = new FormValidator(config, formProfileElement);
const formAddCardValidate = new FormValidator(config, formAddCardElement);

const popupImg = new PopupWithImage(popupImage);

export default function handleCardClick (title, link) {
  popupImg.open(title, link);
}

popupImg.setEventListeners();

const userInfo = new UserInfo (profileTitle, profileSubtitle);

const formProfile = new PopupWithForm ({
  selectorPopup: popupProfile,
  handleFormSubmit: (data) => {
    console.log("handle ", data);
      userInfo.getUserInfo(data);
      formProfile.close();
    }
  });

function openPropfilePopup() {
  userInfo.setUserInfo();
  formProfileValidate.resetValidation();
  formProfile.open();
}
formProfile.setEventListeners();

const formAddCard = new PopupWithForm ({
  selectorPopup: popupAddCard,
  handleFormSubmit: (data) => {
    newCard({name: data.place, link: data.url});
    formAddCard.close();
  }
});

function openCardPopup() {
  formAddCardElement.reset();
  formAddCardValidate.resetValidation();
  formAddCard.open();
}
formAddCard.setEventListeners();

function newCard(item) {
  const card = new Card (item, template);
  const cardElement = card.generateElement();
  createCard.addItem(cardElement);
}

const createCard = new Section ({
  data: initialCards,
  renderer: (item) => {
    newCard(item);
  }
}, elementContainer);

createCard.renderItems();

profileEditButton.addEventListener('click', openPropfilePopup);
profileAddButton.addEventListener('click', openCardPopup);

formAddCardValidate.enableValidation();
formProfileValidate.enableValidation();
