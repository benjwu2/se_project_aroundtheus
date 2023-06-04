import {
  handleImageClick,
  handleDeleteButtonClick,
  handleLikeButtonClick,
} from "../utils/utils.js";

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
      .addEventListener("click", handleDeleteButtonClick);

    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", handleLikeButtonClick);
  }

  getCardElement() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();

    //card description
    this._cardElement.querySelector(".card__info-text").textContent =
      this._description;

    //image
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._description;

    return this._cardElement;
  }
}