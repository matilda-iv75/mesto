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

function openPopup(popup) {
    popup.classList.add('popup_opened');
  }

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPropfilePopup() {
  const popup = popupProfile;
  inputName.value = profileTitle.textContent;
  inputJob.value =  profileSubtitle.textContent;
  openPopup(popup);
}

function closeProfilePopup() {
  const popup = popupProfile;
  closePopup(popup);
}

function openCardPopup() {
  const popup = popupAddCard;
  openPopup(popup);
}

function closeCardPopup() {
  const popup = popupAddCard;
  closePopup(popup);
}

profileEditButton.addEventListener('click', openPropfilePopup);
profileAddButton.addEventListener('click', openCardPopup);
profileCloseButton.addEventListener('click', closeProfilePopup);
popupCardCloseButton.addEventListener('click', closeCardPopup);
popupImageCloseButton.addEventListener('click', closeImagePopup);

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

    const handleCardClick = (item) => {
      imageContainer.src = item.link;
      imageContainer.alt = `Изображение ${item.name}`;
      imageTitle.textContent = item.name;
      const popup = popupImage;
      openPopup(popup);
      popup.classList.add('popup_opened_img');
    }

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

function closeImagePopup() {
  const popup = popupImage;
  closePopup(popup);
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
  inputPlaceName.value = "";
  inputPlaceUrl.value = "";
}

formAddCardElement.addEventListener('submit', creatNewElement);

render();