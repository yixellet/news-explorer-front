export default class MainApi {
  constructor(baseUrl, contentType, authorization, errorMessage) {
    this.baseUrl = baseUrl;
    this.errorMessage = errorMessage;
    this.authorization = authorization;
    this.contentType = contentType;
  }

  parseResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(this.errorMessage));
  }

  signup(name, email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then(this.parseResponse);
  }

  signin(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
      });
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        authorization: `Bearer ${this.authorization}`,
      },
    })
      .then(this.parseResponse);
  }

  getArticles() {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        authorization: `Bearer ${this.authorization}`,
      },
    })
      .then(this.parseResponse);
  }

  createArticle(keyword, title, text, date, source, link, image) {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        authorization: `Bearer ${this.authorization}`,
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    })
      .then(this.parseResponse);
  }

  removeArticle(id) {
    return fetch(`${this.baseUrl}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': this.contentType,
        authorization: `Bearer ${this.authorization}`,
      },
    })
      .then(this.parseResponse);
  }
}
