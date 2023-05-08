import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(selectorPopup, { formSubmit }) {
    super(selectorPopup, { formSubmit });
    this._formSubmit = formSubmit;
    this._popup = document.querySelector(selectorPopup);
    this._form = this._popup.querySelector('.modal__form');
    this._inputs = this._form.querySelectorAll('.modal__input');
    this._button = this._form.querySelector('.modal__button');
    this._getInputValues = this._getInputValues.bind(this);
  }
  _getInputValues() {
    this._inputs.forEach((input) => {
      return input.value;
    });
  }
  close() {
    this._popup.classList.remove('modal_opened');
    this._form.removeEventListener('submit', this._getInputValues);
    this._popup.removeEventListener('mousedown', this.close);
    document.removeEventListener('keydown', this._hendleEscClose);
    this._inputs.forEach((input) => {
      input.value = '';
    });
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('modal_opened')) {
        this.close();
      }
      if (evt.target.classList.contains('modal__close')) {
        this.close();
      }
    });
    document.addEventListener('keydown', this._hendleEscClose);
    this._form.addEventListener('submit', this._formSubmit);
  }
}
