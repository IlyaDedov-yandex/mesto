export default class Card {
    constructor(handleImageClick, handleCardDelete, handleLikeClick, item, cardSelector, api) {
        this._item = item;
        this._name = item.name;
        this._link = item.link;
        this._likeCount = item.likes.length;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._handleCardDelete = handleCardDelete;
        this._handleLikeClick = handleLikeClick;
        this._api = api;

    }
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }
    _setEventListeners() {
        this._element.querySelector('.element__like-btn').addEventListener('click', () => {
            this._handleLikeClick(this._item._id);
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleImageClick(this._item);
        });
    }
    likeCard(count) {
        this._element.querySelector('.element__like-btn').classList.add('element__like-btn_active');
        this._element.querySelector('.element__like-counter').textContent = count;
    }
    dislikeCard(count) {
        this._element.querySelector('.element__like-btn').classList.remove('element__like-btn_active');
        this._element.querySelector('.element__like-counter').textContent = count;
    }
    deleteCard() {
        this._element.remove();
    }
    _isLiked(id) {
        if (this._item.likes.some(function (element) {
            return element._id === id;
        })) {
            return true;
        }
        return false;
    }
    isLikeActive() {
        if (this._element.querySelector('.element__like-btn').classList.contains('element__like-btn_active')) {
            return true;
        }
        return false;
    }
    generateCard(id) {
        this._element = this._getTemplate();

        if (this._isLiked(id)) {
            this._element.querySelector('.element__like-btn').classList.add('element__like-btn_active');
        }
        if (id != this._item.owner._id) {
            this._element.querySelector('.element__delete-btn').remove();
        }
        else {
            this._element.querySelector('.element__delete-btn').addEventListener('click', () => {
                this._handleCardDelete(this._item._id);
            });
        }
        this._setEventListeners();
        const imageElement = this._element.querySelector('.element__image');
        this._element.querySelector('.element__like-counter').textContent = this._likeCount;
        imageElement.src = this._link;
        imageElement.alt = `Изображение ${this._name}`;
        this._element.querySelector('.element__caption').innerText = this._name;
        return this._element;
    }
}