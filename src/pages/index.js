import Card from '../components/Сard.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import * as data from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';

const validateEditForm = new FormValidator(
  data.formEditProfile,
  data.validationConfig
);
const validateCreadForm = new FormValidator(
  data.formCreadCard,
  data.validationConfig
);
validateEditForm.enableValidation();
validateCreadForm.enableValidation();

data.buttonOpenEditProfileForm.addEventListener('click', openEditProfilePopup);
data.buttonOpenAddCardForm.addEventListener('click', openAddCardPopup);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const item = {
    name: data.inputCreadNaming.value,
    link: data.inputCreadLinking.value,
  };
  const card = cardSection.renderer(item);
  cardSection.addItem(card);
  popupCread.close();
}

function fillInEditProfileFormInputs() {
  data.inputEditName.value = userInfo.getUserInfo().name;
  data.inputEditAbout.value = userInfo.getUserInfo().about;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const inputs = {
    name: data.inputEditName.value,
    about: data.inputEditAbout.value,
  };
  userInfo.setUserInfo(inputs);
  popupEdit.close();
}

function openEditProfilePopup() {
  popupEdit.open();
  fillInEditProfileFormInputs();
  validateEditForm.resetErrorAndClearInput();
}

function openAddCardPopup() {
  popupCread.open();
  validateCreadForm.resetErrorAndClearInput();
}
const userInfo = new UserInfo({
  titleElement: data.titleElement,
  subtitleElement: data.subtitleElement,
});

const popupEdit = new PopupWithForm('#my-modal-edit', {
  formSubmit: handleProfileFormSubmit,
});

const popupCread = new PopupWithForm('#my-modal-cread', {
  formSubmit: handleCardFormSubmit,
});
const popupImg = new PopupWithImage('#my-modal-image', {
  cardClick: handleCardClick,
});
function handleCardClick(name, link) {
  popupImg.open(name, link);
}

const cardSection = new Section(
  {
    items: data.initialCards,
    renderer: (item) => {
      const cardItem = new Card(item, handleCardClick);
      return cardItem.getCard();
    },
  },
  data.elements
);

cardSection.renderItem();
