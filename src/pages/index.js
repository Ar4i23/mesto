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
  formAvatar,
  avatarProfilBg,
} from '../utils/constants.js';
import Api from '../components/Api.js';
import Card from '../components/Сard.js';
import Section from '../components/Section.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';

// заготовка для создания методов класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'e674a970-710a-435e-8ca6-95eeadb2851d',
    'Content-Type': 'application/json',
  },
});

// создание экземпляров валадации форм
const validateEditForm = new FormValidator(formEditProfile, validationConfig);
const validateCreadForm = new FormValidator(formCreadCard, validationConfig);
const validateAvatarForm = new FormValidator(formAvatar, validationConfig);
// валидация форм
validateAvatarForm.enableValidation();
validateEditForm.enableValidation();
validateCreadForm.enableValidation();
// установка обработчиков  на section Profile  для открытия их попапов
avatarProfilBg.addEventListener('click', openAvatarPopup);
buttonOpenEditProfileForm.addEventListener('click', openEditProfilePopup);
buttonOpenAddCardForm.addEventListener('click', openAddCardPopup);

// создание popup'ов
const popupCreate = new PopupWithForm('#my-modal-cread', {
  formSubmit: handleSubmitFormCard,
});
const popupImg = new PopupWithImage('#my-modal-image');
const popupEdit = new PopupWithForm('#my-modal-edit', {
  formSubmit: handleSubmitFormProfile,
});
const popupAvatar = new PopupWithForm('#my-modal-avatar', {
  formSubmit: hendleSubmitFormAvatar,
});
const popupDelete = new PopupWithConfirmation('#my-modal-delete', {
  hendleDelete: deleteCard,
});
const userInfo = new UserInfo(titleElement, subtitleElement, avatarProfilBg);
// запуск обработчиков событий
popupEdit.setEventListeners();
popupCreate.setEventListeners();
popupImg.setEventListeners();
popupAvatar.setEventListeners();
popupDelete.setEventListeners();
// открытие popup'ов
function openAddCardPopup() {
  popupCreate.open();
  validateCreadForm.resetErrorAndClearInput();
}

function openEditProfilePopup() {
  popupEdit.open();
  fillInEditProfileFormInputs(userInfo.getUserInfo());
  validateEditForm.resetErrorAndClearInput();
}

function openAvatarPopup() {
  popupAvatar.open();
  validateAvatarForm.resetErrorAndClearInput();
}
// обработчики submit form
function handleSubmitFormCard(infoAdd) {
  api
    .addCardByServer(infoAdd)
    .then((dataCard) => {
      dataCard.myId = dataCard.owner._id;
      cardSection.renderItem(dataCard);
      popupCreate.close();
    })
    .catch((err) => console.error(`Ошибка при создании новой карточки: ${err}`))
    .finally(() => popupCreate.setupDefaultText());
}

function handleSubmitFormProfile(infoEdit) {
  api
    .setUserInfo(infoEdit)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEdit.close();
    })
    .catch((err) => console.error(`Ошибка при редактировании профиля: ${err}`))
    .finally(() => popupEdit.setupDefaultText());
}

function hendleSubmitFormAvatar(info) {
  api
    .setUserAvatar(info)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupAvatar.close();
    })
    .catch((err) => console.error(`Ошибка при редактировании Аватарки:${err}`))
    .finally(() => popupAvatar.setupDefaultText());
}
// обработчик нажатия на  корзну
function handleClickBtnDelete(data, evt) {
  popupDelete.open(data, evt);
}
// обработчик нажатия на картинку
function handleClickImg(name, link) {
  popupImg.open(name, link);
}
// заполнение полей input формы Edit
function fillInEditProfileFormInputs(info) {
  inputEditName.value = info.name;
  inputEditAbout.value = info.about;
}
// удаление карточки
function deleteCard(data, element) {
  api
    .deleteCardByServer(data)
    .then(() => {
      element.removeCard();
      popupDelete.close();
    })
    .catch((err) => console.error(`Ошибка при удалении карточки:${err}`))
    .finally(() => popupDelete.setupDefaultText());
}
// создание карточки
const createCard = (item) => {
  const cardItem = new Card(
    item,
    handleClickImg,
    templateElement,
    handleClickBtnDelete,
    (idCard, btnLike) => {
      if (btnLike.classList.contains('element__button-like_active')) {
        api
          .deleteLike(idCard)
          .then((res) => {
            cardItem.changedLike(res.likes);
          })
          .catch((err) => {
            console.error(`Ошибка при удалении лайка:${err}`);
          });
      } else {
        api
          .addLike(idCard)
          .then((res) => {
            cardItem.changedLike(res.likes);
          })
          .catch((err) => {
            console.error(`Ошибка при добавлении лайка:${err}`);
          });
      }
    }
  );
  return cardItem.getCard();
};
// добавление готовых карточек на старницу
const createItem = (data) => {
  const card = createCard(data);
  cardSection.addItemPrepend(card);
};
// класс  с помощью которого непосредственно идет добавление
const cardSection = new Section(
  {
    renderer: (item) => {
      createItem(item);
    },
  },
  elements
);
// запрос на сервер информации пользователя и карточек
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    userInfo.setUserInfo(dataUser);
    dataCard.reverse().forEach((element) => {
      element.myId = dataUser._id;
      cardSection.renderItem(element);
    });
  })
  .catch((err) =>
    console.error(`Ошибка при создании начальных данных страницы: ${err}`)
  );
