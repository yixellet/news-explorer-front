export default class Header {
  constructor(container, isLoggedIn, userName) {
    this.container = container;
    this.isLoggedIn = isLoggedIn;
    this.userName = userName;
    this.menuButton = container.querySelector('.header__menu-button');
    this.navigation = container.querySelector('.navigation');
    this.background = container.querySelector('.header__background');
    this.overlay = container.querySelector('.navigation__overlay');
    this.savedNews = container.querySelector('#menu_saved-news');
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.render();
  }

  render() {
    if (this.isLoggedIn === false) {
      this.savedNews.classList.add('navigation__item_hide');
    }
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
