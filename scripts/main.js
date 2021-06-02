const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const openPopupBtn = document.querySelector('.profile__edit-button');
const openPopupAddBtn = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('.card_template').content;
const listCards = document.querySelector('.elements__list');

const initialCards = [
    {
        name: 'Москва',
        link: 'images/element/__image/element__image-vasiliy-blazhen.jpg'
    },
    {
        name: 'Санкт-Петербург',
        link: 'images/element/__image/element__image-spasnakrovi.jpg'
    },
    {
        name: 'Казань',
        link: 'images/element/__image/element__image-kazan.jpg'
    },
    {
        name: 'Владивосток',
        link: 'images/element/__image/element__image-mayak.jpg'
    },
    {
        name: 'Крым',
        link: 'images/element/__image/element__image-crimea.jpg'
    },
    {
        name: 'Питер',
        link: 'images/element/__image/element__image-kazanskiy.jpg'
    }
];

renderCards();

function renderCards() {
    initialCards.reverse().forEach(item => {
        addCard(item.name, item.link);
    });
}

function addCard(name, link) {
    const htmlElement = cardTemplate.cloneNode(true);
    const likeBtn = htmlElement.querySelector('.element__like-btn');
    const deleteBtn = htmlElement.querySelector('.element__delete-btn');
    const image = htmlElement.querySelector('.element__image');
    const caption = htmlElement.querySelector('.element__caption');
    image.src = link;
    caption.innerText = name;
    deleteBtn.addEventListener('click', (evt) => {
        evt.target.closest('.element').remove();
    });
    likeBtn.addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like-btn_active');
    });
    image.addEventListener('click', (evt) => {
        popupImage.querySelector('.figure__image').src = image.src;
        popupImage.querySelector('.figure__image').alt = `Изображение ${caption.textContent}`;
        popupImage.querySelector('.figure__caption').innerText = caption.textContent;
        openPopup(popupImage);
    });
    listCards.prepend(htmlElement);
}

function openPopup(modal) {
    const inputName = modal.querySelector('.form__input_type_name');
    const inputAbout = modal.querySelector('.form__input_type_about');
    if (modal === popupEdit) {
        inputName.value = profileTitle.textContent;
        inputAbout.value = profileSubtitle.textContent;
    }
    if (modal === popupNewCard) {
        inputName.value = '';
        inputAbout.value = '';
    }
    modal.classList.add('popup_opened');
}

function closePopup(modal) {
    modal.classList.remove('popup_opened');
}

function formSubmitHandler(modal) {
    const title = modal.querySelector('.form__input_type_name').value;
    const subtitle = modal.querySelector('.form__input_type_about').value;
    if (modal === popupEdit) {
        profileTitle.textContent = title;
        profileSubtitle.textContent = subtitle;
    }
    if (modal === popupNewCard) {
        addCard(title, subtitle);
    }
    modal.classList.remove('popup_opened');
}
openPopupBtn.addEventListener('click', () => openPopup(popupEdit));
openPopupAddBtn.addEventListener('click', () => openPopup(popupNewCard));

popups.forEach((item => {
    item.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close-btn'))
            closePopup(item);
    })
    if (item.querySelector('.form')) {
        item.querySelector('.form').addEventListener('submit', (evt) => {
            evt.preventDefault();
            formSubmitHandler(item);
        })
    }
}))