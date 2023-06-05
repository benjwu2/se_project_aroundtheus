import { handleImageClick } from "../utils/utils.js";

export class Card {
  constructor(data, templateSelector) {
    this._description = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(`${this._templateSelector}`)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", handleImageClick);

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", (evt) => {
        _handleDeleteButtonClick(evt);
      });

    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", (evt) => {
        _handleLikeButtonClick(evt);
      });
  }

  _handleDeleteButtonClick(evt) {
    evt.target.closest(".card").replaceWith();
  }

  _handleLikeButtonClick(evt) {
    evt.target.classList.toggle("card__like-button_clicked");
  }

  getCardElement() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._setEventListeners();

    //card description
    this._cardElement.querySelector(".card__info-text").textContent =
      this._description;

    //image
    this._cardImage.src = this._link;
    this._cardImage.alt = this._description;

    return this._cardElement;
  }
}
