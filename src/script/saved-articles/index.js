import MainApi from '../api/MainApi';
import Header from '../components/Header';
import SavedInfo from '../components/SavedInfo';
import SavedArticle from '../components/SavedArticle';
import ArticleList from '../components/ArticleList';
import mainConstants from '../constants/main-constants';
import messages from '../constants/error-messages';

import '../../pages/news.css';
/*
if (localStorage.getItem('token')) {
  const mainApi = new MainApi(
    mainConstants.BASE_URL,
    mainConstants.CONTENT_TYPE,
    localStorage.getItem('token'),
    messages.SERVER_ERROR,
  );
} else {
  document.location.href = 'https://owg.students.nomoreparties.co';
}
*/
const mainApi = new MainApi(
  mainConstants.BASE_URL,
  mainConstants.CONTENT_TYPE,
  localStorage.getItem('token'),
  messages.SERVER_ERROR,
);
const header = new Header(document.querySelector('.header'));
header.setEventListeners();
const savedInfo = new SavedInfo(document.querySelector('.saved-info'), 'Александра', ['природа', 'тайга', 'парки'], 56);
savedInfo.render();
const articleList = new ArticleList(document.querySelector('.results__list'));

function createNewArticle(title, text, date, source, image, link, sourc, keyword) {
  const article = new SavedArticle(title, text, date, source, image, link, sourc, keyword);
  article.create();
  return article;
}

mainApi.getArticles().then((res) => {
  res.forEach((article) => {
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
});
