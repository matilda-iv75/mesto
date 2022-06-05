import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {

    constructor({selectorPopup, handleFormSubmit}){
        super(selectorPopup);
        this._handleFormSubmit = handleFormSubmit;
    }

    //  _getInputValues() { }

    setEventListeners() {
        this._selectorPopup.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleFormSubmit();
        });
    }

    close(){
        this._selectorPopup.querySelector('form').reset();
        super.close();
    }
}