import Popup from "./Popup.js";

const imageContainer = document.querySelector('.popup__image-container');
const imageTitle = document.querySelector('.popup__image-title');

export default class PopupWithImage extends Popup {
    constructor(title, link, selectorPopup) {
        super(selectorPopup);
        this._title = title;
        this._link = link;
    }

  open(){
    imageContainer.src = this._link;
    imageContainer.alt = `Изображение ${this._title}`;
    imageTitle.textContent = this._title;
    super.open();
  }

}