export default class Popup {
  constructor(container) {
    this.container = container;
    this.close = this.close.bind(this);
  }

  setContent(contentMarkup) {
    this.container.insertAdjacentHTML('beforeend', contentMarkup);
  }

  clearContent() {
    this.container.removeChild(this.container.firstChild);
  }

  open() {
    this.closeButton = this.container.querySelector('.popup__close');
    this.container.classList.add('popup_is-opened');
    this.closeButton.setEventListener('click', this.close);
  }

  close() {
    this.closeButton = this.container.querySelector('.popup__close');
    this.container.classList.remove('popup_is-opened');
    this.closeButton.removeEventListener('click', this.close);
  }
}
