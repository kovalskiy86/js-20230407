export default class InfinityTable {
  element;
  table;
  data = [];
  loading = false;
  step = 20;
  start = 1;
  end = 21;

  onWindowScroll = () => {
    const { bottom } = this.element.getBoundingClientRect();

    if (bottom < document.documentElement.clientHeight && !this.loading) {
      this.start = this.end;
      this.end = this.start + this.step;

      this.loading = true;
      this.dispatchEvent();
    }
  };

  constructor (table = {}, {
    data = [],
    step = 20,
    start = 1,
    end = start + step
  } = {}) {
    this.table = table;
    this.data = data;
    this.step = step;
    this.start = start;
    this.end = end;

    this.render();
    this.initEventListeners();
  }

  render () {
    this.element = document.createElement('div');
    this.element.append(this.table.element);
  }

  addRows (data) {
    this.table.update(data);
    this.loading = false;
  }

  update (data) {
    this.table.renderTableBody(data);
    this.loading = false;
  }

  resetPagination () {
    this.start = 1;
    this.end = this.start + this.step;
  }

  dispatchEvent () {
    this.element.dispatchEvent(new CustomEvent('load-data', {
      bubbles: true,
      detail: {
        start: this.start,
        end: this.end
      }
    }));
  }

  initEventListeners () {
    document.addEventListener('scroll', this.onWindowScroll);
  }

  remove () {
    this.element.remove();
    document.removeEventListener('scroll', this.onWindowScroll);
  }

  destroy () {
    this.remove();
    this.element = null;
    this.table = null;
    this.data = [];
    this.loading = false;
  }
}
