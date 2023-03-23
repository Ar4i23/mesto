const nameInputElement = document.querySelector('.modal__input_modal_name');
const aboutInputElement = document.querySelector('.modal__input_modal_about');
const titleElement = document.querySelector('.profile__info-title');
const subtitleElement = document.querySelector('.profile__info-subtitle');
const buttonEdit = document.querySelector('.profile__info-edit-button');
const buttonCreat = document.querySelector('.profile__add-botton');
const closeModalEdit = document.querySelector('#close-modal-edit');
const closeModalCreate = document.querySelector('#close-modal-create');
const closeModalImage = document.querySelector('#close-modal-image');
const templateElements = document.querySelector('#elements').content;
const newElement = document.querySelector('#new-element').content;
const elements = document.querySelector('.elements');
const elementForm = document.querySelector('.modal__form');
const htmlElement = templateElements.cloneNode(true);
const buttonsLike = htmlElement.querySelectorAll('.element__button-like');
const elementsImg = htmlElement.querySelectorAll('.element__image');
const ButtonsDelete = htmlElement.querySelectorAll('.element__button-delete');
const elementFormId = document.querySelector('#modal-form-creat');
const openModalImage = document.querySelector('#my-modal-image');
const modalImage = document.querySelector('.modal__img');
const modalHeading = document.querySelector('.modal__heading');
elements.append(htmlElement);

buttonEdit.onclick = openModalEdit;
buttonCreat.onclick = openModalCreate;
closeModalEdit.onclick = closeModal;
closeModalCreate.onclick = closeModal;
closeModalImage.onclick = closeModal;

function openModalEdit() {
  document.querySelector('#my-modal-edit').classList.add('modal_opened');
  nameInputElement.value = titleElement.textContent;
  aboutInputElement.value = subtitleElement.textContent;
}

function openModalCreate() {
  document.querySelector('#my-modal-create').classList.add('modal_opened');
}

function closeModal() {
  document.querySelector('#my-modal-edit').classList.remove('modal_opened');
  document.querySelector('#my-modal-create').classList.remove('modal_opened');
  document
    .querySelector('#my-modal-image')
    .classList.remove('modal_opened-img');
}

elementForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const inputName = nameInputElement.value;
  titleElement.textContent = inputName;
  const inputAbout = aboutInputElement.value;
  subtitleElement.textContent = inputAbout;
  closeModal();
});

elementsImg.forEach(function (img) {
  img.addEventListener('click', function (evt) {
    const eventTargetSrc = evt.target.src;
    openModalImage.classList.add('modal_opened-img');
    modalImage.src = eventTargetSrc;
    modalHeading.textContent = img.parentElement.textContent;
  });
});

buttonsLike.forEach(function (button) {
  button.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__button-like_active');
  });
});

ButtonsDelete.forEach(function (button) {
  button.addEventListener('click', function (evt) {
    const eventTarget = evt.currentTarget;
    eventTarget.closest('.element').remove();
  });
});

elementFormId.addEventListener('submit', function (event) {
  event.preventDefault();
  const namingInputElementCreat = document.querySelector(
    '.modal__input_modal_naming'
  );
  const linkingInputElementCreat = document.querySelector(
    '.modal__input_modal_linking'
  );

  const element = newElement.cloneNode(true);
  const btnLike = element.querySelector('.element__button-like');
  btnLike.addEventListener('click', handelLike);
  function handelLike() {
    btnLike.classList.toggle('element__button-like_active');
  }
  const btnDelete = element.querySelector('.element__button-delete');
  btnDelete.addEventListener('click', handelDelete);
  function handelDelete() {
    btnDelete.closest('.element').remove();
  }

  const elImg = element.querySelector('.element__image');
  elImg.addEventListener('click', handelOpenModal);
  function handelOpenModal(event) {
    openModalImage.classList.add('modal_opened-img');
    modalImage.src = event.target.src;
    modalHeading.textContent = event.target.alt;
  }
  element.querySelector('.element__title').textContent =
    namingInputElementCreat.value;
  element.querySelector('.element__image').src = linkingInputElementCreat.value;
  element.querySelector('.element__image').alt = namingInputElementCreat.value;
  elements.prepend(element);

  linkingInputElementCreat.value = '';
  namingInputElementCreat.value = '';
  closeModal();
});
