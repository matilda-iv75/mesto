export class FormValidator {
  constructor (data, formElement) {
      this._formElement = formElement;
      this._formSelector = data.formSelector;
      this._inputSelector = data.inputSelector;
      this._submitButtonSelector = data.submitButtonSelector;
      this._inactiveButtonClass = data.inactiveButtonClass;
      this._inputErrorClass = data.inputErrorClass;
      this._errorClass = data.errorClass;
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError (inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorMessage = inputElement.validationMessage;
    this._errorElement.textContent = this._errorMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  _hideInputError (inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  };

  _checkInputValidity (inputElement){
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
      } else {
        this._hideInputError(inputElement);
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
        this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
         });
      });
    };

  resetValidation () {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement)
      });
    }

  enableValidation () {
      this._setEventListeners();
  }

}

