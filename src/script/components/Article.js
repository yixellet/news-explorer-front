export default class Article {
  constructor(title, text, date, source, image, link, sourc, save, remove) {
    this.title = title;
    this.text = text;
    this.date = date;
    this.source = source;
    this.image = image;
    this.link = link;
    this.sourc = sourc;
    this.save = save;
    this.remove = remove;
    this.create = this.create.bind(this);
    this.save = this.save.bind(this);
  }

  create() {
    const article = document.createElement('li');
    article.classList.add('results__item');
    article.insertAdjacentHTML('beforeend', `
    <a href=${this.link} target="blank" class="result">
      <div class="result__image"></div>
      <div class="result__content">
        <p class="result__date">${this.date}</p>
        <h4 class="result__title">${this.title}</h4>
        <p class="result__text">${this.text}</p>
        <p class="result__source">${this.source}</p>
      </div>
      <div class="result__action">
        <button class="result__action-button"></button>
        <div class="result__action-tip">Подсказочка</div>
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
    article.querySelector('.result__image').style.backgroundImage = `url(${this.image})`;

    this.articleContainer = article;
    this.setEventListeners();
    return article;
  }

  renderIcon() {

  }

  save(event) {
    this.articleContainer.querySelector('.result__action-button').classList.toggle('result__action-button_save');
    this.articleContainer.querySelector('.result__action-button').classList.toggle('result__action-button_saved');
    event.preventDefault();
  }

  setEventListeners() {
    this.articleContainer.querySelector('.result__action-button').addEventListener('click', this.save);
  }
}
