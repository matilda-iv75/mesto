import '../pages/index.css';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';

import PopupConfirm from "../components/PopupConfirm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {config, elementContainer, template, 
  imageContainer, imageTitle, 
  profileTitle, profileSubtitle, profileAvatar, 
  popupProfile, popupAddCard, popupImage, popupUpdateAvatar, popupConfirmElement,
  formAddCardElement, inputPlaceName, inputPlaceUrl, formProfileElement, 
  inputName, inputJob, inputAvatar, formUpdateAvatarElement 
} from '../utils/Constants.js';

const cardRemoveBusket = document.querySelectorAll('.element__remove');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileAvatarImg = document.querySelector('.profile__avatar');

const formProfileValidate = new FormValidator(config, formProfileElement);
const formAddCardValidate = new FormValidator(config, formAddCardElement);
const formUpdateAvatarValidate = new FormValidator(config, formUpdateAvatarElement);

let userId = null;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: '6b506c6b-b072-4535-8d1e-46a2f4f0d191',
    'Content-Type': 'application/json'
  }
});

api.getInitialCards().then((res) => {
  res.forEach(item => {
    document.querySelector(elementContainer).append(newCard(item))
 });
});

function newCard(item) {
  const card = new Card ({
    data: {...item, currentUserId: userId},
    handleCardClick: (title, link) => {
      popupImg.open(title, link);
    },

    handleBusketClick: () => {
      popupConfirm.open();
      popupConfirm.setSubmitAction(() => {
      api.deleteCardApi(card._id);
      card.removeCard();
      popupConfirm.close();
      })
    },

    handleLikeClick: () => {
      api.setLikesCard(card.setId(), !card.isLiked());
      console.log('likeclick', card, card.isLiked());
      card.setLikesInfo({ ...item });
    } 
  },
    template);
  return card.generateElement();
}

const popupConfirm = new PopupConfirm ({
  selectorPopup: popupConfirmElement,
  handleFormSubmit: () => {}
});
popupConfirm.setEventListeners();

const cardList = new Section({
  renderer: (data) => {
    cardList.addItem(newCard(data));
  }
}, elementContainer);

const formAddCard = new PopupWithForm ({
  selectorPopup: popupAddCard,
  handleFormSubmit: (data) => {
    api.addNewCard(data.place, data.url)
    formAddCard.close();
  }
});
formAddCard.setEventListeners();

const userInfo = new UserInfo (profileTitle, profileSubtitle, profileAvatar);

api.getUserInfoApi().then((res) => {
  userId = res._id;
  userInfo.setUserInfo(res);
  userInfo.setUserAvatar(res);
});

const popupImg = new PopupWithImage(popupImage, imageContainer, imageTitle);
popupImg.setEventListeners();

const formProfile = new PopupWithForm ({
  selectorPopup: popupProfile,
  handleFormSubmit: (data) => {
    formProfile.close();
    userInfo.setUserInfo(data);
    api.patchUserInfoApi(data.name, data.about);
    }
});

function openPropfilePopup() {
  api.getUserInfoApi().then((res) => {
    inputName.value = res.name;
    inputJob.value = res.about;
    formProfileValidate.resetValidation();
    formProfile.open();
  })
}
formProfile.setEventListeners();

const formUpdateAvatar = new PopupWithForm ({
  selectorPopup: popupUpdateAvatar,
  handleFormSubmit: (data) => {
    formUpdateAvatar.close();
    userInfo.setUserAvatar(data);
    api.patchUserAvatarApi(data.avatar);
    formUpdateAvatar.close();
  }
});

function openUpdateAvatarPopup() {
  formUpdateAvatar.open();
}
formUpdateAvatar.setEventListeners();

function openCardPopup() {
  formAddCardElement.reset();
  formAddCardValidate.resetValidation();
  formAddCard.open();
}

profileEditButton.addEventListener('click', openPropfilePopup);
profileAddButton.addEventListener('click', openCardPopup);
profileAvatarImg.addEventListener('click', openUpdateAvatarPopup);

formAddCardValidate.enableValidation();
formProfileValidate.enableValidation();
formUpdateAvatarValidate.enableValidation();
