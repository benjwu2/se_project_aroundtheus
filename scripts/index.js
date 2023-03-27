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
let modal = document.querySelector(".modal");
let closeButton = modal.querySelector(".modal__close-button");
let saveButton = modal.querySelector(".modal__save-button");
let inputName = modal.querySelector(".modal__input_type_name");
let inputTitle = modal.querySelector(".modal__input_type_description");
let form = modal.querySelector(".modal__container");

// save name and title elements
let name = document.querySelector(".profile__info-name-text");
let title = document.querySelector(".profile__title");

// event handler for save button event listener
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  name.textContent = inputName.value;
  title.textContent = inputTitle.value;

  modal.classList.remove("modal_opened");
}

editButton.addEventListener("click", function () {
  modal.classList.add("modal_opened");
  inputName.value = name.textContent;
  inputTitle.value = title.textContent;
});

closeButton.addEventListener("click", function () {
  modal.classList.remove("modal_opened");
});

form.addEventListener("submit", handleProfileFormSubmit);
