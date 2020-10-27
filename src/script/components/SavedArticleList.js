export default class ArticleList {
  /**
   * @param {DOMElement} container - DOM-элемент
   * для отображения результатов результатов поиска
   * или сообщений с ними связанных
   */
  constructor(container) {
    this.container = container;
    this.articles = [];
  }

  addArticle(article) {
    this.articles.push(article);
  }

  addToContainer() {
    this.articles.forEach((article) => {
      this.resultsList.appendChild(article.articleContainer);
    });
  }

  renderSection() {
    this.container.classList.remove('results_hide');
  }

  renderResults() {
    this.clearContainer();
    this.container.insertAdjacentHTML('beforeend', `
      <div class="results__block">
        <ul class="results__list results__list_index"></ul>
      </div>`);
    this.resultsList = this.container.querySelector('.results__list');
    this.addToContainer();
    this.renderSection();
  }

  clearContainer() {
    if (this.container.firstElementChild !== null) {
      this.container.removeChild(this.container.firstElementChild);
    }
  }
}
