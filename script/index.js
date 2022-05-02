const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileCloseButton = document.querySelector('.popup__close-icon_profile');
const popupCardCloseButton = document.querySelector('.popup__close-icon_add');
const popupImageCloseButton = document.querySelector('.popup__close-icon_image');

const popupProfile = document.querySelector('.popup_profile');
const popupAddCard = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');

const formProfileElement = document.querySelector('.popup__form_profile');
const inputName = formProfileElement.querySelector('.popup__input_type_name');
const inputJob = formProfileElement.querySelector('.popup__input_type_job');

const formAddCardElement = document.querySelector('.popup__form_add');
const inputPlaceName = formAddCardElement.querySelector('.popup__input_type_place-name');
const inputPlaceUrl = formAddCardElement.querySelector('.popup__input_type_place-url');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const imageContainer = document.querySelector('.popup__image-container');
const imageTitle = document.querySelector('.popup__image-title');

const errorList = document.getElementsByTagName('span');
const submitAdd = document.getElementById('submit_add');
const submitProfile = document.getElementById('submit_profile');
const popups = document.querySelectorAll('.popup');

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

function cleanErrorMessage() {
    for (var i = 0; i < errorList.length; i++) {
      errorList[i].textContent = '';
    }
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

function onEscapeClick(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', onEscapeClick);
}

function closePopup(popup) {
  cleanErrorMessage();
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', onEscapeClick);
}

function openPropfilePopup() {
  inputName.value = profileTitle.textContent;
  inputJob.value =  profileSubtitle.textContent;
  submitProfile.disabled = false;
  submitProfile.classList.remove('popup__button_disabled');
  openPopup(popupProfile);
}

function closeProfilePopup() {
  closePopup(popupProfile);
}

function openCardPopup() {
  submitAdd.classList.add('popup__button_disabled');
  formAddCardElement.reset();
  submitAdd.disabled = true;
  openPopup(popupAddCard);
}

function closeCardPopup() {
  closePopup(popupAddCard);
}

function closeImagePopup() {
  closePopup(popupImage);
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

// добавляем карточку

const elementContainer = document.querySelector('.elements');
const template = document.querySelector('.template');

function render() {
    const html = initialCards.map(getElement);
    elementContainer.append(...html);
}

function getElement(item) {
    const newItem = template.content.cloneNode(true);
    const name = newItem.querySelector('.element__title');
    const cardImage = newItem.querySelector('.element__image');
    const buttonRemove = newItem.querySelector('.element__remove');
    const like = newItem.querySelector('.element__like');

    name.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = `Изображение ${item.name}`;

    cardImage.addEventListener('click', () => handleCardClick(item));
    buttonRemove.addEventListener('click', removeElement);
    like.addEventListener('click', clickLikeElement);

    return newItem;
}

function clickLikeElement(event) {
  event.target.classList.toggle('element__like_active');
}

const handleCardClick = (item) => {
  imageContainer.src = item.link;
  imageContainer.alt = `Изображение ${item.name}`;
  imageTitle.textContent = item.name;
  openPopup(popupImage);
}

function removeElement(evt) {
  const elem = evt.target.closest('.card');
  elem.remove();
}

function creatNewElement(evt) {
  evt.preventDefault();
  const element = getElement({name: inputPlaceName.value, link: inputPlaceUrl.value});
  elementContainer.prepend(element);
  closeCardPopup(); 
}

formAddCardElement.addEventListener('submit', creatNewElement);

render();