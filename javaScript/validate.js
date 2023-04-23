import { validationConfig } from './variable.js';
// class FormValidator в котором происходит валидация форм
export class FormValidator {
  constructor({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inputErrorClass,
    activeButtonClass,
    inactiveButtonClass,
  }) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inputErrorClass = inputErrorClass;
    this._activeButtonClass = activeButtonClass;
    this._inactiveButtonClass = inactiveButtonClass;
  }
  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this._formSelector));
    forms.forEach((form) => {
      this._setEventListenersValidation(form);
    });
  }
  _setEventListenersValidation(form) {
    const formInputs = Array.from(form.querySelectorAll(this._inputSelector));
    const formButton = form.querySelector(this._submitButtonSelector);
    formInputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        if (this._hasInvalidInput(formInputs)) {
          this._disableButton(formButton);
        } else {
          this._enableButton(formButton);
        }
      });
    });
  }
  _checkInputValidity(input) {
    const currentInputErrorContainer = document.querySelector(
      `#${input.id}-error`
    );

    if (input.validity.valid) {
      currentInputErrorContainer.textContent = '';
      this._removeRedLine(input);
    } else {
      currentInputErrorContainer.textContent = input.validationMessage;
      this._addRedLine(input);
    }
  }
  _hasInvalidInput(formInputs) {
    return formInputs.some((item) => !item.validity.valid);
  }
  _disableButton(button) {
    button.classList.add(this._inactiveButtonClass);
    button.setAttribute('disabled', true);
  }
  _enableButton(button) {
    button.classList.remove(this._inactiveButtonClass);
    button.removeAttribute('disabled');
  }
  _removeRedLine(input) {
    input.classList.remove(this._inputErrorClass);
  }
  _addRedLine(input) {
    input.classList.add(this._inputErrorClass);
  }
}
const validate = new FormValidator(validationConfig);
validate.enableValidation();
