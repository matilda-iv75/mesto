import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {

    constructor({selectorPopup, handleFormSubmit}){
        super(selectorPopup);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = Array.from(this._selectorPopup.querySelectorAll('Input'));
        this._inputValues = {};
        this._inputList.forEach((input) => {
            this._inputValues[input.id] = input.value;
        });
        //console.log(this._inputValues);
        const inputs = this._inputValues;
        console.log(inputs);
        return inputs;
    }

    setEventListeners() {
        this._selectorPopup.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleFormSubmit(this._getInputValues());
        });
    }

    close(){
        this._selectorPopup.querySelector('form').reset();
        super.close();
    }
}