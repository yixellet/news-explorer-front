import Popup from './Popup';

export default class LoginPopup extends Popup {
  constructor(popupId, resetErrors, sendToServer, openRegistrationPopup) {
    super(popupId);
    this.resetErrors = resetErrors;
    this.sendToServer = sendToServer;
    this.openRegistrationPopup = openRegistrationPopup;
    this.form = this.popupElement.querySelector('.popup__form');
    this.loginLink = this.popupElement.querySelector('.popup__login');
    this.open = this.open.bind(this);
    this.submit = this.submit.bind(this);
    this.setEventListeners();
  }

  open() {
    this.form.reset();
    this.resetErrors();
    super.open();
  }

  openWithError() {
    this.form.reset();
    this.resetErrors();
    this.form.querySelector('#error-userexists').textContent = 'Пользователь не найден';
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
    );
  }

  setEventListeners = () => {
    super.setEventListeners();
    this.form.addEventListener('submit', this.submit);
    this.loginLink.addEventListener('click', () => {
      this.close();
      this.openRegistrationPopup();
    });
  }
}
