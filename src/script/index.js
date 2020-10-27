import Header from './components/Header';
import ArticleList from './components/ArticleList';
import Article from './components/Article';
import SearchForm from './components/SearchForm';
import RegistrationPopup from './components/RegistrationPopup';
import LoginPopup from './components/LoginPopup';
import InfoPopup from './components/InfoPopup';
import NewsApi from './api/NewsApi';
import MainApi from './api/MainApi';
import { dateToString, earlierDate, dateForDisplay } from './utils/DateConverter';
import FormValidator from './utils/FormValidator';
import logout from './utils/logout';
import newsConst from './constants/news-constants';
import mainConst from './constants/main-constants';
import errorMessages from './constants/error-messages';
import '../pages/index.css';

const articleList = new ArticleList(document.querySelector('.results'));
const currentDate = new Date();
const newsApi = new NewsApi(
  newsConst.URL,
  newsConst.APIKEY,
  earlierDate(currentDate, newsConst.DATEFROM),
  dateToString(currentDate),
  newsConst.PAGESIZE,
  articleList.renderError,
);
const mainApi = new MainApi(
  mainConst.BASE_URL,
  mainConst.CONTENT_TYPE,
  errorMessages,
);
const infoPopup = new InfoPopup(
  document.querySelector('#infoPopup'),
  openLoginPopup,
);
const loginPopup = new LoginPopup(
  document.querySelector('#loginPopup'),
  resetLoginErrors,
  signin,
  openRegistrationPopup,
);
const registrationPopup = new RegistrationPopup(
  document.querySelector('#registrationPopup'),
  resetRegistrationErrors,
  signup,
  openLoginPopup,
);
const registrationValidator = new FormValidator(registrationPopup.form, errorMessages);
const loginValidator = new FormValidator(loginPopup.form, errorMessages);
const searchForm = new SearchForm(document.forms.searchbar, search);

function signup(email, password, name) {
  mainApi.signup(email, password, name)
    .then(() => {
      registrationPopup.close();
      infoPopup.open();
    })
    .catch((err) => {
      registrationPopup.openWithError();
    });
}
function signin(email, password) {
  mainApi.signin(email, password)
    .then(() => {
      loginPopup.close();
      checkAuthorization();
    })
    .catch((err) => {
      loginPopup.openWithError();
    });;
}
function saveArticle(keyword, title, text, date, source, link, image) {
  return mainApi.createArticle(keyword, title, text, date, source, link, image);
}
function removeArticle(id) {
  return mainApi.removeArticle(id);
}
function resetRegistrationErrors() {
  registrationValidator.resetErrors();
}
function resetLoginErrors() {
  loginValidator.resetErrors();
}
function openLoginPopup() {
  loginPopup.open();
}
function openRegistrationPopup() {
  registrationPopup.open();
}
function checkAuthorization() {
  mainApi.getUserData()
    .then((json) => {
      const header = new Header(document.querySelector('.header'), true, logout, json.data.name, openRegistrationPopup);
      header.render();
    })
    .catch(() => {
      const header = new Header(document.querySelector('.header'), false, logout, '', openRegistrationPopup);
      header.render();
    });
}
function createNewArticle(keyword, title, text, dateq, source, image, link, saveToServer, removeFromServer) {
  const article = new Article(keyword, title, text, dateq, source, image, link, saveToServer, removeFromServer);
  article.create();
  return article;
}
function renderArticles(articles) {
  articleList.clearArray();
  articles.forEach((article) => {
    articleList.addArticle(
      createNewArticle(
        localStorage.getItem('keyword'),
        article.title,
        article.description,
        dateForDisplay(article.publishedAt),
        article.source.name,
        article.urlToImage === null ? 'https://via.placeholder.com/300' : article.urlToImage,
        article.url,
        saveArticle,
        removeArticle,
      ),
    );
  });
  articleList.renderResults();
}
function search(string) {
  articleList.renderLoader();
  return newsApi.getNews(string)
    .then((json) => {
      if (json.totalResults > 0) {
        renderArticles(json.articles);
      } else {
        articleList.renderNotFound();
      }
    })
    .catch(() => {
      articleList.renderError();
    });
}

checkAuthorization();
registrationValidator.setEventListeners();
loginValidator.setEventListeners();
