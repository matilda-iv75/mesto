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
let inputPlaceName = formAddElement.querySelector('.popup__input_type_place-name');
let inputPlaceUrl = formAddElement.querySelector('.popup__input_type_place-url');

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

let elementLike = document.querySelectorAll('.element__like');
document.querySelectorAll('.element__like').forEach(item => {
    item.addEventListener('click', event => {
        item.classList.toggle('element__like_active');
    });
});

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

function onOverlayClick(event) {
    if (event.target === event.currentTarget) {
        togglePopupProfile();
    }
}
popupProfile.addEventListener('click', onOverlayClick);

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
    name.textContent = item.name;
    const link = newitem.querySelector('.element__image');
    link.src = item.link;
    return newitem;
}

render();


// function saveInputAdd(evt) {
//     const
// }

formAddElement.addEventListener('submit', saveInputAdd);