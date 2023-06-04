import { Card } from "../components/Card.js";
import {
  FormValidator,
  configurationObject,
} from "../components/FormValidator.js";
import { modalAdd } from "../pages/index.js";

function handleEscapeKeyPress(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".modal_opened"));
  }
}

// event handler for the add modal submit event listener
function handleAddFormSubmit(evt) {
  const cardObject = new Card(
    {
      name: document.querySelector(".modal__input_type_name-add").value,
      link: document.querySelector(".modal__input_type_src").value,
    },
    "#card-template"
  );

  const completedCard = cardObject.getCardElement();
  const addValidator = new FormValidator(
    configurationObject,
    document.querySelector("#add-form")
  );

  evt.preventDefault();
  document.querySelector(".gallery__item-list").prepend(completedCard);
  closeModal(modalAdd);
  evt.target.reset();
  addValidator._toggleButtonState(
    Array.from(addForm.querySelectorAll(".modal__input")),
    addFormSaveButton,
    configurationObject
  );
}

function handleImageClick(evt) {
  // image
  document.querySelector(".modal__image").src = evt.target.src;
  document.querySelector(".modal__image").alt = evt.target.alt;

  // description
  document.querySelector(".modal__image-description").textContent =
    evt.target.alt;

  openModal(document.querySelector("#image-modal"));
}

function handleDeleteButtonClick(evt) {
  evt.target.closest(".card").replaceWith();
}

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_clicked");
}

// open and close modal functions
const openModal = (popup) => {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscapeKeyPress);
};

// event handler for closing add and edit modals on form submission
const closeModal = (popup) => {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscapeKeyPress);
};

export {
  handleEscapeKeyPress,
  handleAddFormSubmit,
  handleImageClick,
  handleDeleteButtonClick,
  handleLikeButtonClick,
  openModal,
  closeModal,
};
