const validationConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_invalid',
  inputErrorClass: 'modal__input_type_error',
  activeButtonClass: 'modal__button',
};
const enableValidation = ({ formSelector, ...rest }) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefaut();
    });
    setEventListenersValid(form, rest);
  });
};

const setEventListenersValid = (
  form,
  { inputSelector, submitButtonSelector, ...rest }
) => {
  const formInputs = Array.from(form.querySelectorAll(inputSelector));
  const formButtom = form.querySelector(submitButtonSelector);
  if (formButtom.classList[1] === 'modal__button-cread') {
    disableButton(formButtom, rest);
  }

  formInputs.forEach((input) => {
    input.addEventListener('input', () => {});
    checkInputValidity(input, rest);
    if (hasInvalidInput(formInputs)) {
      disableButton(formButtom, rest);
    } else {
      enableButton(formButtom, rest);
    }
  });
};

const checkInputValidity = (input, { errorClass, ...rest }) => {
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
  input.classList.add(inputErrorClass);
};
const removeRedLine = (input, { inputErrorClass }) => {
  // console.log(input);
  input.classList.remove(inputErrorClass);
};

const hasInvalidInput = (formInputs) => {
  return formInputs.some((item) => !item.checkValidity());
};

const enableButton = (buttom, { inactiveButtonClass, activeButtonClass }) => {
  buttom.classList.add(activeButtonClass);
  buttom.classList.remove(inactiveButtonClass);
  buttom.removeAttribute('disabled');
};

const disableButton = (buttom, { inactiveButtonClass, activeButtonClass }) => {
  buttom.classList.remove(activeButtonClass);
  buttom.classList.add(inactiveButtonClass);
  buttom.setAttribute('disabled', true);
};

enableValidation(validationConfig);
