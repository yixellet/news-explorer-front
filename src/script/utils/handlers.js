class BaseComponent {
  constructor(handlers) {
    this.handlers = handlers;
  }
}

class Article {
  constructor(handlers, container) {
    super(handlers);
    this.container = container;
  }
  save() {
    handlers[0]
  }
  remove() {
    handlers[1]
  }
}

const article = new Article([api.createArticle, api.removeArticle], container )