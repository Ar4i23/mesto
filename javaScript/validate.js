const validationConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_invalid',
  activeButtonClass: 'modal__button',
  inputErrorClass: 'modal__input_error',
};
const enableValidation = ({ formSelector, ...rest }) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListenersValidation(form, rest);
  });
};

const setEventListenersValidation = (
  formToValidate,
  { inputSelector, submitButtonSelector, ...rest }
) => {
  const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector));
  const formButton = formToValidate.querySelector(submitButtonSelector);
  if (formButton.id === 'cread') {
    disableButton(formButton, rest);
  }
  formInputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, rest);
      if (hasInvalidInput(formInputs)) {
        disableButton(formButton, rest);
      } else {
        enableButton(formButton, rest);
      }
    });
  });
};

const checkInputValidity = (input, rest) => {
  const currentInputErrorContainer = document.querySelector(
    `#${input.id}-error`
  );
  if (input.checkValidity()) {
    currentInputErrorContainer.textContent = '';
    removeRedLine(input, rest);
  } else {
    currentInputErrorContainer.textContent = input.validationMessage;
    addRedLine(input, rest);
  }
};
const addRedLine = (input, { inputErrorClass }) => {
  input.classList.remove('modal__input');
  input.classList.add(inputErrorClass);
};
const removeRedLine = (input, { inputErrorClass }) => {
  input.classList.add('modal__input');
  input.classList.remove(inputErrorClass);
};
const hasInvalidInput = (formInputs) => {
  return formInputs.some((item) => !item.validity.valid);
};
const enableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
  button.classList.remove(inactiveButtonClass);
  button.classList.add(activeButtonClass);
  button.removeAttribute('disabled');
};
const disableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
  button.classList.add(inactiveButtonClass);
  button.classList.remove(activeButtonClass);
  button.setAttribute('disabled', true);
};

// export default enableValidation;
// import enableValidation from '/javaScript/validate.js';

enableValidation(validationConfig);
