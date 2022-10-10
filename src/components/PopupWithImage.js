import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        //this._imageContainer = imageContainer;
        //this._imageTitle = imageTitle;
        this._imageContainer = document.querySelector('.popup__image-container');
        this._imageTitle = document.querySelector('.popup__image-title');
    }

  open(title, link) {
    this._imageContainer.src = link;
    this._imageContainer.alt = `Изображение ${title}`;
    this._imageTitle.textContent = title;
    super.open();
  }
}