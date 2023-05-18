const configurationObject = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  saveButtonSelector: ".modal__save-button",
  modalContainerSelector: ".modal__container",
  imageModalSelector: ".modal__image",
  invalidInputClass: "modal__input_invalid",
  errorVisibleClass: "modal__error_visible",
  disabledSaveButtonClass: "modal__save-button_disabled",
};

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(".modal__form"));

  formList.forEach((form) => {
    setEventListeners(form, settings);
  });
}

function setEventListeners(form, settings) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const buttonElement = form.querySelector(settings.saveButtonSelector);

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      const errorElement = form.querySelector(`#${inputElement.id}-error`);
      checkInputValidity(inputElement, errorElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

function checkInputValidity(inputElement, errorElement, settings) {
  if (inputElement.validity.valid) {
    hideErrorMessage(inputElement, errorElement, settings);
  } else {
    showErrorMessage(inputElement, errorElement, settings);
  }
}

function showErrorMessage(inputElement, errorElement, settings) {
  inputElement.classList.add(settings.invalidInputClass);
  errorElement.classList.add(settings.errorVisibleClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideErrorMessage(inputElement, errorElement, settings) {
  inputElement.classList.remove(settings.invalidInputClass);
  errorElement.classList.remove(settings.errorVisibleClass);
  errorElement.textContent = "";
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(settings.disabledSaveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(settings.disabledSaveButtonClass);
  }
}

// adding click and escape key event listeners to modals
modals.forEach((modal) => {
  // if the modal is a form modal
  if (modal.id !== "image-modal") {
    const modalContainer = modal.querySelector(
      configurationObject.modalContainerSelector
    );
    // stop click events that originate within modal container from bubbling up to the modal
    modalContainer.addEventListener("click", (evt) => {
      evt.stopPropagation();
    });
  } else {
    // if the modal is an image modal
    const modalImage = modal.querySelector(
      configurationObject.imageModalSelector
    );
    // stop click events that originate within image from bubbling up to the modal
    modalImage.addEventListener("click", (evt) => {
      evt.stopPropagation();
    });
  }

  modal.addEventListener("click", (evt) => {
    closeModal(modal);
  });

  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeModal(modal);
    }
  });
});

function resetValidation(form) {
  const inputList = form.querySelectorAll(configurationObject.inputSelector);
  inputList.forEach((inputElement) => {
    const errorElement = form.querySelector(`#${inputElement.id}-error`);
    hideErrorMessage(inputElement, errorElement);
  });
}

enableValidation(configurationObject);
