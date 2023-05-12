import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(selectorPopup, { formSubmit }) {
    super(selectorPopup);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector('.modal__form');
    this._inputs = this._form.querySelectorAll('.modal__input');
  }
  _getInputValues() {
    const [name, about] = this._inputs;
    return { name: name.value, about: about.value };
  }
  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
    });
  }
}
