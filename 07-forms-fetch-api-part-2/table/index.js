export default class Table {
  data = [];

  constructor(
    from,
    to
  ) {
    this.render();
    this.update(from, to);
  }

  render () {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `
      <div>
        Hello from component!
        Header
        <ul data-element="body">
          ${this.getBody()}
        </ul>
        Footer
      </div>
    `;

    this.element = wrapper.firstElementChild;
  }

  async update (from, to) {
    this.data = await this.loadData(from, to);

    const body = this.element.querySelector("[data-element='body']");

    body.innerHTML = this.getBody();
  }

  getBody () {
    return this.data.map(item => {
      return `<li>${item.id}</li>`
    }).join('');
  }

  async loadData (from, to) {
    const url = new URL('https://course-js.javascript.ru/api/dashboard/bestsellers');

    url.searchParams.set('_start', 0);
    url.searchParams.set('_end', 30);
    url.searchParams.set('_order', 'asc');
    url.searchParams.set('_sort', 'title');
    url.searchParams.set('from', from.toISOString());
    url.searchParams.set('to', to.toISOString());

    const response = await fetch(url.toString());

    return await response.json();
  }
}
