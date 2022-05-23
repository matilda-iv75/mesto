// const config = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   }
export class FormValidator {
    constructor (data, formElement) {
        this._formElement = formElement;
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
    }

    _showInputError () {
      this._errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
      this._inputElement.classList.add(this._inputErrorClass);
      this._errorMessage = this._inputElement.validationMessage;
      this._errorElement.textContent = this._errorMessage;
      this._errorElement.classList.add(this._errorClass);
    };

    _hideInputError () {
      this._errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
      this._inputElement.classList.remove(this._inputErrorClass);
      this._errorElement.classList.remove(this._errorClass);
      this._errorElement.textContent = '';
    };

    _checkInputValidity () {
        if (!this._inputElement.validity.valid) {
          this._showInputError();
        } else {
          this._hideInputError();
       }
     };

    _hasInvalidInput () {
        return this._inputList.some((inputElement) => {
         return !inputElement.validity.valid;
        });
      }

     _toggleButtonState () {
        if (this._hasInvalidInput(this._inputList)) {
          this._buttonElement.classList.add(this._inactiveButtonClass);
          this._buttonElement.disabled = true;
        } else {
          this._buttonElement.classList.remove(this._inactiveButtonClass);
          this._buttonElement.disabled = false;
        }
      }

     _setEventListeners () {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        this._inputList.forEach((inputElement) => {
          this._inputElement = inputElement;
          this._inputElement.addEventListener('input', () => {
            this._checkInputValidity();
            this._toggleButtonState();
           });
        });
      };

    enableValidation () {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        });
        this._setEventListeners();
    }

}

// const formList = Array.from(document.querySelectorAll(config.formSelector));

// formList.forEach((form) => {
//   const formValidate = new FormValidator(config, form);
//   formValidate.enableValidation();
// });
