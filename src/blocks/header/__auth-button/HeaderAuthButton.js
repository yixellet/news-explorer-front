class HeaderAuthButton {
  constructor(button, openRegistrationPopup) {
    this.button = button;
    this.openRegistrationPopup = openRegistrationPopup;
  }

  setEventListeners() {
    this.button.addEventListener('click', this.openRegistrationPopup);
  }
}

module.exports = { HeaderAuthButton };
