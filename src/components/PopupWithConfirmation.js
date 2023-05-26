import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup {
  constructor(selectorPopup, { hendleDelete }) {
    super(selectorPopup);
    this._hendleDelete = hendleDelete;
    this._form = this._popup.querySelector('.modal__form');
    this._btnYes = this._form.querySelector('.modal__button');
    this._btnYesDefault = this._btnYes.textContent;
  }
  open(data, element) {
    super.open();
    this._element = data;
    this._btnDelete = element;
  }

  setupDefaultText() {
    this._btnYes.textContent = this._btnYesDefault;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._hendleDelete(this._element, this._btnDelete);
      this._btnYes.textContent = `${this._btnYes.textContent} ...`;
    });
  }
}
