import Header from './components/Header';
import ArticleList from './components/ArticleList';
import Article from './components/Article';
import SearchForm from './components/SearchForm';
import Popup from './components/Popup';
import NewsApi from './api/NewsApi';
import { dateToString, earlierDate, dateForDisplay } from './utils/DateConverter';

import newsConst from './constants/news-constants';

import '../pages/index.css';

const articleList = new ArticleList(document.querySelector('.results'));
const currentDate = new Date();
const newsApi = new NewsApi(
  newsConst.URL,
  newsConst.APIKEY,
  dateToString(currentDate),
  earlierDate(currentDate, newsConst.DATEFROM),
  newsConst.PAGESIZE,
  articleList.renderError,
);
const header = new Header(document.querySelector('.header'), false, 'Василий');
header.setEventListeners();
/*
const popup = new Popup(document.querySelector('#popup-template'));
popup.setContent(document.querySelector('#messagePopup-template'));
popup.open();
*/

function createNewArticle(title, text, dateq, source, image, link, sourc) {
  const article = new Article(title, text, dateq, source, image, link, sourc);
  article.create();
  return article;
}
function renderArticles(articles) {
  articles.forEach((article) => {
    articleList.addArticle(
      createNewArticle(
        article.title,
        article.description,
        dateForDisplay(article.publishedAt),
        article.source.name,
        article.urlToImage,
        article.url,
        'search',
      ),
    );
  });
  articleList.renderResults();
}
function search(string) {
  return newsApi.getNews(string)
    .then((json) => {
      if (json.totalResults > 0) {
        renderArticles(json.articles);
      } else {
        articleList.renderNotFound();
      }
    });
}

const searchForm = new SearchForm(document.forms.searchbar, search);
