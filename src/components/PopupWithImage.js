import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(selectorPopup, { cardClick }) {
    super(selectorPopup, { cardClick });
    this._popup = document.querySelector(selectorPopup);
    this._img = this._popup.querySelector('.modal__img');
    this._title = this._popup.querySelector('.modal__heading');
  }

  open(name, link) {
    this._img.src = link;
    this._img.alt = name;
    this._title.textContent = name;
    this._popup.classList.add('modal_opened');
    this.setEventListeners();
  }
}
