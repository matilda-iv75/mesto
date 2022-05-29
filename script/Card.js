import handleCardClick from "./index.js";
export class Card {
    constructor (data, template) {
      this._title = data.name;
      this._link = data.link;
      this._template = template;
      this._handleCardClick = handleCardClick;
  }

  _getElement() {
      const newItem = this._template.content.querySelector('.card').cloneNode(true);
      return newItem;
  }

  _toggleLike() {
      this._like.classList.toggle('element__like_active');
  }

  _setEventListeners() {

    this._cardImage.addEventListener('click', () => {
          this._handleCardClick(this._title, this._link);
      });

      this._like.addEventListener('click', () => {
          this._toggleLike();
      });

      this._buttonRemove.addEventListener('click', () => {
          this._element.remove();
      });

  }

  generateElement() {
      this._element = this._getElement();
      this._buttonRemove = this._element.querySelector('.element__remove');
      this._like = this._element.querySelector('.element__like');
      this._cardImage = this._element.querySelector('.element__image');
      this._setEventListeners();
      this._element.querySelector('.element__title').textContent = this._title;
      this._cardImage.src = this._link;
      this._cardImage.alt = `Изображение ${this._title}`;
      return this._element;
  }

}


