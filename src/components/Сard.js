import * as dataInport from '../utils/constants.js';

// class Card создание новых карточек
export default class Card {
  constructor(data, handleCardClick) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._template = dataInport.newElement;
  }
  _generateCard() {
    this._card = this._template.cloneNode(true);
    const itemImg = this._card.querySelector('.element__image');
    itemImg.src = this._data.link;
    itemImg.alt = this._data.name;
    this._card.querySelector('.element__title').textContent = this._data.name;
    return this._card;
  }

  getCard() {
    this._generateCard();
    this._setEventListeners();
    return this._card;
  }
  _setEventListeners() {
    const btnDelete = this._card.querySelector('.element__button-delete');
    const btnLike = this._card.querySelector('.element__button-like');
    const imgCard = this._card.querySelector('.element__image');
    btnDelete.addEventListener('click', this._deleteCard);
    btnLike.addEventListener('click', this._toggleLike);
    imgCard.addEventListener('click', () => {
      this._handleCardClick(this._data.name, this._data.link);
    });
  }
  _deleteCard(evt) {
    evt.target.closest('.element').remove();
  }
  _toggleLike(evt) {
    evt.target.classList.toggle('element__button-like_active');
  }
}
