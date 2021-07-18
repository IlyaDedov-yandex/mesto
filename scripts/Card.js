import { popupImage, figureImage, figureCaption, openPopup } from "./index.js";
export default class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
        return cardElement;
    }
    _setEventListeners() {
        this._element.querySelector('.element__delete-btn').addEventListener('click', (evt) => {
            this._handelDeleteClick(evt);
        });
        this._element.querySelector('.element__like-btn').addEventListener('click', (evt) => {
            this._handelLikeClick(evt);
        });
        this._element.querySelector('.element__image').addEventListener('click', (evt) => {
            this._handleImageClick();
        });
    }
    _handelDeleteClick(evt) {
        evt.target.closest('.element').remove();
    }
    _handelLikeClick(evt) {
        evt.target.classList.toggle('element__like-btn_active');
    }
    _handleImageClick() {
        figureImage.src = this._link;
        figureImage.alt = `Изображение ${this._name}`;
        figureCaption.innerText = this._name;
        openPopup(popupImage);
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = `Изображение ${this._name}`;
        this._element.querySelector('.element__caption').innerText = this._name;
        return this._element;
    }
}