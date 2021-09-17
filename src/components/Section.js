export default class Section {
    constructor({ renderer }, containerSelector, api) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        this._api = api;
    }
    renderItems(items) {
        items.forEach(item => this._renderer(item));
    }
    saveItem(data) {
        return this._api.createNewCard(data);
    }
    deleteItem(id) {
        return this._api.deleteCard(id);
    }
    addItem(element) {
        this._container.prepend(element);
    }
}