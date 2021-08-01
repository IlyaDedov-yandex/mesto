import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { initialCards, validationSettings, popupEditForm, popupNewCardForm, profileTitle, profileSubtitle, openPopupBtn, openPopupAddBtn, popupCloseKey } from "../utils/constants.js";
const editFormValidator = new FormValidator(validationSettings, popupEditForm);
const newCardFormValidator = new FormValidator(validationSettings, popupNewCardForm);
editFormValidator.enableValidation();
newCardFormValidator.enableValidation();

function createCard(handleClick, item, cardSelector) {
    const card = new Card(handleClick, item, cardSelector);
    const cardElement = card.generateCard();
    return cardElement;
}
const cardsList = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const cardElement = createCard(handleImageClick, item, '.card-template');
            cardsList.addItem(cardElement);
        },
    },
    '.elements__list'
);
cardsList.renderItems();
const popupWithImage = new PopupWithImage('.popup_type_image', popupCloseKey);
popupWithImage.setEventListeners();
function handleImageClick(item) {
    popupWithImage.open(item);
}

const userInfo = new UserInfo({ name: '.profile__title', about: '.profile__subtitle' });
const popupWithProfile = new PopupWithForm(
    '.popup_type_edit',
    popupCloseKey,
    {
        handleFormSubmit: (inputValues) => {
            userInfo.setUserInfo(inputValues['profile-name'], inputValues['profile-about']);
        }
    }
);
const popupAddImage = new PopupWithForm(
    '.popup_type_new-card',
    popupCloseKey,
    {
        handleFormSubmit: (inputValues) => {
            const cardElement = createCard(handleImageClick, { name: inputValues['card-name'], link: inputValues['card-link'] }, '.card-template');
            cardsList.addItem(cardElement);
        }
    }
);
popupAddImage.setEventListeners();
popupWithProfile.setEventListeners();
function handleOpenProfilePopup() {
    const userData = userInfo.getUserInfo();
    popupEditForm.querySelector('.form__input_type_name').value = userData['name'];
    popupEditForm.querySelector('.form__input_type_about').value = userData['about'];
    editFormValidator.checkOpenPopupValidity();
    popupWithProfile.open();
}
function handleOpenNewCardPopup() {
    newCardFormValidator.checkOpenPopupValidity();
    popupAddImage.open();
}
openPopupBtn.addEventListener('click', handleOpenProfilePopup);
openPopupAddBtn.addEventListener('click', handleOpenNewCardPopup);