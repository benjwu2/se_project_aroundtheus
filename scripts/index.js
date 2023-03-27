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
let closeButton = document.querySelector(".modal__close-button");

// save text of name and title elements
let name = document.querySelector(".profile__info-name-text").textContent;
let title = document.querySelector(".profile__title").textContent;

editButton.addEventListener("click", function () {
  modal.classList.add("modal_opened");

  // set values of input fields to text of name and title elements
  modal.querySelector(".modal__input_type_name").value = name;
  modal.querySelector(".modal__input_type_description").value = title;
});

closeButton.addEventListener("click", function () {
  modal.classList.remove("modal_opened");
});
