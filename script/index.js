let editButton = document.querySelector('.profile__edit-button');
let closeProfileButton = document.querySelector('.popup__close-icon_profile');
let closeAddButton = document.querySelector('.popup__close-icon_add');
let addButton = document.querySelector('.profile__add-button');

let popupProfile = document.querySelector('.popup_profile');
let popupAdd = document.querySelector('.popup_add');

let formElement = document.querySelector('.popup__form_profile');
let inputName = formElement.querySelector('.popup__input_type_name');
let inputJob = formElement.querySelector('.popup__input_type_job');

let formAddElement = document.querySelector('.popup__form_add');
const inputPlaceName = formAddElement.querySelector('.popup__input_type_place-name');
const inputPlaceUrl = formAddElement.querySelector('.popup__input_type_place-url');


let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');


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

function togglePopupProfile() {
    if (popupProfile.classList.contains('popup_opened')) {
        popupProfile.classList.toggle('popup_opened');
    } else {
        inputName.value = profileTitle.textContent;
        inputJob.value =  profileSubtitle.textContent;
        popupProfile.classList.toggle('popup_opened');
    }
}

function togglePopupAdd() {
    if (popupAdd.classList.contains('popup_opened')) {
        popupAdd.classList.toggle('popup_opened');
    } else {
    popupAdd.classList.toggle('popup_opened');
    }
}

editButton.addEventListener('click', togglePopupProfile);
addButton.addEventListener('click', togglePopupAdd);
closeProfileButton.addEventListener('click', togglePopupProfile);
closeAddButton.addEventListener('click', togglePopupAdd);

// function onOverlayClick(event) {
//     if (event.target === event.currentTarget) {
//         togglePopupProfile();
//     }
// }
// popupProfile.addEventListener('click', onOverlayClick);

function saveInputProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = inputName.value;
    profileSubtitle.textContent = inputJob.value;
    togglePopupProfile();
}

formElement.addEventListener('submit', saveInputProfile);

// добавляем карточку

const elementContainer = document.querySelector('.elements');
const template = document.querySelector('.template');

function render() {
    const html = initialCards.map(getElement);
    elementContainer.append(...html);
}

function getElement(item) {
    const newitem = template.content.cloneNode(true);
    const name = newitem.querySelector('.element__title');
    const link = newitem.querySelector('.element__image');
    const removeButton = newitem.querySelector('.element__remove');
    const like = newitem.querySelector('.element__like');

    name.textContent = item.name;
    link.src = item.link;

    removeButton.addEventListener('click', removeElement);

    like.addEventListener('click', function likeElement() {
      like.classList.toggle('element__like_active');
    });

    return newitem;
}

function removeElement(evt) {
  const elem = evt.target.closest('.card');
  elem.remove();
}

function creatNewElement(evt) {
  evt.preventDefault();
  const element = getElement({name: inputPlaceName.value, link: inputPlaceUrl.value});
  elementContainer.prepend(element);
  inputPlaceName.value = "";
  inputPlaceUrl.value = "";
}

formAddElement.addEventListener('submit', creatNewElement);

render();