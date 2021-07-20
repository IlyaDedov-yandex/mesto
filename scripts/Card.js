export default class Card {
    constructor(figureData, handleClick, name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._figureImage = figureData.figureImage;
        this._figureCaption = figureData.figureCaption;
        this._popupImage = figureData.popupImage;
        this._handleClick = handleClick;
    }
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
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
        this._element.remove();
    }
    _handelLikeClick(evt) {
        evt.target.classList.toggle('element__like-btn_active');
    }
    _handleImageClick() {
        this._figureImage.src = this._link;
        this._figureImage.alt = `Изображение ${this._name}`;
        this._figureCaption.innerText = this._name;
        this._handleClick(this._popupImage);
    }
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const imageElement = this._element.querySelector('.element__image');
        imageElement.src = this._link;
        imageElement.alt = `Изображение ${this._name}`;
        this._element.querySelector('.element__caption').innerText = this._name;
        return this._element;
    }
}