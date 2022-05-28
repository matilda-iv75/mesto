import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

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

const initialCards = [
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

export default function handleCardClick (title, link) {
  imageContainer.src = link;
  imageContainer.alt = `Изображение ${title}`;
  imageTitle.textContent = title;
  openPopup(popupImage);
}

function handlClosePopup() {
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-icon')) {
          closePopup(popup)
        }
    });
  });
}

function handleEscKey(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscKey);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscKey);
}

function openPropfilePopup() {
  inputName.value = profileTitle.textContent;
  inputJob.value =  profileSubtitle.textContent;
  const formProfileValidate = new FormValidator(config, formProfileElement);
  formProfileValidate.enableValidation();
  formProfileValidate.resetValidation();
  openPopup(popupProfile);
}

function closeProfilePopup() {
  closePopup(popupProfile);
}

function openCardPopup() {
  formAddCardElement.reset();
  const formAddCardValidate = new FormValidator(config, formAddCardElement);
  formAddCardValidate.enableValidation();
  formAddCardValidate.resetValidation();
  openPopup(popupAddCard);
}

function closeCardPopup() {
  closePopup(popupAddCard);
}

profileEditButton.addEventListener('click', openPropfilePopup);
profileAddButton.addEventListener('click', openCardPopup);
handlClosePopup();

function saveInputProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = inputName.value;
    profileSubtitle.textContent = inputJob.value;
    closeProfilePopup();
}

formProfileElement.addEventListener('submit', saveInputProfile);

// ***** добавляем карточку *****

const elementContainer = document.querySelector('.elements');
const template = document.querySelector('.template');

function createCard(item, template) {
  const card = new Card(item, template);
  const cardElement = card.generateElement();
  return cardElement;
}

function creatNewElement(evt) {
  evt.preventDefault();
  const cardElement = createCard({name: inputPlaceName.value, link: inputPlaceUrl.value}, template);
  elementContainer.prepend(cardElement);
  closeCardPopup();
}

formAddCardElement.addEventListener('submit', creatNewElement);

initialCards.forEach ((item) => {
    const cardElement = createCard(item, template);
    elementContainer.append(cardElement);
});

const formList = Array.from(document.querySelectorAll(config.formSelector));

formList.forEach((form) => {
  const formValidate = new FormValidator(config, form);
  formValidate.enableValidation();
});