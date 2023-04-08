//объект ключ занчениями для заполнения функций
const validationConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_invalid',
  activeButtonClass: 'modal__button',
  inputErrorClass: 'modal__input_error',
};
//функция запуска валидации
const enableValidation = ({ formSelector, ...rest }) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    setEventListenersValidation(form, rest);
  });
};
// функция установки слушателя на input ,
// отправкой данных для проверки на валидность,
// и дальнейших действий после получения иформации о валидности
const setEventListenersValidation = (
  formToValidate,
  { inputSelector, submitButtonSelector, ...rest }
) => {
  const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector));
  const formButton = formToValidate.querySelector(submitButtonSelector);
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
// проверка на валидность
const checkInputValidity = (input, rest) => {
  const currentInputErrorContainer = document.querySelector(
    `#${input.id}-error`
  );
  if (input.validity.valid) {
    currentInputErrorContainer.textContent = '';
    removeRedLine(input, rest);
  } else {
    currentInputErrorContainer.textContent = input.validationMessage;
    addRedLine(input, rest);
  }
};
// установка border red
const addRedLine = (input, { inputErrorClass }) => {
  input.classList.add(inputErrorClass);
};
// снятий border red
const removeRedLine = (input, { inputErrorClass }) => {
  input.classList.remove(inputErrorClass);
};
// проврка  на невалидность хоть одного поля ввода
const hasInvalidInput = (formInputs) => {
  return formInputs.some((item) => !item.validity.valid);
};
// установка валидной кнопки
const enableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
  button.classList.remove(inactiveButtonClass);
  button.classList.add(activeButtonClass);
  button.removeAttribute('disabled');
};
// установка не валидной кнопки
const disableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
  button.classList.add(inactiveButtonClass);
  button.classList.remove(activeButtonClass);
  button.setAttribute('disabled', true);
};

// запуск функции валидации
enableValidation(validationConfig);
