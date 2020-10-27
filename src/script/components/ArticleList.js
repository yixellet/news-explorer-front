export default class ArticleList {
  /**
   * @param {DOMElement} container - DOM-элемент
   * для отображения результатов результатов поиска
   * или сообщений с ними связанных
   */
  constructor(container) {
    this.container = container;
    this.articles = [];
    this.count = 3;
    this.showMore = this.showMore.bind(this);
  }

  addArticle(article) {
    this.articles.push(article);
  }

  clearArray() {
    this.articles.splice(0, this.articles.length);
  }

  addToContainer(start, end) {
    this.articles.slice(start, end).forEach((article) => {
      this.resultsList.appendChild(article.articleContainer);
    });
    this.count = end;
  }

  renderSection() {
    this.container.classList.remove('results_hide');
  }

  renderResults() {
    this.clearContainer();
    this.container.insertAdjacentHTML('beforeend', `
      <div class="results__block">
        <h3 class="title">Результаты поиска</h3>
        <ul class="results__list results__list_index"></ul>
        <button class="results__more">Показать ещё</button>
      </div>`);
    this.resultsList = this.container.querySelector('.results__list');
    this.buttonMore = this.container.querySelector('.results__more');
    this.addToContainer(0, this.count);
    this.renderSection();
    this.buttonMore.addEventListener('click', this.showMore);
  }

  renderLoader() {
    this.clearContainer();
    this.container.insertAdjacentHTML('beforeend', `
    <div class="preloader">
      <i class="preloader__circle"></i>
      <p class="preloader__text">Идёт поиск новостей...</p>
    </div>`);
    this.renderSection();
  }

  renderError() {
    this.clearContainer();
    this.container.insertAdjacentHTML('beforeend', `
    <p class="results__error">Во время запроса произошла ошибка. 
        Возможно, проблема с соединением или сервер недоступен. 
        Подождите немного и попробуйте ещё раз.</p>`);
    this.renderSection();
  }

  renderNotFound() {
    this.clearContainer();
    this.container.insertAdjacentHTML('beforeend', `
      <div class="not-found">
          <div class="not-found__image"></div>
          <h4 class="not-found__title">Ничего не найдено</h4>
          <p class="not-found__subtitle">К сожалению, по вашему запросу ничего не найдено.</p>
      </div>`);
    this.renderSection();
  }

  showMore() {
    this.addToContainer(this.count + 1, this.count + 4);
    if (this.count >= this.articles.length) {
      this.buttonMore.classList.add('results__more_hide');
      this.buttonMore.removeEventListener('click', this.showMore);
    }
  }

  clearContainer() {
    if (this.container.firstElementChild !== null) {
      this.container.removeChild(this.container.firstElementChild);
    }
  }
}
