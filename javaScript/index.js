const inputEditName = document.querySelector('.modal__input_modal_name');
const inputEditAbout = document.querySelector('.modal__input_modal_about');
const inputCreadNaming = document.querySelector('.modal__input_naming');
const inputCreadLinking = document.querySelector('.modal__input_linking');
const titleElement = document.querySelector('.profile__info-title');
const subtitleElement = document.querySelector('.profile__info-subtitle');
const buttonEdit = document.querySelector('.profile__info-edit-button');
const buttonCreat = document.querySelector('.profile__add-botton');
const buttonCloseCreat = document.querySelector('#close-create');
const buttonCloseEdit = document.querySelector('#close-edit');
const buttonCloseImg = document.querySelector('#close-image');
const newElement = document.querySelector('#new-element').content;
const elements = document.querySelector('.elements');
const elementForm = document.querySelector('.modal__form');
const elementFormCread = document.querySelector('.modal__form_cread');
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

// добавление готовых карточек
initialCards.forEach(renderCard);

// // создание новой карточки с обработчиками клика
function renderItem(item) {
  const htmlElement = newElement.cloneNode(true);
  htmlElement.querySelector('.element__image').src = item.link;
  htmlElement.querySelector('.element__image').alt = item.name;
  htmlElement.querySelector('.element__title').textContent = item.name;
  setEventListeners(htmlElement);
  return htmlElement;
}
function createCard(item) {
  const newCard = newElement.cloneNode(true);
  newCard.querySelector('.element__image').src = item.link;
  newCard.querySelector('.element__image').alt = item.name;
  newCard.querySelector('.element__title').textContent = item.name;
  setEventListeners(newCard);
  return newCard;
}

function renderCard(item) {
  const cardElement = createCard(item);

  elements.prepend(cardElement);
}

function cardFormSubmit(evt) {
  evt.preventDefault();
  const item = { name: inputCreadNaming.value, link: inputCreadLinking.value };
  renderCard(item);
  handelCloseModalCread();
  evt.target.reset();
}

// закрытие попапов
function closeModal(item) {
  item.classList.remove('modal_opened');
}
function handelCloseModalImg(event) {
  const modalImage = document.querySelector('#my-modal-image');
  closeModal(modalImage);
}
function handelCloseModalEdit(event) {
  const modalEdit = document.querySelector('#my-modal-edit');
  closeModal(modalEdit);
}
function handelCloseModalCread(event) {
  const modalCreat = document.querySelector('#my-modal-create');
  closeModal(modalCreat);
}

// открытие попапа
function openModal(item) {
  item.classList.add('modal_opened');
}

function handelOpenModalImg(event) {
  const modalImage = document.querySelector('#my-modal-image');
  openModal(modalImage);
  addImgAndTitle(event);
}
function handelOpenModalEdit(event) {
  const modalEdit = document.querySelector('#my-modal-edit');
  openModal(modalEdit);
  addInfoInput(event);
}
function handelOpenModalCread(event) {
  const modalCreat = document.querySelector('#my-modal-create');
  openModal(modalCreat);
}

// навешивание обработчиков клика на кнопки и картинки
function setEventListeners(htmlElement) {
  htmlElement
    .querySelector('.element__button-delete')
    .addEventListener('click', handelDelete);
  htmlElement
    .querySelector('.element__button-like')
    .addEventListener('click', handelLike);
  htmlElement
    .querySelector('.element__image')
    .addEventListener('click', handelOpenModalImg);
  buttonEdit.addEventListener('click', handelOpenModalEdit);
  buttonCreat.addEventListener('click', handelOpenModalCread);
  elementFormCread.addEventListener('submit', cardFormSubmit);
  buttonCloseCreat.addEventListener('click', handelCloseModalCread);
  buttonCloseEdit.addEventListener('click', handelCloseModalEdit);
  buttonCloseImg.addEventListener('click', handelCloseModalImg);
}
// удаление карточки
function handelDelete(event) {
  const parentNode = event.currentTarget.parentNode;
  parentNode.closest('.element').remove();
}
// генератор лайков
function handelLike(event) {
  event.target.classList.toggle('element__button-like_active');
}
// добавление информации в input  и редактирование профиля
function addInfoInput(event) {
  inputEditName.value = titleElement.textContent;
  inputEditAbout.value = subtitleElement.textContent;

  elementForm.addEventListener('submit', function (event) {
    event.preventDefault();
    titleElement.textContent = inputEditName.value;
    subtitleElement.textContent = inputEditAbout.value;
    handelCloseModalEdit();
  });
}
// добавление картинки и заголовка в модальное окно изображений
function addImgAndTitle(event) {
  const srcImgModal = document.querySelector('.modal__img');
  const headingImg = document.querySelector('.modal__heading');
  srcImgModal.src = event.target.src;
  srcImgModal.alt = event.target.alt;
  headingImg.textContent = event.target.parentNode.textContent;
}
