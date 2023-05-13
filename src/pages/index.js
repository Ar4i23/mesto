import {
  inputEditName,
  inputEditAbout,
  formEditProfile,
  validationConfig,
  formCreadCard,
  titleElement,
  buttonOpenEditProfileForm,
  buttonOpenAddCardForm,
  subtitleElement,
  templateElement,
  elements,
  initialCards,
} from '../utils/constants.js';
import Card from '../components/Сard.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';

let log = console.log;

const validateEditForm = new FormValidator(formEditProfile, validationConfig);
const validateCreadForm = new FormValidator(formCreadCard, validationConfig);
validateEditForm.enableValidation();
validateCreadForm.enableValidation();

buttonOpenEditProfileForm.addEventListener('click', openEditProfilePopup);
buttonOpenAddCardForm.addEventListener('click', openAddCardPopup);

function handleCardFormSubmit(infoAdd) {
  cardSection.renderer(infoAdd);
}

function fillInEditProfileFormInputs(info) {
  inputEditName.value = info.name;
  inputEditAbout.value = info.about;
}

function handleProfileFormSubmit(infoEdit) {
  userInfo.setUserInfo(infoEdit);
}

function openEditProfilePopup() {
  popupEdit.open();
  fillInEditProfileFormInputs(userInfo.getUserInfo());
  validateEditForm.resetErrorAndClearInput();
}

function openAddCardPopup() {
  popupCread.open();
  validateCreadForm.resetErrorAndClearInput();
}
const popupEdit = new PopupWithForm('#my-modal-edit', {
  formSubmit: handleProfileFormSubmit,
});
popupEdit.setEventListeners();
const popupCread = new PopupWithForm('#my-modal-cread', {
  formSubmit: handleCardFormSubmit,
});
popupCread.setEventListeners();
const popupImg = new PopupWithImage('#my-modal-image');
popupImg.setEventListeners();
const userInfo = new UserInfo({
  titleElement: titleElement,
  subtitleElement: subtitleElement,
});

function handleCardClick(name, link) {
  popupImg.open(name, link);
}
const creadCard = (item) => {
  const cardItem = new Card(item, handleCardClick, templateElement);
  return cardItem.getCard();
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = creadCard(item);
      cardSection.addItem(card);
    },
  },

  elements
);
cardSection.renderItem();
