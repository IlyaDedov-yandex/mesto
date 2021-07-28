import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(data, popupSelector, popupCloseKey) {
        super(popupSelector, popupCloseKey);
        this._name = data.name;
        this._link = data.link;
        this._figureImage = this._popup.querySelector('.figure__image');
        this._figureCaption = this._popup.querySelector('.figure__caption');
    }
    open() {
        super.open();
        this._figureImage.src = this._link;
        this._figureImage.alt = `Изображение ${this._name}`;
        this._figureCaption.innerText = this._name;
    }

}