import './index.css';
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupAgree from '../components/PopupAgree.js';
import { validationSettings, popupEditForm, popupNewCardForm, popupAvatarForm, openPopupBtn, openPopupAddBtn, openPopupAvatarBtn, popupCloseKey } from "../utils/constants.js";
const editFormValidator = new FormValidator(validationSettings, popupEditForm);
const newCardFormValidator = new FormValidator(validationSettings, popupNewCardForm);
const avatarFormValidator = new FormValidator(validationSettings, popupAvatarForm);
editFormValidator.enableValidation();
newCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
let userId;
const userInfo = new UserInfo({ name: '.profile__title', about: '.profile__subtitle', avatar: '.profile__avatar' });
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
    headers: {
        authorization: '2d3e1cdc-e394-4bd9-a5ca-873b1a753e66',
        'Content-Type': 'application/json'
    }
});

const cardsList = new Section(
    {
        renderer: (item) => {
            const cardElement = createCard(item, '.card-template');
            cardsList.addItem(cardElement);
        }
    },
    '.elements__list',
    api
);
Promise.all([api.getInitialInfo(), api.getInitialCards()])
    .then(([info, cards]) => {
        userId = info._id;
        userInfo.setUserInfo(info.name, info.about, info.avatar);
        cardsList.renderItems(cards);
    })
    .catch((err) => {
        console.log(err);
    })
function createCard(item, cardSelector) {
    const card = new Card(handleImageClick, handleCardDelete, handleLikeClick, item, cardSelector);
    function handleCardDelete(cardId) {
        const popupDelete = new PopupAgree(
            '.popup_type_delete',
            popupCloseKey,
            {
                handleFormSubmit: () => {
                    api
                        .deleteCard(cardId)
                        .then(() => {
                            card.deleteCard();
                            popupDelete.close();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }
        );
        popupDelete.open();
        popupDelete.setEventListeners();
    }
    function handleLikeClick(cardId) {
        if (card.isLikeActive()) {
            api
                .dislikeCard(cardId)
                .then(res => { card.dislikeCard(res.likes.length) })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            api
                .likeCard(cardId)
                .then(res => { card.likeCard(res.likes.length) })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    function handleImageClick(item) {
        popupWithImage.open(item);
    }
    const cardElement = card.generateCard(userId);
    return cardElement;
}

const popupWithImage = new PopupWithImage('.popup_type_image', popupCloseKey);
popupWithImage.setEventListeners();

const popupWithProfile = new PopupWithForm(
    '.popup_type_edit',
    popupCloseKey,
    {
        handleFormSubmit: (inputValues) => {
            changeBtnState(popupEditForm, 'Сохранение...');
            api
                .editProfileInfo({ name: inputValues['profile-name'], about: inputValues['profile-about'] })
                .then(data => {
                    userInfo.setUserInfo(data.name, data.about);
                    popupWithProfile.close();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    changeBtnState(popupEditForm, 'Сохранить');
                })

        }
    }
);
const popupAddImage = new PopupWithForm(
    '.popup_type_new-card',
    popupCloseKey,
    {
        handleFormSubmit: (inputValues) => {
            changeBtnState(popupNewCardForm, 'Сохранение...');
            cardsList.saveItem({ name: inputValues['card-name'], link: inputValues['card-link'] })
                .then(data => {
                    const cardElement = createCard(data, '.card-template');
                    cardsList.addItem(cardElement);
                    popupAddImage.close();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    changeBtnState(popupNewCardForm, 'Сохранить');
                })

        }
    }
);
const popupAvatarEdit = new PopupWithForm(
    '.popup_type_avatar',
    popupCloseKey,
    {
        handleFormSubmit: (inputValues) => {
            changeBtnState(popupAvatarForm, 'Сохранение...');
            api
                .editAvatar(inputValues['avatar-link'])
                .then(res => {
                    userInfo.setUserInfo(res.name, res.about, res.avatar);
                    popupAvatarEdit.close();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    changeBtnState(popupAvatarForm, 'Сохранить');
                })
        }
    }
);
function changeBtnState(form, text) {
    form.querySelector('.form__save-btn').textContent = text;
}
popupAvatarEdit.setEventListeners();
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
function handleOpenAvatarPopup() {
    avatarFormValidator.checkOpenPopupValidity();
    popupAvatarEdit.open();
}
openPopupAvatarBtn.addEventListener('click', handleOpenAvatarPopup);
openPopupBtn.addEventListener('click', handleOpenProfilePopup);
openPopupAddBtn.addEventListener('click', handleOpenNewCardPopup);