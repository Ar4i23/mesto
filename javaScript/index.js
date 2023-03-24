const inputEditName = document.querySelector('.modal__input_modal_name');
const inputEditAbout = document.querySelector('.modal__input_modal_about');
const inputCreadNaming = document.querySelector('.modal__input_naming');
const inputCreadLinking = document.querySelector('.modal__input_linking');
const titleElement = document.querySelector('.profile__info-title');
const subtitleElement = document.querySelector('.profile__info-subtitle');
const buttonEdit = document.querySelector('.profile__info-edit-button');
const buttonCreat = document.querySelector('.profile__add-botton');
const buttonClose = document.querySelectorAll('.modal__close');
const modalCreat = document.querySelector('#my-modal-create');
const modalEdit = document.querySelector('#my-modal-edit');
const modalImage = document.querySelector('#my-modal-image');
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
initialCards.forEach(renderItem);

function renderItem(item) {
  const htmlElement = newElement.cloneNode(true);
  const elementImg = htmlElement.querySelector('.element__image');
  const elementTitle = htmlElement.querySelector('.element__title');
  elementImg.src = item.link;
  elementImg.alt = item.name;
  elementTitle.textContent = item.name;
  setEventListeners(htmlElement);

  elements.append(htmlElement);
}

// генерация кнопок close  и навешивание обработчика клика
buttonClose.forEach(handelCloseButton);

function handelCloseButton(item) {
  item.addEventListener('click', handelCloseModal);
}
// закрытие попапов
function handelCloseModal(event) {
  if (
    event.target.id === 'modal__close_edit' ||
    event.currentTarget.parentNode.children[0].id === 'modal__close_edit'
  ) {
    modalEdit.classList.remove('modal_opened');
  }
  if (
    event.target.id === 'close-modal-create' ||
    event.target.parentNode.children[0].id === 'close-modal-create'
  ) {
    modalCreat.classList.remove('modal_opened');
  }
  if (event.target.id === 'close-modal-image') {
    modalImage.classList.remove('modal_opened');
  }
}
// открытие попапа
function handelOpenModal(event) {
  if (event.target.className === 'profile__info-edit-button') {
    modalEdit.classList.add('modal_opened');
    addInfoInput();
  }
  if (event.target.className === 'profile__add-botton') {
    modalCreat.classList.add('modal_opened');
    inputCreadNaming.value = '';
    inputCreadLinking.value = '';
    createCard();
  }
  if (event.target.className === 'element__image') {
    modalImage.classList.add('modal_opened');
    addImgAndTitle(event);
  }
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
    .addEventListener('click', handelOpenModal);
  buttonEdit.addEventListener('click', handelOpenModal);
  buttonCreat.addEventListener('click', handelOpenModal);
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
    handelCloseModal(event);
  });
}
// добавление картинки и заголовка в модальное окно изображений
function addImgAndTitle(event) {
  const srcImg = modalImage.querySelector('.modal__img');
  const headingImg = modalImage.querySelector('.modal__heading');
  srcImg.src = event.target.src;
  srcImg.alt = event.target.alt;
  headingImg.textContent = event.target.parentNode.textContent;
}
// создание новой карточки с обработчиками клика
function createCard(event) {
  elementFormCread.addEventListener('submit', function (event) {
    event.preventDefault();

    const htmlElement = newElement.cloneNode(true);
    const elementImg = htmlElement.querySelector('.element__image');
    const elementTitle = htmlElement.querySelector('.element__title');
    elementTitle.textContent = inputCreadNaming.value;
    elementImg.src = inputCreadLinking.value;

    setEventListeners(htmlElement);
    elements.prepend(htmlElement);
    handelCloseModal(event);
  });
}
