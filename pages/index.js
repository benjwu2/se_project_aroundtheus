import {
  FormValidator,
  configurationObject,
} from "../components/FormValidator.js";

import { Card } from "../components/Card.js";

import { openModal, closeModal } from "../utils/utils.js";

import { PopupWithImage, PopupWithForm } from "../components/Popup.js";

import { Section } from "../components/Section.js";

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
const editForm = document.forms["edit"];
const editButton = document.querySelector(".profile__edit-button");
const closeButtons = document.querySelectorAll(".modal__close-button");
const inputNameEdit = modalEdit.querySelector(".modal__input_type_name-edit");
const inputTitle = modalEdit.querySelector(".modal__input_type_description");
const galleryList = document.querySelector(".gallery__item-list");

// add modal objects
const modalAdd = document.querySelector("#add-modal");
const addButton = document.querySelector(".profile__add-button");
const addForm = document.forms["add"];
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
function renderer(item) {
  const cardObject = createCardObject(item, "#card-template");
  const completedCard = cardObject.getCardElement();
  galleryList.append(completedCard);
}

// CREATING INSTANCES OF CLASSES
const gallerySection = new Section(
  {
    items: initialCards,
    renderer: renderer,
  },
  ".gallery__item-list"
);

// image modal class
const imagePopup = new PopupWithImage("#image-modal");
imagePopup.setEventListeners();

// profile edit modal class
const profileFormPopup = new PopupWithForm(
  "#edit-form",
  handleProfileFormSubmit
);
profileFormPopup.setEventListeners();

// add image modal class
const addFormPopup = new PopupWithForm("#add-form", handleAddFormSubmit);
addFormPopup.setEventListeners();

gallerySection.renderItems();

// ENABLE VALIDATION FOR ALL FORMS
const formValidators = {};

//! validation
formList.forEach((form) => {
  const formName = form.getAttribute("name");
  formValidators[`${formName}`] = new FormValidator(configurationObject, form);
  formValidators[`${formName}`].enableValidation();
});

function createCardObject(data, templateSelector) {
  return new Card(data, templateSelector);
}

// event handler for the add modal submit event listener

// the destructuring variables "name," "link" have to match
// the name of the keys for the passed object, which are in turn
// named after the value of the name attributes for the two
// add form inputs in index.html ~ lines 77 and 88
function handleAddFormSubmit({ name, link }) {
  const cardObject = createCardObject(
    {
      name: name,
      link: link,
    },
    "#card-template"
  );

  const completedCard = cardObject.getCardElement();

  // galleryList.prepend(completedCard);
  //! debug, remove after
  console.log("beep, handleAddFormSubmit called");
  gallerySection.addItem(completedCard);
  closeModal(modalAdd);
  addForm.reset();
  formValidators["add"].resetValidation();
}

// event handler for edit button event listener
// _getInputValues() function in Popup.js creates a dictionary based on input name attribute
// values, hence inputValues.name and inputValues.description (see profile form in index.html)
function handleProfileFormSubmit(evt, inputValues) {
  evt.preventDefault();

  name.textContent = inputValues.name;
  title.textContent = inputValues.description;

  closeModal(modalEdit);
}

editForm.addEventListener("submit", handleProfileFormSubmit);

// event handlers to open add and edit modal
addButton.addEventListener("click", () => {
  openModal(modalAdd);
});

editButton.addEventListener("click", () => {
  formValidators["edit"].resetValidation();
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
