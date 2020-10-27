export default class Article {
  constructor(keyword, title, text, date, source, image, link, saveToServer, removeFromServer) {
    this.keyword = keyword;
    this.title = title;
    this.text = text;
    this.date = date;
    this.source = source;
    this.image = image;
    this.link = link;
    this.saveToServer = saveToServer;
    this.removeFromServer = removeFromServer;
    this.create = this.create.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
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
        <button class="result__action-button result__action-button_save"></button>
        <div class="result__action-tip"></div>
      </div>
    </a>`);
    article.querySelector('.result__image').style.backgroundImage = `url(${this.image})`;
    this.articleContainer = article;
    this.actionButton = this.articleContainer.querySelector('.result__action-button');
    this.actionTip = this.articleContainer.querySelector('.result__action-tip');
    this.renderIcon();
    return article;
  }

  renderIcon() {
    if (!localStorage.getItem('token')) {
      this.actionTip.textContent = 'Войдите, чтобы сохранять статьи';
    } else {
      this.actionTip.textContent = 'Сохранить статью';
      this.actionButton.addEventListener('click', this.save);
    }
  }

  save(event) {
    this.actionButton.classList.remove('result__action-button_save');
    this.actionButton.classList.add('result__action-button_saved');
    this.saveToServer(this.keyword, this.title, this.text, this.date, this.source, this.link, this.image)
      .then((res) => {
        this.articleContainer.setAttribute('uid', res.data._id)
      });
      this.actionTip.textContent = 'Убрать из сохранённых';
    this.actionButton.addEventListener('click', this.remove);
    event.preventDefault();
  }

  remove(event) {
    this.actionButton.classList.add('result__action-button_save');
    this.actionButton.classList.remove('result__action-button_saved');
    this.removeFromServer(this.articleContainer.getAttribute('uid'))
      .then(() => {
        this.articleContainer.removeAttribute('uid')
      });
    this.renderIcon();
    event.preventDefault();
  }
}
