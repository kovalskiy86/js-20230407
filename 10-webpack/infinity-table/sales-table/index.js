import SortableTable from '../sortable-table';

const header = [
  {
    id: 'id',
    title: 'ID',
    sortable: true,
    sortType: 'number'
  },
  {
    id: 'user',
    title: 'User',
    sortable: true,
    sortType: 'string'
  },
  {
    id: 'createdAt',
    title: 'Date',
    sortable: true,
    sortType: 'custom',
    sort: (a, b) => new Date(a) - new Date(b),
    template: data => {
      return `
        <div class="sortable-table__cell">
          ${new Date(data).toLocaleString('default', {dateStyle: 'medium'})}
        </div>`;
    }
  },
  {
    id: 'totalCost',
    title: 'Total',
    sortable: true,
    sortType: 'number'
  },
  {
    id: 'delivery',
    title: 'Status',
    sortable: false
  },
];

class SalesTable extends SortableTable {
  constructor(...options) {
    super(header, ...options);
  }
}

export default SalesTable;
