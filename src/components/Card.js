export class Card {
  constructor ({ data, handleCardClick, handleBusketClick, handleLikeClick }, selectorTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = data.currentUserId;
    this._owner = data.owner;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._template = selectorTemplate;
    this._handleCardClick = handleCardClick;
    this._handleBusketClick = handleBusketClick;
    this._handleLikeClick = handleLikeClick;
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return Boolean(this._likes.find(item => item._id === this._userId));
  }

  _toggleLike() {
    this._like.classList.toggle('element__like_active', this.isLiked());
  }

  setLikesInfo(data) {
    this._likes = data.likes;
    this._toggleLike();
    this._element.querySelector('.element__like-counter').textContent = this._likeCounter;
  }

  _getElement() {
    const newItem = document.querySelector(this._template).content.querySelector('.card').cloneNode(true);
    return newItem;
}

  _setEventListeners() {
      this._cardImage.addEventListener('click', () => {
          this._handleCardClick(this._name, this._link);
      });
      this._like.addEventListener('click', () => {
        this._toggleLike();
        this._handleLikeClick(this._element);
      });

      this._buttonRemove.addEventListener('click', () => {
        this._handleBusketClick();
      });
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setRemoveIcon() {
    if (this._owner._id != this._userId) {
      this._element.querySelector('.element__remove').classList.add('element__remove_hidden');
    }
  }

  generateElement() {
      this._element = this._getElement();
      this._buttonRemove = this._element.querySelector('.element__remove');
      this._setRemoveIcon();
      this._like = this._element.querySelector('.element__like');
      this._element.querySelector('.element__like-counter').textContent = this._likes.length;
      this._likeCounter = +(this._element.querySelector('.element__like-counter').textContent);
      this._cardImage = this._element.querySelector('.element__image');
      this._setEventListeners();
      this._element.querySelector('.element__title').textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = `Изображение ${this._name}`;
      return this._element;
  }

}


