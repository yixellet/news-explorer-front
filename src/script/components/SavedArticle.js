import Article from './Article';

export default class SavedArticle extends Article {
  constructor(title, text, date, source, image, link, sourc, keyword) {
    super(title, text, date, source, image, link, sourc);
    this.keyword = keyword;
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  create() {
    const article = document.createElement('li');
    article.classList.add('results__item');
    article.insertAdjacentHTML('beforeend', `
    <a href=${this.link} target="blank" class="result">
      <div class="result__image"></div>
      <div class="result__keyword">${this.keyword}</div>
      <div class="result__content">
        <p class="result__date">${this.date}</p>
        <h4 class="result__title">${this.title}</h4>
        <p class="result__text">${this.text}</p>
        <p class="result__source">${this.source}</p>
      </div>
      <div class="result__action">
        <button class="result__action-button"></button>
        <div class="result__action-tip"></div>
      </div>
    </a>`);
    const actionButton = article.querySelector('.result__action-button');
    const actionTip = article.querySelector('.result__action-tip');
    if (this.sourc === 'search') {
      actionTip.textContent = 'Войдите, чтобы сохранять статьи';
      actionButton.classList.add('result__action-button_save');
    } else if (this.sourc === 'database') {
      actionTip.textContent = 'Убрать из сохраненных';
      actionButton.classList.add('result__action-button_delete');
    }
    article.querySelector('.result__image').getElementsByClassName.backgraundImage = `url(${this.image})`;

    this.articleContainer = article;
    this.setEventListeners();
    return article;
  }

  delete(event) {
    this.articleContainer.remove();
    event.preventDefault();
  }

  setEventListeners() {
    this.articleContainer.querySelector('.result__action-button').addEventListener('click', this.delete);
  }
}
