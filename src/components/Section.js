export default class Section {
  constructor({ renderer }, containerElement) {
    this._renderer = renderer;
    this._container = containerElement;
  }
  renderItem(item) {
    this._renderer(item);
  }

  addItemPrepend(element) {
    this._container.prepend(element);
  }
}
