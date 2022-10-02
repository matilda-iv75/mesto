import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
    constructor({selectorPopup, handleFormSubmit}) {
        super(selectorPopup);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._selectorPopup.querySelector('form');
    }

    setSubmitAction(action) {
        this._handleFormSubmit = action;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
        });
        super.setEventListeners();
    }
}
