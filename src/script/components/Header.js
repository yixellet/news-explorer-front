export default class Header {
  constructor(container, isLoggedIn, logout, userName, openRegistrationPopup) {
    this.container = container;
    this.isLoggedIn = isLoggedIn;
    this.logout = logout;
    this.userName = userName;
    this.openRegistrationPopup = openRegistrationPopup;
    this.menuButton = container.querySelector('.header__menu-button');
    this.navigation = container.querySelector('.navigation');
    this.background = container.querySelector('.header__background');
    this.overlay = container.querySelector('.navigation__overlay');
    this.savedNews = container.querySelector('#menu_saved-news');
    this.regButton = container.querySelector('#regButton');
    this.logoutButton = container.querySelector('#logoutButton');
    this.loginRender = this.loginRender.bind(this);
    this.logoutRender = this.logoutRender.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
  }

  render() {
    if (!this.isLoggedIn) {
      this.logoutRender();
    } else {
      this.loginRender();
    }
    this.setEventListeners();
  }

  loginRender() {
    this.savedNews.classList.add('navigation__item_show');
    this.savedNews.classList.remove('navigation__item_hide');
    this.logoutButton.textContent = this.userName;
    this.logoutButton.classList.remove('header__auth-button_hide');
    this.regButton.classList.add('header__auth-button_hide');
    this.logoutButton.addEventListener('click', () => {
      this.logout();
      this.logoutRender();
    });
  }

  logoutRender() {
    this.savedNews.classList.remove('navigation__item_show');
    this.savedNews.classList.add('navigation__item_hide');
    this.logoutButton.classList.add('header__auth-button_hide');
    this.regButton.classList.remove('header__auth-button_hide');
    this.regButton.addEventListener('click', this.openRegistrationPopup);
  }

  showMenu() {
    this.overlay.classList.remove('navigation__overlay_hide');
    this.background.classList.remove('header__background_hide');
    this.navigation.classList.add('navigation_visible');
    this.navigation.classList.remove('navigation_hide');
    this.menuButton.classList.add('header__menu-button_close');
    this.menuButton.classList.remove('header__menu-button_open');
    this.menuButton.addEventListener('click', this.hideMenu);
    this.menuButton.removeEventListener('click', this.showMenu);
  }

  hideMenu() {
    this.overlay.classList.add('navigation__overlay_hide');
    this.background.classList.add('header__background_hide');
    this.navigation.classList.remove('navigation_visible');
    this.navigation.classList.add('navigation_hide');
    this.menuButton.classList.remove('header__menu-button_close');
    this.menuButton.classList.add('header__menu-button_open');
    this.menuButton.removeEventListener('click', this.hideMenu);
    this.setEventListeners();
  }

  setEventListeners() {
    this.menuButton.addEventListener('click', this.showMenu);
  }
}
