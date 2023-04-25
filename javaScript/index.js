import { Section, Card } from './Card.js';
import * as data from './variable.js';
import { validateEditForm, validateCreadForm } from './FormValidator.js';
validateEditForm.enableValidation();
validateCreadForm.enableValidation();
// // навешивание обработчиков клика на кнопки
data.buttonOpenEditProfileForm.addEventListener('click', openEditProfilePopup);
data.buttonOpenAddCardForm.addEventListener('click', openAddCardPopup);
data.formCreadCard.addEventListener('submit', handleCardFormSubmit);
data.formEditProfile.addEventListener('submit', handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const item = {
    name: data.inputCreadNaming.value,
    link: data.inputCreadLinking.value,
  };
  const modal = evt.target.closest('.modal');
  createCard(item);
  closeModal(modal);
  evt.target.reset();
}
// // добавление информации в input  при открытии модального окна
function fillInEditProfileFormInputs() {
  data.inputEditName.value = data.titleElement.textContent;
  data.inputEditAbout.value = data.subtitleElement.textContent;
}
// // сохранение изменений profile__info и закрытие модального окна
function handleProfileFormSubmit(evt) {
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
function openEditProfilePopup() {
  openModal(data.popupEditProfile);
  validateEditForm._resetErrorAndClearInput();
  fillInEditProfileFormInputs();
}
// // получение ссылки кнопки открытия модального окна AddCard,
// // запуск функции открытия с ссылкой на модальное окно AddCard
function openAddCardPopup() {
  openModal(data.popupCreadCard);
  validateCreadForm._resetErrorAndClearInput();
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
  console.log(evt);
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.modal_opened');
    closeModal(popup);
  }
}
function handleCardClick(name, link) {
  data.srcImgModal.src = link;
  data.srcImgModal.alt = name;
  data.headingImg.textContent = name;
  openModal(data.popupImage);
}

const listCard = new Section(data.elements);
function createCard(item) {
  const cardItem = new Card(item, handleCardClick);
  return cardItem.getCard();
}
// проход по массиву объектов и передача его элементов в параметр   ;
// для создания новой карточки
data.initialCards.forEach((item) => {
  const card = createCard(item);
  listCard.addCard(card);
});
