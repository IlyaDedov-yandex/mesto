import './pages/index.css';
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import { initialCards, validationSettings, popupEditForm, popupNewCardForm, profileTitle, profileSubtitle, openPopupBtn, openPopupAddBtn, popupCloseKey } from "./utils/constants.js";
const editFormValidator = new FormValidator(validationSettings, popupEditForm);
const newCardFormValidator = new FormValidator(validationSettings, popupNewCardForm);
editFormValidator.enableValidation();
newCardFormValidator.enableValidation();

const cardsList = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const card = new Card(handleImageClick, item, '.card-template');
            const cardElement = card.generateCard();
            cardsList.addItem(cardElement);
        },
    },
    '.elements__list'
);
cardsList.renderItems();

function handleImageClick(item) {
    const popupWithImage = new PopupWithImage(item, '.popup_type_image', popupCloseKey);
    popupWithImage.open();
    popupWithImage.setEventListeners();
}

const userInfo = new UserInfo({ name: '.form__input_type_name', about: '.form__input_type_about' });
const popupWithProfile = new PopupWithForm(
    '.popup_type_edit',
    popupCloseKey,
    {
        handleFormSubmit: () => {
            const userData = userInfo.getUserInfo();
            profileTitle.textContent = userData.name;
            profileSubtitle.textContent = userData.about;
        }
    }
);
const popupAddImage = new PopupWithForm(
    '.popup_type_new-card',
    popupCloseKey,
    {
        handleFormSubmit: (inputs) => {
            const card = new Card(handleImageClick, { name: inputs['card-name'], link: inputs['card-link'] }, '.card-template');
            const cardElement = card.generateCard();
            cardsList.addItem(cardElement);
        }
    }
);
function handleOpenProfilePopup() {
    userInfo.setUserInfo(profileTitle.textContent, profileSubtitle.textContent);
    popupWithProfile.setEventListeners();
    editFormValidator.checkOpenPopupValidity();
    popupWithProfile.open();
}
function handleOpenNewCardPopup() {
    popupAddImage.setEventListeners();
    newCardFormValidator.checkOpenPopupValidity();
    popupAddImage.open();
}
openPopupBtn.addEventListener('click', handleOpenProfilePopup);
openPopupAddBtn.addEventListener('click', handleOpenNewCardPopup);