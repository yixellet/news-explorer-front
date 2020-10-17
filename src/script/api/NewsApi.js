export default class NewsApi {
  constructor(url, apiKey, from, to, pageSize) {
    this.url = url;
    this.apiKey = apiKey;
    this.from = from;
    this.to = to;
    this.pageSize = pageSize;
  }

  getNews(string) {
    return fetch(`${this.url}?from=${this.from}&to=${this.to}&pageSize=${this.pageSize}&q=${string}&apiKey=${this.apiKey}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('Ошибочкааааа'));
      });
  }
}
