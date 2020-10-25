export default class SavedInfo {
  constructor(container, userName, keywordRating, articleCount) {
    this.container = container;
    this.userName = userName;
    this.keywordRating = keywordRating;
    this.articleCount = articleCount;
    this.title = this.container.querySelector('.saved-info__title');
    this.subtitle = this.container.querySelector('.saved-info__subtitle');
  }

  render() {
    if (this.articleCount === 0) {
      this.title.textContent = `${this.userName}, у вас нет сохранённых статей`;
    } else {
      this.title.textContent = `${this.userName}, у вас ${this.articleCount} сохранённых статей`;
      if (this.keywordRating.length === 1) {
        this.subtitle.innerHTML = `По ключевому слову: 
        <span class="saved-info__subtitle_accent">${this.keywordRating[0]}`;
      } else if (this.keywordRating.length === 2) {
        this.subtitle.innerHTML = `
        По ключевым словам: <span class="saved-info__subtitle_accent">
        ${this.keywordRating[0]}</span> и <span class="saved-info__subtitle_accent">
        ${this.keywordRating[1]}</span>`;
      } else if (this.keywordRating.length === 3) {
        this.subtitle.innerHTML = `
        По ключевым словам: <span class="saved-info__subtitle_accent">
      ${this.keywordRating[0]}</span>, <span class="saved-info__subtitle_accent">
      ${this.keywordRating[1]}</span> и <span class="saved-info__subtitle_accent">
      ${this.keywordRating[2]}</span>`;
      } else {
        this.subtitle.innerHTML = `
        По ключевым словам: <span class="saved-info__subtitle_accent">
        ${this.keywordRating[0]}</span>, <span class="saved-info__subtitle_accent">
        ${this.keywordRating[1]}</span> и <span class="saved-info__subtitle_accent">
        ${this.keywordRating.length - 2} другим</span>`;
      }
    }
  }
}
