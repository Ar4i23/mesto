import Popup from './Popup.js';
let log = console.log;
export default class PopupWithForm extends Popup {
  constructor(selectorPopup, { formSubmit }) {
    super(selectorPopup);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.modal__form');
    this._inputs = this._form.querySelectorAll('.modal__input');
    this._btnSave = this._form.querySelector('.modal__button');
    this._btnSaveDefault = this._btnSave.textContent;
  }
  _getInputValues() {
    const formValues = {};
    this._inputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
  open() {
    super.open();
  }
  close() {
    super.close();
    this._form.reset();
  }

  setupDefaultText() {
    this._btnSave.textContent = this._btnSaveDefault;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this._btnSave.textContent = 'Сохранение ...';
    });
  }
}
