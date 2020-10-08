export default class Header {
  constructor(container, theme) {
    this.container = container;
    this.theme = theme;
    this.menuButton = container.querySelector('.header__menu-button');
    this.navigation = container.querySelector('.navigation');
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
  }

  showMenu() {
    this.container.classList.add(`header_theme_${this.theme}`);
    this.navigation.classList.add('navigation_visible');
    this.navigation.classList.remove('navigation_hide');
    this.menuButton.classList.add(`header__menu-button_close_theme_${this.theme}`);
    this.menuButton.classList.remove(`header__menu-button_open_theme_${this.theme}`);
    this.menuButton.addEventListener('click', this.hideMenu);
    this.menuButton.removeEventListener('click', this.showMenu);
  }

  hideMenu() {
    this.container.classList.remove('header_theme_black');
    this.navigation.classList.remove('navigation_visible');
    this.navigation.classList.add('navigation_hide');
    this.menuButton.classList.remove(`header__menu-button_close_theme_${this.theme}`);
    this.menuButton.classList.add(`header__menu-button_open_theme_${this.theme}`);
    this.menuButton.removeEventListener('click', this.hideMenu);
    this.setEventListeners();
  }

  setEventListeners() {
    this.menuButton.addEventListener('click', this.showMenu);
  }
}
