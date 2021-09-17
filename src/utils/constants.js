export const popupEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const popupEditForm = popupEdit.querySelector('.form');
export const popupNewCardForm = popupNewCard.querySelector('.form');
export const popupAvatarForm = popupAvatar.querySelector('.form');
export const openPopupBtn = document.querySelector('.profile__edit-button');
export const openPopupAddBtn = document.querySelector('.profile__add-button');
export const openPopupAvatarBtn = document.querySelector('.profile__avatar-edit');
export const popupCloseKey = "Escape";
export const validationSettings = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-btn',
    inactiveButtonClass: 'form__save-btn_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};