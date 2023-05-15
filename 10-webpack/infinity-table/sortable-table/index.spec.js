import SortableTable from './index.js';

const config = [
  {
    id: 'foo',
    title: 'Foo',
    sortable: true,
    sortType: 'string'
  },
  {
    id: 'bar',
    title: 'Bar',
    sortable: true,
    sortType: 'number'
  }
];

const data = [
  {
    foo: 'c',
    bar: 1
  },
  {
    foo: 'a',
    bar: 3
  },
  {
    foo: 'b',
    bar: 2
  }
];

describe("SortableTable", () => {
  let sortableTable;

  beforeEach(() => {
    sortableTable = new SortableTable(config, {
      data,
      isSortLocally: true
    });

    document.body.append(sortableTable.element);
  });

  afterEach(() => {
    sortableTable.destroy();
    sortableTable = null;
  });

  it("should be rendered correctly", () => {
    expect(sortableTable.element).toBeInTheDocument();
    expect(sortableTable.element).toBeVisible();
  });

  it("should render data correctly", () => {
    const rows = sortableTable.element.querySelectorAll('.sortable-table__row');

    expect(rows.length).toBe(4);
  });

  it("should have ability to sort data by first column", () => {
    const headerCells = sortableTable.element.querySelectorAll('.sortable-table__cell[data-sortable]');
    const [firstCell] = [...headerCells];

    const click = new MouseEvent('pointerdown', {
      bubbles: true
    });

    firstCell.dispatchEvent(click);

    const bodyCells = sortableTable.element.querySelectorAll('.sortable-table__cell:not([data-sortable])');
    const [firstColumnCell, secondColumnCell] = [...bodyCells];

    expect(firstColumnCell.textContent).toBe('c');
    expect(secondColumnCell.textContent).toBe('1');
  });

  it("should have ability to sort data by second column", () => {
    const headerCells = sortableTable.element.querySelectorAll('.sortable-table__cell[data-sortable]');
    const [_, secondCell] = [...headerCells];

    const click = new MouseEvent('pointerdown', {
      bubbles: true
    });

    secondCell.dispatchEvent(click);

    const bodyCells = sortableTable.element.querySelectorAll('.sortable-table__cell:not([data-sortable])');
    const [firstColumnCell, secondColumnCell] = [...bodyCells];

    expect(firstColumnCell.textContent).toBe('a');
    expect(secondColumnCell.textContent).toBe('3');
  });

  it('should have ability to be removed from DOM', () => {
    sortableTable.remove();

    expect(sortableTable.element).not.toBeInTheDocument();
  });
});
