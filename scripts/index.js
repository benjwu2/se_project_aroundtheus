const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// edit modal objects
const modalEdit = document.querySelector("#edit-modal");
const editForm = modalEdit.querySelector("#edit-form");
const editButton = document.querySelector(".profile__edit-button");
const closeButtons = document.querySelectorAll(".modal__close-button");
const inputNameEdit = modalEdit.querySelector(".modal__input_type_name-edit");
const inputTitle = modalEdit.querySelector(".modal__input_type_description");
const cardTemplate = document.querySelector("#card-template").content;
const galleryList = document.querySelector(".gallery__item-list");
const modals = document.querySelectorAll(".modal");

// add modal objects
const modalAdd = document.querySelector("#add-modal");
const addButton = document.querySelector(".profile__add-button");
const addForm = document.querySelector("#add-form");
const inputNameAdd = document.querySelector(".modal__input_type_name-add");
const inputSource = document.querySelector(".modal__input_type_src");
const addFormSaveButton = addForm.querySelector(".modal__save-button");

// save profile name and title elements
const name = document.querySelector(".profile__info-name-text");
const title = document.querySelector(".profile__title");

// image modal objects
const modalImage = document.querySelector("#image-modal");
const image = document.querySelector(".modal__image");
const imageDescription = document.querySelector(".modal__image-description");

// set value of edit form fields to match profile content
inputNameEdit.value = name.textContent;
inputTitle.value = title.textContent;

// open and close modal functions
const openModal = (popup) => {
  popup.classList.add("modal_opened");
};

// event handler for closing add and edit modals on form submission
const closeModal = (popup) => {
  popup.classList.remove("modal_opened");

  // if the modal is a form modal, run resetValidation function
  if (popup.id !== "image-modal") {
    resetValidation(popup.querySelector(".modal__form"));
  }
};

// event handler for the add modal submit event listener
function handleAddFormSubmit(evt) {
  const completedCard = getCardElement({
    name: inputNameAdd.value,
    link: inputSource.value,
  });

  evt.preventDefault();
  galleryList.prepend(completedCard);
  closeModal(modalAdd);
  evt.target.reset();
  toggleButtonState(
    Array.from(addForm.querySelectorAll(".modal__input")),
    addFormSaveButton
  );
}

addForm.addEventListener("submit", handleAddFormSubmit);

// adding cards
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__info-text");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // adding event listeners for image, like, and delete button
  cardImage.addEventListener("click", handleImageClick);
  deleteButton.addEventListener("click", handleDeleteButtonClick);
  likeButton.addEventListener("click", handleLikeButtonClick);

  return cardElement;
}

initialCards.forEach((item) => {
  const completedCard = getCardElement(item);
  galleryList.append(completedCard);
});

function handleImageClick(evt) {
  const eventTarget = evt.target;

  image.src = eventTarget.src;
  imageDescription.textContent = eventTarget.alt;
  image.alt = evt.target.nextSibling.textContent;

  openModal(modalImage);
}

function handleDeleteButtonClick(evt) {
  evt.target.closest(".card").replaceWith();
}

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_clicked");
}

// event handler for edit button event listener
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  name.textContent = inputNameEdit.value;
  title.textContent = inputTitle.value;

  closeModal(modalEdit);
}

editForm.addEventListener("submit", handleProfileFormSubmit);

// event handlers to open add and edit modal
addButton.addEventListener("click", () => openModal(modalAdd));
editButton.addEventListener("click", () => openModal(modalEdit));

// adding the same event listener to the close buttons on all modals

closeButtons.forEach((item) => {
  const closestModal = item.closest(".modal");
  item.addEventListener("click", () => closeModal(closestModal));
});

// validation functions

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
  inputElement.classList.remove("modal__input_invalid");
  errorElement.classList.remove("modal__error_visible");
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
