export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this.renderer = renderer;
    this._container = containerSelector;
  }
  renderItem() {
    this._items.forEach((item) => {
      const card = this.renderer(item);
      this.addItem(card);
    });
  }
  addItem(element) {
    this._container.prepend(element);
  }
}
