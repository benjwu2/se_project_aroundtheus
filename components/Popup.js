export class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
  }

  open(popup) {
    this.popup.classList.add("modal_opened");
    document.setEventListener("keydown", handleEscapeKeyPress);
  }

  closeModal(popup) {
    popup.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleEscapeKeyPress);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      closeModal(document.querySelector(".modal_opened"));
    }
  }

  setEventListener() {
    this.popup
      .querySelector(".modal__close-button")
      .addEventListener("click", closeModal);
    this.popup.addEventListener("click", (evt) => {
      if (evt.target == this.popup) {
        this.closeModal(this.popup);
      }
    });
  }
}

export class PopupWithImage extends Popup {
  open(data) {
    this.popup.querySelector(".card__image").src = data.link;
    this.popup.querySelector(".card__image").alt = data.name;
    this.popup.querySelector(".card__image").text = data.name;
    super.open(this.popup);
  }
}
