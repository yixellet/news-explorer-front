import Header from '../blocks/header/header';
import SavedInfo from '../blocks/saved-info/SavedInfo';
import SavedArticle from '../blocks/result/SavedArticle';
import ArticleList from '../blocks/results/ArticleList';

import initialArticles from './testContent';

import '../pages/news.css';

const header = new Header(document.querySelector('.header', 'dark'));
header.setEventListeners();

const savedInfo = new SavedInfo(document.querySelector('.saved-info'), 'Александра', ['природа', 'тайга', 'парки'], 56);
savedInfo.render();

const articleList = new ArticleList(document.querySelector('.results__list'));

function createNewArticle(title, text, date, source, image, link, sourc, keyword) {
  const article = new SavedArticle(title, text, date, source, image, link, sourc, keyword);
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
      'database',
      article.keyword,
    ),
  );
});
articleList.render();
