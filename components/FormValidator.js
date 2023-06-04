class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute("disabled", true);
      buttonElement.classList.add(this._settings.disabledSaveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove(this._settings.disabledSaveButtonClass);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((input) => !input.validity.valid);
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
    const inputList = this._form.querySelectorAll(this._settings.inputSelector);
    inputList.forEach((inputElement) => {
      const errorElement = this._form.querySelector(
        `#${inputElement.id}-error`
      );
      this._hideErrorMessage(inputElement, errorElement);
    });
  }

  enableValidation() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );

    const buttonElement = this._form.querySelector(
      this._settings.saveButtonSelector
    );

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        const errorElement = this._form.querySelector(
          `#${inputElement.id}-error`
        );
        this._checkInputValidity(inputElement, errorElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
}
