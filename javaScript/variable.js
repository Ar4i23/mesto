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

const popupAddCard = document.querySelector('#my-modal-create');
const formAddCard = document.querySelector('.modal__form_cread');
const popupEditProfile = document.querySelector('#my-modal-edit');
const formEditProfile = document.querySelector('.modal__form_edit');
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
//объект ключ занчениями для заполнения функций
const validationConfig = {
  formSelector: '.modal__form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__button',
  inactiveButtonClass: 'modal__button_invalid',
  activeButtonClass: 'modal__button',
  inputErrorClass: 'modal__input_error',
};
export {
  initialCards,
  elements,
  buttonOpenAddCardForm,
  buttonOpenEditProfileForm,
  formAddCard,
  formEditProfile,
  popups,
  popupImage,
  srcImgModal,
  headingImg,
  popupAddCard,
  popupEditProfile,
  inputEditName,
  titleElement,
  inputEditAbout,
  subtitleElement,
  inputCreadNaming,
  inputCreadLinking,
  validationConfig,
  newElement,
};
