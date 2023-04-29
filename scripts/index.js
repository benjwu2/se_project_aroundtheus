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

const modalEdit = document.querySelector("#edit-modal");
const editForm = modalEdit.querySelector("#edit-form");
const editButton = document.querySelector(".profile__edit-button");
const closeButtons = document.querySelectorAll(".modal__close-button");
const inputNameEdit = modalEdit.querySelector(".modal__input_type_name-edit");
const inputTitle = modalEdit.querySelector(".modal__input_type_description");
const cardTemplate = document.querySelector("#card-template").content;
const galleryList = document.querySelector(".gallery__item-list");
const modals = document.querySelectorAll(".modal");

// objects for the add modal
const modalAdd = document.querySelector("#add-modal");
const addButton = document.querySelector(".profile__add-button");
const addForm = document.querySelector("#add-form");
const inputNameAdd = document.querySelector(".modal__input_type_name-add");
const inputSource = document.querySelector(".modal__input_type_src");

// save profile name and title elements
const name = document.querySelector(".profile__info-name-text");
const title = document.querySelector(".profile__title");

// set value of edit form fields to match profile content
inputNameEdit.value = name.textContent;
inputTitle.value = title.textContent;

// open and close modal functions
const openModal = (popup) => {
  popup.classList.add("modal_opened");
};

// for closing add and edit modals on form submission
const closeModal = (popup) => {
  popup.classList.remove("modal_opened");
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

// image modal
const modalImage = document.querySelector("#image-modal");

function handleImageClick(evt) {
  const eventTarget = evt.target;
  const image = document.querySelector(".modal__image");
  const imageDescription = document.querySelector(".modal__image-description");

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

  modalEdit.classList.remove("modal_opened");
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
