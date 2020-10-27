export default class Popup {
  constructor(popupId) {
    this.popupElement = popupId;
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.setEventListeners();
  }

  open() {
    this.popupElement.classList.add('popup_is-opened');
  }

  close() {
    this.popupElement.classList.remove('popup_is-opened');
  }

  setEventListeners() {
    this.popupElement.querySelector('.popup__close').addEventListener('click', this.close);
  }
}
