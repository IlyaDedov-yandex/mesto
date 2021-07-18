export default class FormValidator {
    constructor(settings, formElement) {
        this._formElement = formElement;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
    }

    _showInputError() {
        const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
        this._inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = this._inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }
    _hideInputError() {
        const errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
        this._inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    }
    _checkInputValidity() {
        if (!this._inputElement.validity.valid) {
            this._showInputError();
        }
        else {
            this._hideInputError();
        }
    }
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
        }
        else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }
    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._inputElement = inputElement;
                this._checkInputValidity();
                this._toggleButtonState();
            })
        })
    }

    checkOpenPopupValidity() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._inputElement = inputElement;
            this._hideInputError();
        })
    }
    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        })
        this._setEventListeners();
    }
}
