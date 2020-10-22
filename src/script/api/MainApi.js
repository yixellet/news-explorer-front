export default class MainApi {
  constructor(baseUrl, contentType, errorMessage) {
    this.baseUrl = baseUrl;
    this.errorMessage = errorMessage;
    this.contentType = contentType;
  }

  parseResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(this.errorMessage.SERVER_ERROR));
  }

  signup(emailq, passwordq, nameq) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
      },
      credentials: 'include',
      body: JSON.stringify({
        name: nameq,
        email: emailq,
        password: passwordq,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        const json = response.json();
        return json.then(Promise.reject.bind(Promise));
      })
      .catch((err) => {
        throw err;
      });
  }

  signin(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('token', data.jwt);
      });
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      const json = response.json();
      return json.then(Promise.reject.bind(Promise));
    })
    .catch((err) => {
      throw err;
    });
  }

  getArticles() {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(this.parseResponse);
  }

  createArticle(keyword, title, text, date, source, link, image) {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        authorization: `Bearer ${localStorage.getItem('token')}`,
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
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(this.parseResponse);
  }
}
