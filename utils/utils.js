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
