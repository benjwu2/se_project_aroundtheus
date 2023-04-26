let initialCards = [
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

let modalEdit = document.querySelector("#edit-modal");
let editForm = modalEdit.querySelector("#edit-form");
let editButton = document.querySelector(".profile__edit-button");
let closeButtons = document.querySelectorAll(".modal__close-button");
let inputNameEdit = modalEdit.querySelector(".modal__input_type_name-edit");
let inputTitle = modalEdit.querySelector(".modal__input_type_description");
let cardTemplate = document.querySelector("#card-template").content;
let galleryList = document.querySelector(".gallery__item-list");
let modals = document.querySelectorAll(".modal");

// objects for the add modal
let modalAdd = document.querySelector("#add-modal");
let addButton = document.querySelector(".profile__add-button");
let addForm = document.querySelector("#add-form");
let inputNameAdd = document.querySelector(".modal__input_type_name-add");
let inputSource = document.querySelector(".modal__input_type_src");

// event handler for the add modal submit event listener
function handleAddFormSubmit(evt) {
  let cardElement = cardTemplate.cloneNode(true);
  let cardTitle = cardElement.querySelector(".card__info-text");
  let cardImage = cardElement.querySelector(".card__image");
  let cardCloseButton = cardElement.querySelector(".card__delete-button");

  evt.preventDefault();

  cardImage.src = inputSource.value;
  cardImage.alt = inputNameAdd.value;
  cardTitle.textContent = inputNameAdd.value;

  // add an event listener to the delete button as only the delete buttons of pre-loaded cards have event listeners
  cardCloseButton.addEventListener("click", handleDeleteButtonClick);

  galleryList.prepend(cardElement);
  modalAdd.classList.remove("modal_opened");

  inputNameAdd.value = "";
  inputSource.value = "";
}

addForm.addEventListener("submit", handleAddFormSubmit);

// adding cards
function getCardElement(data) {
  let cardElement = cardTemplate.cloneNode(true);
  let cardTitle = cardElement.querySelector(".card__info-text");
  let cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

initialCards.forEach((item) => {
  let completedCard = getCardElement(item);
  galleryList.append(completedCard);
});

// picture modal
let cardImages = document.querySelectorAll(".card__image");
let modalImage = document.querySelector("#image-modal");

const handleImageClick = (evt) => {
  let eventTarget = evt.target;
  let image = document.querySelector(".modal__image");
  let imageDescription = document.querySelector(".modal__image-description");

  image.src = eventTarget.src;
  imageDescription.textContent = eventTarget.alt;
  image.alt = evt.target.nextSibling.textContent;

  modalImage.classList.add("modal_opened");
};

cardImages.forEach((item) => {
  item.addEventListener("click", handleImageClick);
});

// delete button
let deleteButtons = document.querySelectorAll(".card__delete-button");

const handleDeleteButtonClick = (evt) => evt.target.parentElement.replaceWith();

deleteButtons.forEach((item) => {
  item.addEventListener("click", handleDeleteButtonClick);
});

// like button
let likeButtons = document.querySelectorAll(".card__like-button");

const handleLikeButtonClick = (evt) => {
  evt.target.classList.toggle("card__like-button_clicked");
};

likeButtons.forEach((item) => {
  item.addEventListener("click", handleLikeButtonClick);
});

// save name and title elements
let name = document.querySelector(".profile__info-name-text");
let title = document.querySelector(".profile__title");

// event handler for edit button event listener
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  name.textContent = inputNameEdit.value;
  title.textContent = inputTitle.value;

  modalEdit.classList.remove("modal_opened");
}

editForm.addEventListener("submit", handleProfileFormSubmit);

// event handler for the add button event listener
const handleAddButtonClick = () => modalAdd.classList.add("modal_opened");
addButton.addEventListener("click", handleAddButtonClick);

// modal open and close event handlers
function openModal() {
  modalEdit.classList.add("modal_opened");
  inputNameEdit.value = name.textContent;
  inputTitle.value = title.textContent;
}

const closeModal = (evt) => {
  evt.target.closest(".modal").classList.remove("modal_opened");
};

editButton.addEventListener("click", openModal);

// adding the same event listener to the close buttons on all modals

closeButtons.forEach((item) => item.addEventListener("click", closeModal));
