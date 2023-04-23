import * as data from './variable.js';
import { Card, CardItem } from './card.js';
import { FormValidator } from './validate.js';

// // навешивание обработчиков клика на кнопки
data.buttonOpenEditProfileForm.addEventListener('click', openEditProfilePopup);
data.buttonOpenAddCardForm.addEventListener('click', openAddCardPopup);
data.formAddCard.addEventListener('submit', cardFormSubmit);
data.formEditProfile.addEventListener('submit', preservationOfTheInputData);

function cardFormSubmit(evt) {
  evt.preventDefault();
  const item = {
    name: data.inputCreadNaming.value,
    link: data.inputCreadLinking.value,
  };
  const listCard = new Card(data.elements);
  const cardItem = new CardItem(item);
  const card = cardItem._getCard();
  listCard.addCard(card);
  // renderCard(item);
  const modal = evt.target.closest('.modal');
  closeModal(modal);
  evt.target.reset();
}
// // добавление информации в input  при открытии модального окна
function fillInEditProfileFormInputs(evt) {
  data.inputEditName.value = data.titleElement.textContent;
  data.inputEditAbout.value = data.subtitleElement.textContent;
}
// // сохранение изменений profile__info и закрытие модального окна
function preservationOfTheInputData(evt) {
  evt.preventDefault();
  data.titleElement.textContent = data.inputEditName.value;
  data.subtitleElement.textContent = data.inputEditAbout.value;
  const modal = evt.target.closest('.modal');
  closeModal(modal);
}
// // открытие модальных окон
function openModal(item) {
  item.classList.add('modal_opened');
  document.addEventListener('keydown', closePopupEsc);
}

// // получение ссылки кнопки открытия модального окна EditProfile,
// // запуск функции открытия с ссылкой на модальное окно EditProfile,
// // и запуск функции добавления данных в inputs
function openEditProfilePopup(evt) {
  openModal(data.popupEditProfile);
  resetErrorAndClearInput(data.validationConfig);
  fillInEditProfileFormInputs(evt);
}
// // получение ссылки кнопки открытия модального окна AddCard,
// // запуск функции открытия с ссылкой на модальное окно AddCard
function openAddCardPopup(evt) {
  openModal(data.popupAddCard);
  resetErrorAndClearInput(data.validationConfig);
}

// //проверка попапов на наличие класса открытия попапа и кнопок закрытия
data.popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('modal_opened')) {
      closeModal(popup);
    }
    if (evt.target.classList.contains('modal__close')) {
      closeModal(popup);
    }
  });
});

// закрытие модальных окон
function closeModal(item) {
  item.classList.remove('modal_opened');
  document.removeEventListener('keydown', closePopupEsc);
}
// закрытие попапа кнопкой Escape
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.modal_opened');
    closeModal(popup);
  }
}

// очистка ошибок, очистка полей ввода и устанавка не рабочей кнопки
const resetErrorAndClearInput = ({
  formSelector,
  inputSelector,
  inputErrorClass,
  submitButtonSelector,
  inactiveButtonClass,
}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    const formInputs = Array.from(form.querySelectorAll(inputSelector));
    formInputs.forEach((input) => {
      const errorContainer = document.querySelector(`#${input.id}-error`);
      errorContainer.textContent = '';
      input.classList.remove(inputErrorClass);
      input.value = '';
    });
    const buttonsForm = form.querySelector(submitButtonSelector);
    buttonsForm.classList.add(inactiveButtonClass);
    buttonsForm.setAttribute('disabled', true);
  });
};
