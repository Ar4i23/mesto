// class FormValidator в котором происходит валидация форм
class FormValidator {
  constructor(
    form,
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      activeButtonClass,
      inputErrorClass,
    }
  ) {
    this._form = form;
    this._inputs = Array.from(this._form.querySelectorAll(inputSelector));
    this._button = this._form.querySelector(submitButtonSelector);
    this._inputErrorClass = inputErrorClass;
    this._inactiveButton = inactiveButtonClass;
    this._activeButton = activeButtonClass;
  }

  enableValidation() {
    this._setEventListenersValidation();
  }
  _setEventListenersValidation() {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        if (this._hasInvalidInput()) {
          this._disableButton();
        } else {
          this._enableButton();
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
  _hasInvalidInput() {
    return this._inputs.some((item) => !item.validity.valid);
  }
  _disableButton() {
    this._button.classList.add(this._inactiveButton);
    this._button.setAttribute('disabled', true);
  }
  _enableButton() {
    this._button.classList.remove(this._inactiveButton);
    this._button.removeAttribute('disabled');
  }
  _removeRedLine(input) {
    input.classList.remove(this._inputErrorClass);
  }
  _addRedLine(input) {
    input.classList.add(this._inputErrorClass);
  }
  resetErrorAndClearInput() {
    this._inputs.forEach((input) => {
      const errorContainer = document.querySelector(`#${input.id}-error`);
      errorContainer.textContent = '';
      input.classList.remove(this._inputErrorClass);
    });
    this._disableButton();
  }
}

export default FormValidator;
