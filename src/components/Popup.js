let log = console.log;
export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._btnClose = this._popup.querySelector('.modal__close');
    this._hendleEscClose = this._hendleEscClose.bind(this);
    this.close = this.close.bind(this);
  }
  open() {
    this._popup.classList.add('modal_opened');
    document.addEventListener('keydown', this._hendleEscClose);
  }
  close() {
    this._popup.classList.remove('modal_opened');
    document.removeEventListener('keydown', this._hendleEscClose);
  }
  _hendleEscClose(evt) {
    if (evt.key === 'Escape') {
      const popup = document.querySelector('modal_opened');
      this.close(popup);
    }
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
  }
}
