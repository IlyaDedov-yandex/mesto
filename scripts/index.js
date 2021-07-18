import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./initial-cards.js"
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditForm = popupEdit.querySelector('.form');
const editFormName = popupEditForm.querySelector('.form__input_type_name');
const editFormAbout = popupEditForm.querySelector('.form__input_type_about');
const popupNewCardForm = popupNewCard.querySelector('.form');
const newCardFormName = popupNewCardForm.querySelector('.form__input_type_name');
const newCardFormLink = popupNewCardForm.querySelector('.form__input_type_about');
export const popupImage = document.querySelector('.popup_type_image');
export const figureImage = popupImage.querySelector('.figure__image');
export const figureCaption = popupImage.querySelector('.figure__caption');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const openPopupBtn = document.querySelector('.profile__edit-button');
const openPopupAddBtn = document.querySelector('.profile__add-button');
const listCards = document.querySelector('.elements__list');
const validationSettings = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-btn',
    inactiveButtonClass: 'form__save-btn_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};
const editFormValidator = new FormValidator(validationSettings, popupEditForm);
const newCardFormValidator = new FormValidator(validationSettings, popupNewCardForm);
editFormValidator.enableValidation();
newCardFormValidator.enableValidation();
renderCards();
function renderCards() {
    initialCards.reverse().forEach(item => {
        const newCard = new Card(item.name, item.link, '.card-template');
        const cardElement = newCard.generateCard();
        addCard(cardElement);
    });
}
function addCard(card) {
    listCards.prepend(card);
}
export function openPopup(modal) {
    document.addEventListener('keydown', handleKeyboard);
    modal.classList.add('popup_opened');
}
function closePopup(modal) {
    document.removeEventListener('keydown', handleKeyboard);
    modal.classList.remove('popup_opened');
}
function openProfilePopup() {
    editFormName.value = profileTitle.textContent;
    editFormAbout.value = profileSubtitle.textContent;
    editFormValidator.checkOpenPopupValidity();
    openPopup(popupEdit);
}
function openNewCardPopup() {
    popupNewCardForm.reset();
    newCardFormValidator.checkOpenPopupValidity();
    openPopup(popupNewCard);
}
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = editFormName.value;
    profileSubtitle.textContent = editFormAbout.value;
    closePopup(popupEdit);
}
function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    const title = newCardFormName.value;
    const subtitle = newCardFormLink.value;
    const newCard = new Card(title, subtitle, '.card-template');
    const cardElement = newCard.generateCard();
    addCard(cardElement);
    closePopup(popupNewCard);
}
function handleKeyboard(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.key === "Escape") {
        closePopup(openedPopup);
    }
}
popupEditForm.addEventListener('submit', handleProfileFormSubmit);
popupNewCardForm.addEventListener('submit', handleNewCardFormSubmit);
openPopupBtn.addEventListener('click', openProfilePopup);
openPopupAddBtn.addEventListener('click', openNewCardPopup);
popups.forEach((item => {
    item.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close-btn'))
            closePopup(item);
    });
    item.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(item);
        }
    })
}))