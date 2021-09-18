import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, popupCloseKey, { handleFormSubmit }) {
        super(popupSelector, popupCloseKey);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popup.querySelector('.form');
        this._inputList = this._formElement.querySelectorAll('.form__input');
        this._callHandleFormSubmit = this._callHandleFormSubmit.bind(this);
    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }
    _callHandleFormSubmit(evt) {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
    }
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', this._callHandleFormSubmit)
    }
    close() {
        super.close();
        this._formElement.reset();
    }
}