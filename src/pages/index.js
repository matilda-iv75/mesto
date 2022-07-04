import '../pages/index.css';
import Section from '../components/Section.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards, config, elementContainer, template, 
  imageContainer, imageTitle, 
  profileTitle, profileSubtitle, 
  popupProfile, popupAddCard, popupImage, 
  formAddCardElement, inputPlaceName, inputPlaceUrl, formProfileElement, 
  inputName, inputJob 
} from '../utils/Constants.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const formProfileValidate = new FormValidator(config, formProfileElement);
const formAddCardValidate = new FormValidator(config, formAddCardElement);

const popupImg = new PopupWithImage(popupImage, imageContainer, imageTitle);
popupImg.setEventListeners();

const userInfo = new UserInfo (profileTitle, profileSubtitle);

const formProfile = new PopupWithForm ({
  selectorPopup: popupProfile,
  handleFormSubmit: (data) => {
      userInfo.setUserInfo(data);
      formProfile.close();
    }
  });

function openPropfilePopup() {
  userInfo.getUserInfo(); 
  inputName.value = userInfo.getUserInfo().name;
  inputJob.value = userInfo.getUserInfo().info;
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
  const card = new Card ({
    data: item, 
    handleCardClick: (title, link) => {
      popupImg.open(title, link);
    }
  }, template);
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
