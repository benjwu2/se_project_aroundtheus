import {
  FormValidator,
  configurationObject,
} from "../components/FormValidator.js";

import { Card } from "../components/Card.js";

import { openModal, closeModal, handleAddFormSubmit } from "../utils/utils.js";

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

const modals = document.querySelectorAll(".modal");

// edit modal objects
const modalEdit = document.querySelector("#edit-modal");
const editForm = modalEdit.querySelector("#edit-form");
const editButton = document.querySelector(".profile__edit-button");
const closeButtons = document.querySelectorAll(".modal__close-button");
const inputNameEdit = modalEdit.querySelector(".modal__input_type_name-edit");
const inputTitle = modalEdit.querySelector(".modal__input_type_description");
const galleryList = document.querySelector(".gallery__item-list");

// add modal objects
const modalAdd = document.querySelector("#add-modal");
const addButton = document.querySelector(".profile__add-button");
const addForm = document.querySelector("#add-form");
const addFormSaveButton = addForm.querySelector(".modal__save-button");

// save profile name and title elements
const name = document.querySelector(".profile__info-name-text");
const title = document.querySelector(".profile__title");

// forms
const formList = document.querySelectorAll(".modal__form");

// set value of edit form fields to match profile content
inputNameEdit.value = name.textContent;
inputTitle.value = title.textContent;

addForm.addEventListener("submit", handleAddFormSubmit);

// add cards to gallery on site load
initialCards.forEach((item) => {
  const cardObject = new Card(item, "#card-template");
  const completedCard = cardObject.getCardElement();
  galleryList.append(completedCard);
});

// enable validation for all forms
formList.forEach((form) => {
  const validator = new FormValidator(configurationObject, form);
  validator.enableValidation();
});

// event handler for edit button event listener
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  name.textContent = inputNameEdit.value;
  title.textContent = inputTitle.value;

  closeModal(modalEdit);
}

editForm.addEventListener("submit", handleProfileFormSubmit);

// event handlers to open add and edit modal
addButton.addEventListener("click", () => {
  openModal(modalAdd);
});

editButton.addEventListener("click", () => {
  const editValidation = new FormValidator(
    configurationObject,
    document.querySelector("#edit-form")
  );
  editValidation.resetValidation();
  openModal(modalEdit);
});

// adding the same event listener to the close buttons on all modals

closeButtons.forEach((item) => {
  const closestModal = item.closest(".modal");
  item.addEventListener("click", () => closeModal(closestModal));
});

// adding click listeners to modals
modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

export { addForm, addFormSaveButton, modalAdd };
