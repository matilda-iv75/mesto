import Popup from "./Popup.js";
import {imageContainer, imageTitle} from "./Constants.js";
export default class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
    }

  open(title, link) {
    this._title = title;
    this._link = link;
    imageContainer.src = this._link;
    imageContainer.alt = `Изображение ${this._title}`;
    imageTitle.textContent = this._title;
    super.open();
  }

}