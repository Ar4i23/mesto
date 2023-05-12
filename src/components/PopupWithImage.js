import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._img = this._popup.querySelector('.modal__img');
    this._title = this._popup.querySelector('.modal__heading');
  }

  open(name, link) {
    super.open();
    this._img.src = link;
    this._img.alt = name;
    this._title.textContent = name;
  }
}
