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

// //! refactoring
// function enableValidation(settings) {
//   const formList = Array.from(
//     document.querySelectorAll(configurationObject.formSelector)
//   );

//   formList.forEach((form) => {
//     setEventListeners(form, settings);
//   });
// }

// //! refactoring as new enableValidation
// function setEventListeners(form, settings) {
//   const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
//   const buttonElement = form.querySelector(settings.saveButtonSelector);

//   toggleButtonState(inputList, buttonElement, settings);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", () => {
//       const errorElement = form.querySelector(`#${inputElement.id}-error`);
//       checkInputValidity(inputElement, errorElement, settings);
//       toggleButtonState(inputList, buttonElement, settings);
//     });
//   });
// }

// //! refactoring
// function checkInputValidity(inputElement, errorElement, settings) {
//   if (inputElement.validity.valid) {
//     hideErrorMessage(inputElement, errorElement, settings);
//   } else {
//     showErrorMessage(inputElement, errorElement, settings);
//   }
// }

// //! refactoring
// function showErrorMessage(inputElement, errorElement, settings) {
//   inputElement.classList.add(settings.invalidInputClass);
//   errorElement.classList.add(settings.errorVisibleClass);
//   errorElement.textContent = inputElement.validationMessage;
// }

// //! refactoring
// function hideErrorMessage(inputElement, errorElement, settings) {
//   inputElement.classList.remove(settings.invalidInputClass);
//   errorElement.classList.remove(settings.errorVisibleClass);
//   errorElement.textContent = "";
// }

// //! refactoring
// function hasInvalidInput(inputList) {
//   return inputList.some((input) => !input.validity.valid);
// }

// //! refactoring
// function toggleButtonState(inputList, buttonElement, settings) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.setAttribute("disabled", true);
//     buttonElement.classList.add(settings.disabledSaveButtonClass);
//   } else {
//     buttonElement.removeAttribute("disabled");
//     buttonElement.classList.remove(settings.disabledSaveButtonClass);
//   }
// }

// //! refactoring
// function resetValidation(form, settings) {
//   const inputList = form.querySelectorAll(settings.inputSelector);
//   inputList.forEach((inputElement) => {
//     const errorElement = form.querySelector(`#${inputElement.id}-error`);
//     hideErrorMessage(inputElement, errorElement, settings);
//   });
// }

// enableValidation(configurationObject);
