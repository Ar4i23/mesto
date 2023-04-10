// inputs модального окна редактирования
const inputEditName = document.querySelector('.modal__input_modal_name');
const inputEditAbout = document.querySelector('.modal__input_modal_about');
// inputs модального окна добавления новых карточек
const inputCreadNaming = document.querySelector('.modal__input_naming');
const inputCreadLinking = document.querySelector('.modal__input_linking');
// заголовок и подзаголовок profile__info
const titleElement = document.querySelector('.profile__info-title');
const subtitleElement = document.querySelector('.profile__info-subtitle');
// кнопка открывания модального окна редактирования
const buttonOpenEditProfileForm = document.querySelector(
  '.profile__info-edit-button'
);
// кнопка открывания модального окна добавления новых карточек
const buttonOpenAddCardForm = document.querySelector('.profile__add-botton');
// кнопки закрытия модальных окон и сами окна и их элементы
const buttonCloseAddCardForm = document.querySelector('#close-create');
const popupAddCard = document.querySelector('#my-modal-create');
const formAddCard = document.querySelector('.modal__form_cread');
const buttonCloseEditProfileForm = document.querySelector('#close-edit');
const popupEditProfile = document.querySelector('#my-modal-edit');
const formEditProfile = document.querySelector('.modal__form_edit');
const buttonCloseImg = document.querySelector('#close-image');
const popupImage = document.querySelector('#my-modal-image');
const srcImgModal = document.querySelector('.modal__img');
const headingImg = document.querySelector('.modal__heading');
// template карточка
const newElement = document.querySelector('#new-element').content;
// блок elements куда добавляются готовые карточки
const elements = document.querySelector('.elements');
//все попапы
const popups = document.querySelectorAll('.modal');

// массив с названием и ссылкой
const initialCards = [
  {
    name: 'New York',
    link: 'https://rare-gallery.com/uploads/posts/934209-New-York-City-street-Times-Square.jpg',
  },
  {
    name: 'Эстония',
    link: 'https://tourism.interfax.ru/images/cms-image-000004067.jpg',
  },
  {
    name: 'Озеро Рица',
    link: 'https://vsegda-pomnim.com/uploads/posts/2022-03/1648751353_47-vsegda-pomnim-com-p-ozero-malaya-ritsa-abkhaziya-foto-48.jpg',
  },
  {
    name: 'Азорские Острова',
    link: 'https://vsegda-pomnim.com/uploads/posts/2022-03/1648627737_10-vsegda-pomnim-com-p-azorskie-ostrova-foto-12.jpg',
  },
  {
    name: 'Голландия ',
    link: 'https://img5.goodfon.ru/original/3000x2000/f/c5/amsterdam-vecher-ogni-kanal-gollandiia-niderlandy.jpg',
  },
  {
    name: 'Исландия',
    link: 'https://avatars.dzeninfra.ru/get-zen_doc/108872/pub_5ae10528bce67e5462ec162a_5ae1b64248c85ece27e55758/scale_1200',
  },
];
// навешивание обработчиков клика на кнопки
buttonOpenEditProfileForm.addEventListener('click', openEditProfilePopup);
buttonOpenAddCardForm.addEventListener('click', openAddCardPopup);
formAddCard.addEventListener('submit', cardFormSubmit);
formEditProfile.addEventListener('submit', preservationOfTheInputData);
// передача всех данных массива initialCards циклом forEach в функцию renderCard
initialCards.forEach(renderCard);

// создание  карточек с обработчиками клика
function createCard(item) {
  const htmlElement = newElement.cloneNode(true);
  const itemImg = htmlElement.querySelector('.element__image');
  itemImg.src = item.link;
  itemImg.alt = item.name;
  htmlElement.querySelector('.element__title').textContent = item.name;
  setEventListeners(htmlElement);
  return htmlElement;
}
// добавление готовых карточек в блок elements
function renderCard(item) {
  const cardElement = createCard(item);
  elements.prepend(cardElement);
}
// запись названия и ссылки ,отправка на добавление , закрытие попапа и очистка полей input
function cardFormSubmit(evt) {
  evt.preventDefault();
  const item = { name: inputCreadNaming.value, link: inputCreadLinking.value };
  renderCard(item);
  const modal = evt.target.closest('.modal');
  closeModal(modal);
  evt.target.reset();
}
// добавление информации в input  при открытии модального окна
function fillInEditProfileFormInputs(evt) {
  inputEditName.value = titleElement.textContent;
  inputEditAbout.value = subtitleElement.textContent;
}
// сохранение изменений profile__info и закрытие модального окна
function preservationOfTheInputData(evt) {
  evt.preventDefault();
  titleElement.textContent = inputEditName.value;
  subtitleElement.textContent = inputEditAbout.value;
  const modal = evt.target.closest('.modal');
  closeModal(modal);
}
// открытие модальных окон
function openModal(item) {
  item.classList.add('modal_opened');
  document.addEventListener('keydown', closePopupEsc);
}
// получение ссылки кнопки открытия модального окна Image,
// запуск функции открытия с ссылкой на модальное окно Image
// и запуск функции добавления ссылки на изображение и его название
function openImagePopup(evt) {
  openModal(popupImage);
  fillInImagePopup(evt);
}
// получение ссылки кнопки открытия модального окна EditProfile,
// запуск функции открытия с ссылкой на модальное окно EditProfile,
// и запуск функции добавления данных в inputs
function openEditProfilePopup(evt) {
  openModal(popupEditProfile);
  resetErrorInput(validationConfig);
  fillInEditProfileFormInputs(evt);
}
// получение ссылки кнопки открытия модального окна AddCard,
// запуск функции открытия с ссылкой на модальное окно AddCard
function openAddCardPopup(evt) {
  openModal(popupAddCard);
  resetErrorInput(validationConfig);
}

//проверка попапов на наличие класса открытия попапа и кнопок закрытия
popups.forEach((popup) => {
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
  item.removeEventListener('mousedown', closeModal);
}
// закрытие попапа кнопкой Escape
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.modal_opened');
    closeModal(popup);
  }
}

// навешивание обработчиков клика на кнопки и картинки готовой карточки
function setEventListeners(htmlElement) {
  htmlElement
    .querySelector('.element__button-delete')
    .addEventListener('click', deleteCard);
  htmlElement
    .querySelector('.element__button-like')
    .addEventListener('click', toggleLike);
  htmlElement
    .querySelector('.element__image')
    .addEventListener('click', openImagePopup);
}
// удаление карточки
function deleteCard(evt) {
  const card = evt.target.closest('.element');
  card.remove();
}
// генератор лайков
function toggleLike(evt) {
  evt.target.classList.toggle('element__button-like_active');
}

// добавление картинки и заголовка в модальное окно изображений
function fillInImagePopup(evt) {
  srcImgModal.src = evt.target.src;
  srcImgModal.alt = evt.target.alt;
  headingImg.textContent = evt.target.parentNode.textContent;
}

// очистка ошибок и устанавка не рабочей кнопки
const resetErrorInput = ({
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
