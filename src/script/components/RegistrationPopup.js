import Popup from './Popup';

export default class RegistrationPopup extends Popup {
  constructor(popupId, resetErrors, sendToServer, openLoginPopup) {
    super(popupId);
    this.resetErrors = resetErrors;
    this.sendToServer = sendToServer;
    this.openLoginPopup = openLoginPopup;
    this.form = this.popupElement.querySelector('.popup__form');
    this.loginLink = this.popupElement.querySelector('.popup__login');
    this.open = this.open.bind(this);
    this.submit = this.submit.bind(this);
  }

  open() {
    this.form.reset();
    this.resetErrors();
    this.setEventListeners();
    super.open();
  }

  openWithError() {
    this.form.reset();
    this.resetErrors();
    this.form.querySelector('#error-userexists').textContent = 'Пользователь с таким email уже существует';
    this.setEventListeners();
    super.open();
  }

  close() {
    super.close();
  }

  submit(event) {
    event.preventDefault();
    this.sendToServer(
      this.form.elements.email.value,
      this.form.elements.password.value,
      this.form.elements.username.value,
    );
  }

  setEventListeners = () => {
    super.setEventListeners();
    this.form.addEventListener('submit', this.submit);
    this.loginLink.addEventListener('click', () => {
      this.close();
      this.openLoginPopup();
    });
  }
}
