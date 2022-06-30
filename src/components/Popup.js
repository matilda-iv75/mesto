export default class Popup {
    constructor (selectorPopup) {
        this._selectorPopup = document.querySelector(selectorPopup);
        //this._selectorPopup = selectorPopup;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose (event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    open() {
        this._selectorPopup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._selectorPopup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose());
    }

    setEventListeners() {
        this._selectorPopup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
            if (evt.target.classList.contains('popup__close-icon')) {
                this.close();
            }
        });
    }

}