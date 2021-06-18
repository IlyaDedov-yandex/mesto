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
function checkOpenPopupValidity(formElement, settings) {
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const inactiveButtonClass = settings.inactiveButtonClass;
    const inputErrorClass = settings.inputErrorClass;
    const errorClass = settings.errorClass;
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
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