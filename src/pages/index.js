//import '../pages/index.css';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';

import PopupConfirm from "../components/PopupConfirm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {config, elementContainer, selectorTemplate, 
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

function createNewCard(item) {
  const card = new Card ({
    data: {...item, currentUserId: userId},
    handleCardClick: (title, link) => {
      popupImg.open(title, link);
    },

    handleBusketClick: () => {
      popupConfirm.open();
      popupConfirm.setSubmitAction(() => {
      api.deleteCardApi(card._id)
      .then(()=> {
        card.removeCard();
        popupConfirm.close()
      })
      .catch(err => console.log(`Ошибка удаления: ${err}`))
      })
    },

    handleLikeClick: () => {
      api.toggleLikeApi(card.getId(), !card.isLiked())
        .then(data => {
          card.setLikesInfo(data);
          console.log('datalike', data.likes)
        })
        .catch(err => console.log(`Ошибка изменения статуса лайка: ${err}`))
    }
  },
  selectorTemplate);
  return card.generateElement();
}

const popupConfirm = new PopupConfirm ({
  selectorPopup: popupConfirmElement,
  handleFormSubmit: () => {}
});
popupConfirm.setEventListeners();

const cardList = new Section({
  renderer: (data) => {
    cardList.addItem(createNewCard(data));
  }
}, elementContainer);

const formAddCard = new PopupWithForm ({
  selectorPopup: popupAddCard,
  handleFormSubmit: (data) => {
    formAddCard.renderLoading(true);
    api.addNewCard(data.place, data.url)
    .then((cardData) => {
      cardList.addItem(createNewCard(cardData));
      formAddCard.close();
    })
    .catch(err => console.log(`Ошибка добавление карточки: ${err}`))
    .finally(() => formAddCard.renderLoading(false));
  }
});
formAddCard.setEventListeners();

const userInfo = new UserInfo (profileTitle, profileSubtitle, profileAvatar);

//const popupImg = new PopupWithImage(popupImage, imageContainer, imageTitle);
const popupImg = new PopupWithImage(popupImage);
popupImg.setEventListeners();

const formProfile = new PopupWithForm ({
  selectorPopup: popupProfile,
  handleFormSubmit: (data) => {
    formProfile.renderLoading(true);
    api.patchUserInfoApi(data.name, data.about)
    .then(() => {
      userInfo.setUserInfo(data);
      formProfile.close()
    })
    .catch(err => console.log(`Ошибка при обновлении информации о пользователе: ${err}`))
    .finally(() => formProfile.renderLoading(false));
    }
});

function openPropfilePopup() {
  api.getUserInfoApi().then((res) => {
    inputName.value = res.name;
    inputJob.value = res.about;
    formProfileValidate.resetValidation();
    formProfile.open();
  });
}
formProfile.setEventListeners();

const formUpdateAvatar = new PopupWithForm ({
  selectorPopup: popupUpdateAvatar,
  handleFormSubmit: (data) => {
    formUpdateAvatar.renderLoading(true);
    api.patchUserAvatarApi(data.avatar)
    .then(() => {
    userInfo.setUserAvatar(data);
    formUpdateAvatar.close()
    })

    .catch(err => console.log(`Ошибка изменения аватара пользователя: ${err}`))
    .finally(() => formUpdateAvatar.renderLoading(false));
  }
});

function openUpdateAvatarPopup() {
  formUpdateAvatarValidate.resetValidation();
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

Promise.all([api.getInitialCards(), api.getUserInfoApi()])

.then(([cards, userData]) => {
  userId = userData._id;
  userInfo.setUserInfo({
    name: userData.name,
    about: userData.about,
  });
  userInfo.setUserAvatar({avatar: userData.avatar});
  cardList.renderItems(cards.reverse());
})

.catch((err)=>{
    console.log(`Ошибка загрузки данных: ${err}`)
})