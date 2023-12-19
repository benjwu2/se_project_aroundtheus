class Section {
  constructor({ items, renderer }, selector) {
    this.items = items;
    this.renderer = renderer;
    this.selector = selector;
  }

  renderItems() {
    this.items.forEach((item) => {
      this.renderer(item);
    });
  }

  addItem(element) {
    let container = document.querySelector(".gallery__item-list");
    container.append(element);
  }
}
