import Article from './Article';

export default class SavedArticle extends Article {
  constructor(keyword, title, text, date, source, image, link, id, removeFromServer) {
    super(keyword, title, text, date, source, image, link);
    this.id = id;
    this.removeFromServer = removeFromServer;
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
  }

  create() {
    const article = document.createElement('li');
    article.classList.add('results__item');
    article.insertAdjacentHTML('beforeend', `
    <a href=${this.link} target="blank" class="result">
      <div class="result__image"></div>
      <div class="result__keyword">${this.keyword[0].toUpperCase() + this.keyword.slice(1)}</div>
      <div class="result__content">
        <p class="result__date">${this.date}</p>
        <h4 class="result__title">${this.title}</h4>
        <p class="result__text">${this.text}</p>
        <p class="result__source">${this.source}</p>
      </div>
      <div class="result__action">
        <button class="result__action-button result__action-button_delete"></button>
        <div class="result__action-tip">Убрать из сохранённых</div>
      </div>
    </a>`);
    this.articleContainer = article;
    this.actionButton = this.articleContainer.querySelector('.result__action-button');
    if (this.image) {
      article.querySelector('.result__image').style.backgroundImage = `url(${this.image})`;
    };
    this.actionButton.addEventListener('click', this.remove);
    return article;
  }

  remove(event) {
    this.removeFromServer(this.id)
      .then(() => {
        this.articleContainer.removeAttribute('uid')
      });
    this.articleContainer.remove();
    event.preventDefault();
  }
}
