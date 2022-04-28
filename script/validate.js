function showInputError (formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_visible');
};

function hideInputError (formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
};

function checkInputValidity (formElement, inputElement) {
     if (!inputElement.validity.valid) {
       showInputError(formElement, inputElement, inputElement.validationMessage);
     } else {
       hideInputError(formElement, inputElement);
    }
};

function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

function toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button_disabled');
    } else {
      buttonElement.classList.remove('popup__button_disabled');
    }
}

function setEventListeners (formElement, {inputSelector}) {
    const buttonElement = formElement.querySelector('.popup__button');
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
       });
    });
};

function enableValidation ({formSelector, ...rest}) {
   const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((form) => {
      form.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
        setEventListeners(form, rest);
    });
  };

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });


