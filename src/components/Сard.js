export default class Card {
  constructor(
    data,
    handleClickImg,
    templateElement,
    handleClickBtnDelete,
    changeLike
  ) {
    this._data = data;
    this.handleClickImg = handleClickImg;
    this.handleClickBtnDelete = handleClickBtnDelete;
    this._changeLike = changeLike;
    this._template = templateElement;
    this._cardId = data._id;
    this._userId = data.owner._id;
    this._arrayLikes = data.likes;
    this._arrayLikesLength = data.likes.length;
    this._myId = data.myId;
    this._card = this._template.cloneNode(true);
    this._element = this._card.querySelector('.element');
    this._btnDelete = this._element.querySelector('.element__button-delete');
    this._itemImg = this._element.querySelector('.element__image');
    this._itemTitle = this._element.querySelector('.element__title');
    this._btnLike = this._element.querySelector('.element__button-like');
    this._counterLike = this._element.querySelector('.element__counter-like');
    this._imgCard = this._element.querySelector('.element__image');
  }
  _generateCard() {
    this._checkVisibleForTrashButton();
    this._checkLikeStatus();
    this._itemImg.src = this._data.link;
    this._itemImg.alt = this._data.name;
    this._itemTitle.textContent = this._data.name;
    return this._card;
  }
  _checkLikeStatus() {
    this._arrayLikes.forEach((like) => {
      if (like._id === this._myId) {
        this._btnLike.classList.add('element__button-like_active');
        return;
      }
    });
    this._counterLike.textContent = this._arrayLikesLength;
  }
  _checkVisibleForTrashButton() {
    this._btnDelete.classList.add(
      this._userId === this._myId
        ? 'element__button-delete_visible'
        : 'element__button-delete_hidden'
    );
  }

  _handleLike() {
    this._changeLike(this._cardId, this._btnLike);
  }

  _setEventListeners() {
    this._btnDelete.addEventListener('click', () => {
      this.handleClickBtnDelete(this._data, this);
    });
    this._btnLike.addEventListener('click', () => {
      this._handleLike();
    });
    this._imgCard.addEventListener('click', () => {
      this.handleClickImg(this._data.name, this._data.link);
    });
  }
  changedLike(likes) {
    this._btnLike.classList.toggle('element__button-like_active');
    this._counterLike.textContent = likes.length;
  }

  getCard() {
    this._generateCard();
    this._setEventListeners();
    return this._card;
  }
  removeCard() {
    this._element.remove();
  }
}
