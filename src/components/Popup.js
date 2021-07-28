export default class Popup {
    constructor(popupSelector, popupCloseKey) {
        this._popup = document.querySelector(popupSelector);
        this._popupCloseKey = popupCloseKey;
        this._callHandleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        document.addEventListener('keydown', this._callHandleEscClose);
        this._popup.classList.add('popup_opened');
    }
    close() {
        document.removeEventListener('keydown', this._callHandleEscClose);
        this._popup.classList.remove('popup_opened');
    }
    _handleEscClose(evt) {
        if (evt.key === this._popupCloseKey) {
            this.close();
        }
    }
    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup__close-btn'))
                this.close();
        });
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup')) {
                this.close();
            }
        })
    }
}