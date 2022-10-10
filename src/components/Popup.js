export default class Popup {
    constructor (selectorPopup) {
        this._elementPopup = document.querySelector(selectorPopup);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose (event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    open() {
        this._elementPopup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._elementPopup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._elementPopup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
            if (evt.target.classList.contains('popup__close-icon')) {
                this.close();
            }
        });
    }

}