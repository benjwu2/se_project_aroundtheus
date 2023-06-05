export class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonElement = this._form.querySelector(
      this._settings.saveButtonSelector
    );
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute("disabled", true);
      this._buttonElement.classList.add(this._settings.disabledSaveButtonClass);
    } else {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(
        this._settings.disabledSaveButtonClass
      );
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _checkInputValidity(inputElement, errorElement) {
    if (inputElement.validity.valid) {
      this._hideErrorMessage(inputElement, errorElement);
    } else {
      this._showErrorMessage(inputElement, errorElement);
    }
  }

  _showErrorMessage(inputElement, errorElement) {
    inputElement.classList.add(this._settings.invalidInputClass);
    errorElement.classList.add(this._settings.errorVisibleClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideErrorMessage(inputElement, errorElement) {
    inputElement.classList.remove(this._settings.invalidInputClass);
    errorElement.classList.remove(this._settings.errorVisibleClass);
    errorElement.textContent = "";
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      const errorElement = this._form.querySelector(
        `#${inputElement.id}-error`
      );
      this._hideErrorMessage(inputElement, errorElement);
    });
  }

  enableValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const errorElement = this._form.querySelector(
          `#${inputElement.id}-error`
        );
        this._checkInputValidity(inputElement, errorElement);
        this._toggleButtonState();
      });
    });
  }
}

export const configurationObject = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  saveButtonSelector: ".modal__save-button",
  modalContainerSelector: ".modal__container",
  imageModalSelector: ".modal__image",
  invalidInputClass: "modal__input_invalid",
  errorVisibleClass: "modal__error_visible",
  disabledSaveButtonClass: "modal__save-button_disabled",
};
