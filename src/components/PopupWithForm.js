import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {

    constructor({selectorPopup, handleFormSubmit}){
        super(selectorPopup);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = Array.from(this._selectorPopup.querySelectorAll('Input'));
        this._form = this._selectorPopup.querySelector('form');
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.id] = input.value;
        });
        
        return this._inputValues;
    }

    setEventListeners() {
          this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleFormSubmit(this._getInputValues());
        });
        super.setEventListeners();
    }

    close() {
        this._form.reset();
        super.close();
    }

    open(){
    super.open();
    }
}