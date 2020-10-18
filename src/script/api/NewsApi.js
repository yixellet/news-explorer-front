export default class NewsApi {
  constructor(url, apiKey, from, to, pageSize, error) {
    this.url = url;
    this.apiKey = apiKey;
    this.from = from;
    this.to = to;
    this.pageSize = pageSize;
    this.error = error;
  }

  getNews(string) {
    return fetch(`${this.url}?from=${this.from}&to=${this.to}&pageSize=${this.pageSize}&q=${string}&apiKey=${this.apiKey}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return this.error;
      });
  }
}
