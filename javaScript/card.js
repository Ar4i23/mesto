import * as dataInport from './variable.js';
// class Card добавление готовых карточек в котнтейнер
class Card {
  constructor(containerSelector) {
    this._container = containerSelector;
  }
  addCard(_card) {
    this._container.prepend(_card);
  }
}
// class CardItem создание новых карточек
class CardItem {
  constructor(data) {
    this._data = data;
    this._template = dataInport.newElement;
    this._openImagePopup = this._openImagePopup.bind(this);
  }
  _creadCard() {
    this._card = this._template.cloneNode(true);
    const itemImg = this._card.querySelector('.element__image');
    itemImg.src = this._data.link;
    itemImg.alt = this._data.name;
    this._card.querySelector('.element__title').textContent = this._data.name;
    return this._card;
  }

  _getCard() {
    this._creadCard();
    this._setEventListeners();
    return this._card;
  }
  _setEventListeners(evt) {
    const btnDelete = this._card.querySelector('.element__button-delete');
    const btnLike = this._card.querySelector('.element__button-like');
    const imgCard = this._card.querySelector('.element__image');
    btnDelete.addEventListener('click', this._deleteCard);
    btnLike.addEventListener('click', this._toggleLike);
    imgCard.addEventListener('click', this._openImagePopup);
  }
  _deleteCard() {
    this.closest('.element').remove();
  }
  _toggleLike() {
    this.classList.toggle('element__button-like_active');
  }
  _openModal(evt) {
    evt.classList.add('modal_opened');
  }
  _openImagePopup() {
    this._openModal(dataInport.popupImage);
    this._fillInImagePopup();
  }
  _fillInImagePopup() {
    dataInport.srcImgModal.src = this._data.link;
    dataInport.srcImgModal.alt = this._data.name;
    dataInport.headingImg.textContent = this._data.name;
  }
}
// проход по массиву объектов и передача его элементов в параметр
// для создания новой карточки
dataInport.initialCards.forEach((item) => {
  const listCard = new Card(dataInport.elements);
  const cardItem = new CardItem(item);
  const card = cardItem._getCard();
  listCard.addCard(card);
});
export { Card, CardItem };
