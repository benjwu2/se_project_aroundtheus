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
let inputName = modal.querySelector(".modal__input_type_name");
let inputTitle = modal.querySelector(".modal__input_type_description");
let form = modal.querySelector(".modal__form");
let cardTemplate = document.querySelector("#card-template").content;
let galleryList = document.querySelector(".gallery__item-list");

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

function getCardElement(data) {
  let cardElement = cardTemplate.cloneNode(true);
  let cardTitle = cardElement.querySelector(".card__info-text");
  let cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
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

for (let i = 0; i < initialCards.length; i++) {
  let cardObject = initialCards[i];

  let completedCard = getCardElement(cardObject);
  galleryList.append(completedCard);
}
