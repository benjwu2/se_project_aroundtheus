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

  setEventListeners() {
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

// the callback parameter is used to input the
// callback function for the submit event listener
export class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this.callback = callback;
  }

  _getInputValues() {
    const inputs = this.popup.querySelectorAll("input");

    // creates a dictionary of input name - value pairs
    const inputValues = {};
    inputs.forEach((item) => {
      inputValues[`${item.name}`] = item.value;
    });

    return inputValues;
  }

  setEventListeners() {
    this.popup.addEventListener(
      ("submit",
      (evt) => {
        evt.preventDefault();
        this.callback();
      })
    );
    super.setEventListeners();
  }
}
