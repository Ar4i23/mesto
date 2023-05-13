export default class Section {
  constructor({ items, renderer }, containerElement) {
    this._items = items;
    this.renderer = renderer;
    this._container = containerElement;
  }
  renderItem() {
    this._items.forEach((item) => {
      this.renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
