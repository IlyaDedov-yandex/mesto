import Popup from './Popup.js';
export default class PopupAgree extends Popup {
    constructor(popupSelector, popupCloseKey, { handleFormSubmit }) {
        super(popupSelector, popupCloseKey);
        this._formElement = this._popup.querySelector('.form');
        this._handleFormSubmit = handleFormSubmit;
        this._callHandleFormSubmit = this._callHandleFormSubmit.bind(this);
    }
    _callHandleFormSubmit(evt) {
        evt.preventDefault();
        this._handleFormSubmit();
        this.close();
    }
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', this._callHandleFormSubmit)
    }
    close() {
        super.close();
        this._formElement.removeEventListener('submit', this._callHandleFormSubmit);
    }
}