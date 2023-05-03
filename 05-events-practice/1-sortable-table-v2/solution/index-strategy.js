export default class SortableTable {
  element;
  subElements = {};

  onSortClick = event => {
    const column = event.target.closest('[data-sortable="true"]');

    const toggleOrder = order => {
      const orders = {
        asc: 'desc',
        desc: 'asc',
      };

      return orders[order];
    };

    if (column) {
      const { id, order } = column.dataset;
      const newOrder = toggleOrder(order); // undefined
      const { sortType } = this.headerConfig.find(item => item.id === id);

      const update = this.sortingStrategy({
        id,
        sortType,
        order: newOrder,
        arr: this.data
      });

      update((sortedData = []) => {
        this.data = [...sortedData];
        const arrow = column.querySelector('.sortable-table__sort-arrow');

        column.dataset.order = newOrder;

        if (!arrow) {
          column.append(this.subElements.arrow);
        }

        this.subElements.body.innerHTML = this.getTableRows(sortedData);
      });
    }
  };

  constructor(headerConfig = [], {
    data = [],
    sorted = {
      id: headerConfig.find(item => item.sortable).id,
      order: 'asc'
    },
    sortingStrategy
  } = {}) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.sorted = sorted;
    this.sortingStrategy = sortingStrategy;

    this.render();
  }

  getTableHeader() {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.headerConfig.map(item => this.getHeaderRow(item)).join('')}
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

  getTableBody() {
    return `
      <div data-element="body" class="sortable-table__body">
        ${this.getTableRows()}
      </div>`;
  }

  getTableRows () {
    return this.data.map(item => `
      <div class="sortable-table__row">
        ${this.getTableRow(item)}
      </div>`
    ).join('');
  }

  getTableRow (item) {
    const cells = this.headerConfig.map(({id, template}) => {
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

  getTable() {
    return `
      <div class="sortable-table">
        ${this.getTableHeader()}
        ${this.getTableBody()}
      </div>`;
  }

  render() {
    const {id, order} = this.sorted;
    const wrapper = document.createElement('div');
    const { sortType } = this.headerConfig.find(item => item.id === id);

    const update = this.sortingStrategy({
      id,
      order,
      sortType,
      arr: this.data
    });

    wrapper.innerHTML = this.getTable([]);

    this.element = wrapper.firstElementChild;
    this.subElements = this.getSubElements(this.element);

    this.initEventListeners();

    update((sortedData = []) => {
      const rows = document.createElement('div');

      this.data = [...sortedData];

      rows.innerHTML = this.getTableRows(this.data);

      this.subElements.body.append(...rows.childNodes);
    });
  }

  initEventListeners() {
    this.subElements.header.addEventListener('pointerdown', this.onSortClick);
  }

  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;

      result[name] = subElement;
    }

    return result;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}
