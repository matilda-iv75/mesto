  const popupImage = document.querySelector('.popup_image');
  const imageContainer = document.querySelector('.popup__image-container');
  const imageTitle = document.querySelector('.popup__image-title');
  const popupImageCloseButton = document.querySelector('.popup__close-icon_image');
  
export class Card {
    constructor (data, template) {
        this._title = data.name;
        this._link = data.link;
        this._template = template;
    }

    _getElement() {
        const newItem = this._template.content.querySelector('.card').cloneNode(true);
        return newItem;
    }

    _handleOpenPopup(){
        imageContainer.src = this._link;
        imageContainer.alt = `Изображение ${this._title}`;
        imageTitle.textContent = this._title;
        popupImage.classList.add('popup_opened');
     }

    _handleClosePopup() {
        imageContainer.src = '';
        imageContainer.alt = '';
        imageTitle.textContent = '';
        popupImage.classList.remove('popup_opened');
    }

    _liked() {
        this._like.classList.toggle('element__like_active');
    }

    _setEventListeners() {
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleOpenPopup();
        });

        popupImageCloseButton.addEventListener('click', () => {
            this._handleClosePopup();
        });

        this._like.addEventListener('click', () => {
            this._liked();
        });

        this._buttonRemove.addEventListener('click', () => {
            this._element.remove();
        });

    }

    generateElement() {
        this._element = this._getElement();
        this._buttonRemove = this._element.querySelector('.element__remove');
        this._like = this._element.querySelector('.element__like');
        this._setEventListeners();
        this._element.querySelector('.element__title').textContent = this._title;
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = `Изображение ${this._title}`;
        return this._element;
    }
}


