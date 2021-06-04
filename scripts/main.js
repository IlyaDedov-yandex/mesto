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
        toggleOpen(popupImage);
    });
    return htmlElement;
}

function addCard(card) {
    listCards.prepend(card);
}

function toggleOpen(modal) {
    modal.classList.toggle('popup_opened');
}

function popupEditOpen(evt) {
    console.log(evt);
    editFormName.value = profileTitle.textContent;
    editFormAbout.value = profileSubtitle.textContent;
    toggleOpen(popupEdit);
}

function popupNewCardOpen(evt) {
    newCardFormName.value = '';
    NewCardFormLink.value = '';
    toggleOpen(popupNewCard);
}

function popupEditSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = editFormName.value;
    profileSubtitle.textContent = editFormAbout.value;
    toggleOpen(popupEdit);
}
function popupNewCardSubmitHandler(evt) {
    evt.preventDefault();
    const title = newCardFormName.value;
    const subtitle = NewCardFormLink.value;
    const newCard = createCard(title, subtitle);
    addCard(newCard);
    toggleOpen(popupNewCard);
}

popupEditForm.addEventListener('submit', popupEditSubmitHandler);
popupNewCardForm.addEventListener('submit', popupNewCardSubmitHandler);
openPopupBtn.addEventListener('click', popupEditOpen);
openPopupAddBtn.addEventListener('click', popupNewCardOpen);

popups.forEach((item => {
    item.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close-btn'))
            toggleOpen(item);
    })
}))