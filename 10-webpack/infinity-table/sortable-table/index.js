export default class SortableTable {
  element;
  subElements = {};

  headersConfig = [];
  data = [];
  isSortLocally = false;

  onSortClick = event => {
    const column = event.target.closest('[data-sortable="true"]');
    const toggleOrder = order => {
      const orders = {
        asc: 'desc',
        desc: 'asc'
      };

      return orders[order];
    };

    if (column) {
      const { id, order } = column.dataset;
      const newOrder = toggleOrder(order);

      column.dataset.order = newOrder;
      column.append(this.subElements.arrow);

      if (this.isSortLocally) {
        this.sortLocally(id, newOrder);
      }

      this.dispatchEvent(id, newOrder);
    }
  };

  constructor (headersConfig, {
    data = [],
    sorted = {
      id: headersConfig.find(item => item.sortable).id,
      order: 'asc'
    },
    isSortLocally = false
  } = {}) {
    this.headersConfig = headersConfig;
    this.data = data;
    this.sorted = sorted;
    this.isSortLocally = isSortLocally;

    this.render();
  }

  sortLocally (id, order) {
    const sortedData = this.sortData(id, order);
    this.subElements.body.innerHTML = this.getTableBody(sortedData);
  }

  renderTableBody (data) {
    this.subElements.body.innerHTML = this.getTableBody(data);
  }

  dispatchEvent (id, order) {
    this.element.dispatchEvent(new CustomEvent('sort-table', {
      bubbles: true,
      detail: {
        id,
        order
      }
    }));
  }

  getTableHeader () {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.headersConfig.map(item => this.getHeaderRow(item)).join('')}
    </div>`;
  }

  getHeaderRow ({id, title, sortable}) {
    const order = this.sorted.id === id ? this.sorted.order : 'asc';

    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${order}">
        <span>${title}</span>
        ${this.getHeaderSortingArrow(id)}
      </div>
    `;
  }

  getHeaderSortingArrow (id) {
    const isOrderExist = this.sorted.id === id ? this.sorted.order : '';

    return isOrderExist
      ? `<span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>`
      : '';
  }

  getTableBody (data) {
    return `<div data-element="body" class="sortable-table__body">
      ${this.getTableRows(data)}
    </div>`;
  }

  getTableRows (data) {
    return data.map(item => `
      <div class="sortable-table__row">
        ${this.getTableRow(item, data)}
      </div>`
    ).join('');
  }

  getTableRow (item) {
    const cells = this.headersConfig.map(({id, template}) => {
      return {
        id,
        template
      };
    });

    return cells.map(({id, template}) => {
      return template
        ? template(item[id])
        : `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join('');
  }

  getTable (data) {
    return `<div class="sortable-table">
      ${this.getTableHeader()}
      ${this.getTableBody(data)}
    </div>`;
  }

  render () {
    const $wrapper = document.createElement('div');
    const sortedData = this.sortData(this.sorted.id);

    $wrapper.innerHTML = this.getTable(sortedData);

    const element = $wrapper.firstElementChild;

    this.element = element;
    this.subElements = this.getSubElements(element);

    this.initEventListeners();
  }

  sortData (field, order) {
    const arr = [...this.data];
    const column = this.headersConfig.find(item => item.id === field);
    const { sortType, sort } = column;
    const direction = order === 'asc' ? 1 : -1;

    return arr.sort((a, b) => {
      switch (sortType) {
      case 'number':
        return direction * (a[field] - b[field]);
      case 'string':
        return direction * a[field].localeCompare(b[field]);
      case 'custom':
        return direction * sort(a[column.id], b[column.id]);
      default:
        return direction * (a[field] - b[field]);
      }
    });
  }

  initEventListeners () {
    this.subElements.header.addEventListener('pointerdown', this.onSortClick);
  }

  getSubElements (element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  update (data) {
    const rows = document.createElement('div');

    this.data = [...this.data, ...data];
    rows.innerHTML = this.getTableRows(data);

    this.subElements.body.append(...rows.childNodes);
  }

  remove () {
    this.element.remove();
  }

  destroy () {
    this.remove();
    this.element = {};
    this.subElements = {};
  }
}
