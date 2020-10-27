import MainApi from '../api/MainApi';
import Header from '../components/Header';
import SavedInfo from '../components/SavedInfo';
import SavedArticle from '../components/SavedArticle';
import ArticleList from '../components/SavedArticleList';
import mainConst from '../constants/main-constants';
import errorMessages from '../constants/error-messages';
import logout from '../utils/logout';
import keywordRating from '../utils/keywordRating';

import '../../pages/news.css';

const articleList = new ArticleList(document.querySelector('.results'));
const mainApi = new MainApi(
  mainConst.BASE_URL,
  mainConst.CONTENT_TYPE,
  errorMessages,
);

function newsLogout() {
  logout();
  checkAuthorization();
}
function checkAuthorization() {
  mainApi.getUserData()
    .then((json) => {
      const header = new Header(document.querySelector('.header'), true, newsLogout, json.data.name);
      header.render();
      mainApi.getArticles()
        .then((articlesJson) => {
          const savedInfo = new SavedInfo(document.querySelector('.saved-info'), json.data.name, keywordRating(articlesJson.data), articlesJson.data.length);
          savedInfo.render();
          renderArticles(articlesJson.data);
        })
    })
    .catch((err) => {
      window.location.replace('/');
    });
}
function createNewArticle(keyword, title, text, dateq, source, image, link, id, removeFromServer) {
  const article = new SavedArticle(keyword, title, text, dateq, source, image, link, id, removeFromServer);
  article.create();
  return article;
}
function removeArticle(id) {
  return mainApi.removeArticle(id);
}
function renderArticles(articles) {
  articles.forEach((article) => {
    articleList.addArticle(
      createNewArticle(
        article.keyword,
        article.title,
        article.text,
        article.date,
        article.source,
        article.image,
        article.link,
        article._id,
        removeArticle,
      ),
    );
  });
  articleList.renderResults();
}

checkAuthorization();
