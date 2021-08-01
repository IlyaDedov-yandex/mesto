import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector, popupCloseKey) {
        super(popupSelector, popupCloseKey);
        this._figureImage = this._popup.querySelector('.figure__image');
        this._figureCaption = this._popup.querySelector('.figure__caption');
    }
    open(data) {
        super.open();
        this._figureImage.src = data.link;
        this._figureImage.alt = `Изображение ${data.name}`;
        this._figureCaption.innerText = data.name;
    }

}