export default class ArticleList {
  constructor(container) {
    this.container = container;
    this.articles = [];
  }

  addArticle(article) {
    this.articles.push(article);
  }

  addToContainer(article) {
    this.container.appendChild(article.articleContainer);
  }

  render() {
    this.articles.forEach((article) => {
      this.addToContainer(article);
    });
  }
}
