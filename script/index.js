let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let saveButton = document.querySelector('.popup__save-button');
let closeButton = document.querySelector('.popup__close-icon');
let formElement = document.querySelector('.popup__form');
let inputName = formElement.querySelector('.input__name');
let inputJob = formElement.querySelector('.input__job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let elementLike = document.querySelectorAll('.element__like');

inputName.value = profileTitle.textContent;
inputJob.value =  profileSubtitle.textContent;

document.querySelectorAll('.element__like').forEach(item => {
    item.addEventListener('click', event => {
        item.classList.toggle('element__like_active');
    });
  });

function togglePopup() {
    popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', togglePopup);
saveButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

function onOverlayClick(event) {
    if (event.target === event.currentTarget) {
        togglePopup();
    }
}
popup.addEventListener('click', onOverlayClick);

function saveInput(evt) {
    evt.preventDefault();
    profileTitle.textContent = inputName.value;
    profileSubtitle.textContent = inputJob.value;
}

formElement.addEventListener('submit', saveInput);
