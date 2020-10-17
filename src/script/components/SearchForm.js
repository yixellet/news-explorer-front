export default class SearchForm {
  constructor(form, search) {
    this.form = form;
    this.search = search;
    this.submit = this.submit.bind(this);
    this.setEventListeners();
  }

  submit(event) {
    event.preventDefault();
    this.search(this.form.elements.q.value);
    this.form.reset();
  }

  setEventListeners() {
    this.form.addEventListener('submit', this.submit);
  }
}
