import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(selectorPopup, imageContainer, imageTitle) {
        super(selectorPopup);
        this._imageContainer = imageContainer;
        this._imageTitle = imageTitle;

    }

  open(title, link) {
    console.log('imageopen', title, link)
    this._title = title;
    this._link = link;
    this._imageContainer.src = this._link;
    this._imageContainer.alt = `Изображение ${this._title}`;
    this._imageTitle.textContent = this._title;
    super.open();
  }

}