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

let editButton = document.querySelector(".profile__edit-button");
let modalEdit = document.querySelector(".modal_type_edit");
let closeButtons = document.querySelectorAll(".modal__close-button");
let inputName = modalEdit.querySelector(".modal__input_type_name");
let inputTitle = modalEdit.querySelector(".modal__input_type_description");
let form = modalEdit.querySelector(".modal__form");
let cardTemplate = document.querySelector("#card-template").content;
let galleryList = document.querySelector(".gallery__item-list");
let modals = document.querySelectorAll(".modal");

// objects for the add modal
let modalAdd = document.querySelector(".modal_type_add");
let addButton = document.querySelector(".profile__add-button");

// save name and title elements
let name = document.querySelector(".profile__info-name-text");
let title = document.querySelector(".profile__title");

// event handler for save button event listener
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  name.textContent = inputName.value;
  title.textContent = inputTitle.value;

  modalEdit.classList.remove("modal_opened");
}

// event handler for the add button event listener
const handleAddButtonClick = () => modalAdd.classList.add("modal_opened");
addButton.addEventListener("click", handleAddButtonClick);

// adding event listener to close button of the add modal

function getCardElement(data) {
  let cardElement = cardTemplate.cloneNode(true);
  let cardTitle = cardElement.querySelector(".card__info-text");
  let cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

function openModal() {
  modalEdit.classList.add("modal_opened");
  inputName.value = name.textContent;
  inputTitle.value = title.textContent;
}

// event handler for the close button click event listener
// function checks all modals for the modal_opened class and removes it if it is present
// as only one modal can be open at a time, this should not be problematic
function closeModal() {
  modals.forEach((item) => {
    if (item.classList.contains("modal_opened")) {
      item.classList.remove("modal_opened");
    }
  });
}

editButton.addEventListener("click", openModal);

// adding the same event listener to the close buttons on both modals

closeButtons.forEach((item) => item.addEventListener("click", closeModal));

form.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((item) => {
  let completedCard = getCardElement(item);
  galleryList.append(completedCard);
});
