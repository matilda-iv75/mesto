import Popup from "./Popup.js";
import {imageContainer, imageTitle} from "./Constants.js";
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