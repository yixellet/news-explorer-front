import Header from '../blocks/header/header';
import ArticleList from '../blocks/results/ArticleList';
import Article from '../blocks/result/Article';

import initialArticles from './testContent';

import '../pages/index.css';

const header = new Header(document.querySelector('.header'), 'white');
header.setEventListeners();

const articleList = new ArticleList(document.querySelector('.results__list'));

function createNewArticle(title, text, date, source, image, link, sourc) {
  const article = new Article(title, text, date, source, image, link, sourc);
  article.create();
  return article;
}

initialArticles.forEach((article) => {
  articleList.addArticle(
    createNewArticle(
      article.title,
      article.text,
      article.date,
      article.source,
      article.image,
      article.link,
      'search',
    ),
  );
});
articleList.render();
