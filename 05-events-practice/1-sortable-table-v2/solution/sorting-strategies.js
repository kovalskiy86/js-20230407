export const eventsStrategy = ({id, order}) => {
  document.dispatchEvent(new CustomEvent('sort-table', {
    bubbles: true,
    detail: {
      id,
      order
    }
  }));

  return callback => {
    document.addEventListener('update-table', event => {
      callback(event.detail.data);
    });
  };
};

export const sortOnClient = ({arr, id, order, sortType}) => {
  const directions = {
    asc: 1,
    desc: -1
  };

  const direction = directions[order];

  const sortedData = [...arr].sort((a, b) => {
    switch (sortType) {
    case 'number':
      return direction * (a[id] - b[id]);
    case 'string':
      return direction * a[id].localeCompare(b[id], 'ru');
    default:
      return direction * (a[id] - b[id]);
    }
  });

  return callback => {
    callback(sortedData);
  };
};

export const sortOnServer = ({id, order}) => {
  // NOTE: this logic connected to url will be encapsulated some ware outside strategy
  const BACKEND_URL = 'https://course-js.javascript.ru';
  const url = new URL('api/rest/products', BACKEND_URL);

  url.searchParams.set('_sort', id);
  url.searchParams.set('_order', order);
  url.searchParams.set('_start', '1');
  url.searchParams.set('_end', '10');

  const promise = fetch(url)
    .then(response => response.json());

  return callback => {
    promise.then(data => {
      callback(data);
    });
  };
};
