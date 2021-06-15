const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditForm = popupEdit.querySelector('.form');
const editFormName = popupEditForm.querySelector('.form__input_type_name');
const editFormAbout = popupEditForm.querySelector('.form__input_type_about');
const popupNewCardForm = popupNewCard.querySelector('.form');
const newCardFormName = popupNewCardForm.querySelector('.form__input_type_name');
const NewCardFormLink = popupNewCardForm.querySelector('.form__input_type_about');
const popupImage = document.querySelector('.popup_type_image');
const figureImage = popupImage.querySelector('.figure__image');
const figureCaption = popupImage.querySelector('.figure__caption');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const openPopupBtn = document.querySelector('.profile__edit-button');
const openPopupAddBtn = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('.card-template').content;
const listCards = document.querySelector('.elements__list');
renderCards();

function renderCards() {
    initialCards.reverse().forEach(item => {
        const newCard = createCard(item.name, item.link);
        addCard(newCard);
    });
}
function createCard(name, link) {
    const htmlElement = cardTemplate.cloneNode(true);
    const likeBtn = htmlElement.querySelector('.element__like-btn');
    const deleteBtn = htmlElement.querySelector('.element__delete-btn');
    const image = htmlElement.querySelector('.element__image');
    const caption = htmlElement.querySelector('.element__caption');
    image.src = link;
    image.alt = `Изображение ${name}`;
    caption.innerText = name;
    deleteBtn.addEventListener('click', (evt) => {
        evt.target.closest('.element').remove();
    });
    likeBtn.addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like-btn_active');
    });
    image.addEventListener('click', (evt) => {
        figureImage.src = image.src;
        figureImage.alt = `Изображение ${caption.textContent}`;
        figureCaption.innerText = caption.textContent;
        openPopup(popupImage);
    });
    return htmlElement;
}
function addCard(card) {
    listCards.prepend(card);
}
function openPopup(modal) {
    modal.classList.add('popup_opened');
}
function closePopup(modal) {
    modal.classList.remove('popup_opened');
}
function popupEditOpen(evt) {
    console.log(evt);
    editFormName.value = profileTitle.textContent;
    editFormAbout.value = profileSubtitle.textContent;
    openPopup(popupEdit);
}
function popupNewCardOpen(evt) {
    newCardFormName.value = '';
    NewCardFormLink.value = '';
    openPopup(popupNewCard);
}
function popupEditSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = editFormName.value;
    profileSubtitle.textContent = editFormAbout.value;
    closePopup(popupEdit);
}
function popupNewCardSubmitHandler(evt) {
    evt.preventDefault();
    const title = newCardFormName.value;
    const subtitle = NewCardFormLink.value;
    const newCard = createCard(title, subtitle);
    addCard(newCard);
    closePopup(popupNewCard);
}

function showInputError(formElement, inputElement, inputErrorClass, errorClass, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
    }
    else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
}
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
    }
    else {
        buttonElement.classList.remove(inactiveButtonClass);
    }
}

function setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        })
    })
}

function enableValidation(settings) {
    const formList = document.querySelectorAll(settings.formSelector);
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        })
        setEventListeners(formElement, settings.inputSelector, settings.submitButtonSelector, settings.inactiveButtonClass, settings.inputErrorClass, settings.errorClass);
    })
}
enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-btn',
    inactiveButtonClass: 'form__save-btn_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_visible'
});

popupEditForm.addEventListener('submit', popupEditSubmitHandler);
popupNewCardForm.addEventListener('submit', popupNewCardSubmitHandler);
openPopupBtn.addEventListener('click', popupEditOpen);
openPopupAddBtn.addEventListener('click', popupNewCardOpen);

popups.forEach((item => {
    item.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close-btn'))
            closePopup(item);
    })
}))