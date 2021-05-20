let openPopup = document.querySelector('.profile__edit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let popup = document.querySelector('body > .popup');
let formElement = popup.querySelector('.popup__container');
let closePopup = formElement.querySelector('.popup__close-btn');
let popupName = formElement.querySelector('.popup__input_type_name');
let popupAbout = formElement.querySelector('.popup__input_type_about');
let likeBtns = document.querySelectorAll('.element__like-btn');

openPopup.addEventListener('click', function () {
    popup.classList.add('popup_opened');
    popupName.value = profileTitle.textContent;
    popupAbout.value = profileSubtitle.textContent;
})
closePopup.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
})
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupName.value;
    profileSubtitle.textContent = popupAbout.value;
    popup.classList.remove('popup_opened');
}
formElement.addEventListener('submit', formSubmitHandler);

function toggleClass(event) {
    console.log(event);
    event.target.classList.toggle('element__like-btn_active');
}
likeBtns.forEach(function (likeBtn) {
    likeBtn.addEventListener('click', toggleClass);
});