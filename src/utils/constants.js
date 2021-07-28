export const popupEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupEditForm = popupEdit.querySelector('.form');
export const popupNewCardForm = popupNewCard.querySelector('.form');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const openPopupBtn = document.querySelector('.profile__edit-button');
export const openPopupAddBtn = document.querySelector('.profile__add-button');
export const popupCloseKey = "Escape";
const blazhen = new URL('../images/element/__image/element__image-vasiliy-blazhen.jpg', import.meta.url);
const spasnakrovi = new URL('../images/element/__image/element__image-spasnakrovi.jpg', import.meta.url);
const kazan = new URL('../images/element/__image/element__image-kazan.jpg', import.meta.url);
const mayak = new URL('../images/element/__image/element__image-mayak.jpg', import.meta.url);
const crimea = new URL('../images/element/__image/element__image-crimea.jpg', import.meta.url);
const kazanskiy = new URL('../images/element/__image/element__image-kazanskiy.jpg', import.meta.url);

export const initialCards = [
    {
        name: 'Москва',
        link: blazhen
    },
    {
        name: 'Санкт-Петербург',
        link: spasnakrovi
    },
    {
        name: 'Казань',
        link: kazan
    },
    {
        name: 'Владивосток',
        link: mayak
    },
    {
        name: 'Крым',
        link: crimea
    },
    {
        name: 'Питер',
        link: kazanskiy
    }
];
export const validationSettings = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-btn',
    inactiveButtonClass: 'form__save-btn_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};