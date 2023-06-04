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
const inputNameAdd = document.querySelector(".modal__input_type_name-add");
const inputSource = document.querySelector(".modal__input_type_src");
const addFormSaveButton = addForm.querySelector(".modal__save-button");

// save profile name and title elements
const name = document.querySelector(".profile__info-name-text");
const title = document.querySelector(".profile__title");

// set value of edit form fields to match profile content
inputNameEdit.value = name.textContent;
inputTitle.value = title.textContent;

function handleEscapeKeyPress(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".modal_opened"));
  }
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

// event handler for the add modal submit event listener
function handleAddFormSubmit(evt) {
  const cardObject = new Card(
    {
      name: inputNameAdd.value,
      link: inputSource.value,
    },
    "#card-template"
  );

  const completedCard = cardObject.getCardElement();

  evt.preventDefault();
  galleryList.prepend(completedCard);
  closeModal(modalAdd);
  evt.target.reset();
  toggleButtonState(
    Array.from(addForm.querySelectorAll(".modal__input")),
    addFormSaveButton,
    configurationObject
  );
}

addForm.addEventListener("submit", handleAddFormSubmit);

// add cards to gallery on site load
initialCards.forEach((item) => {
  const cardObject = new Card(item, "#card-template");
  const completedCard = cardObject.getCardElement();
  galleryList.append(completedCard);
});

// enable validation for all forms

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
