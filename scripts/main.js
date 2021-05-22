let openPopupBtn = document.querySelector('.profile__edit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popup = document.querySelector('body > .popup');
let closePopupBtn = popup.querySelector('.popup__close-btn');
let formElement = popup.querySelector('.form');
let popupName = formElement.querySelector('.form__input_type_name');
let popupAbout = formElement.querySelector('.form__input_type_about');

function openPopup() {
    popup.classList.add('popup_opened');
    popupName.value = profileTitle.textContent;
    popupAbout.value = profileSubtitle.textContent;
}
function closePopup() {
    popup.classList.remove('popup_opened');
}
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupName.value;
    profileSubtitle.textContent = popupAbout.value;
    popup.classList.remove('popup_opened');
}
openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);