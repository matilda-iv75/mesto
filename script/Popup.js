export default class Popup {
    constructor (selectorPopup) {
        this._selectorPopup = selectorPopup;
    }

    _handleEscClose (event) {
        if (event.key === 'Escape') {
            const openedPopup = document.querySelector('.popup_opened');
            this.close();
        }
    }

    open() {
        this._selectorPopup.classList.add('popup_opened');
        document.addEventListener('keydown', (event) => this._handleEscClose(event));
    }

    close() {
        this._selectorPopup.classList.remove('popup_opened');
        //document.removeEventListener('keydown', this._handleEscClose());
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