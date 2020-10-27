import Popup from './Popup';

export default class InfoPopup extends Popup {
  constructor(popupId, openLoginPopup) {
    super(popupId);
    this.openLoginPopup = openLoginPopup;
    this.loginLink = this.popupElement.querySelector('.popup__login');
    this.setEventListeners();
  }

  close() {
    super.close();
  }

  setEventListeners = () => {
    super.setEventListeners();
    this.loginLink.addEventListener('click', () => {
      this.close();
      this.openLoginPopup();
    });
  }
}
