export default class SavedInfo {
  constructor(container, userName, keywords, articleCount) {
    this.container = container;
    this.userName = userName;
    this.keywords = keywords;
    this.articleCount = articleCount;
    this.title = this.container.querySelector('.saved-info__title');
    this.subtitle = this.container.querySelector('.saved-info__subtitle');
  }

  render() {
    this.title.textContent = `${this.userName}, у вас ${this.articleCount} сохранённых статей`;
    this.subtitle.innerHTML = `По ключевым словам: <span class="saved-info__subtitle_accent">${this.keywords[0]}</span>, <span class="saved-info__subtitle_accent">${this.keywords[1]}</span> и <span class="saved-info__subtitle_accent">${this.keywords.length - 2} другим</span>`;
  }
}
