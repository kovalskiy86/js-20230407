import renderPage from './render-page.js';

// performs routing on all links
export default class Router {
  // NOTE: Pattern. Singleton
  static instance() {
    if (!this._instance) {
      this._instance = new Router();
    }
    return this._instance;
  }

  routes = [];

  constructor() {
    this.initEventListeners();
  }

  initEventListeners () {
    document.addEventListener('pointerdown', event => {
      const link = event.target.closest('a');

      if (!link) return;

      const href = link.getAttribute('href'); // link.href

      if (href && href.startsWith('/')) {
        event.preventDefault();
        this.navigate(href);
      }
    });
  }

  async route() {
    const strippedPath = decodeURI(window.location.pathname)
      // NOTE: clear slashed at the start and at the end: '///foo/bar//' -> 'foo/bar'
      .replace(/^\/+|\/+$/g, '')
      // NOTE: clear slash duplicates inside route: 'foo///bar' -> 'foo/bar'
      .replace(/\/{2,}/g, '/');

    let match;

    for (const route of this.routes) {
      match = strippedPath.match(route.pattern);

      if (match) {
        this.page = await this.changePage(route.path, match);
        break;
      }
    }

    if (!match) {
      this.page = await this.changePage(this.notFoundPagePath);
    }

    document.dispatchEvent(new CustomEvent('route', {
      detail: {
        page: this.page
      }
    }));
  }

  async changePage (path, match) {
    if (this.page && this.page.destroy) {
      this.page.destroy();
    }

    return await renderPage(path, match);
  }

  navigate (path) {
    history.pushState(null, null, path);
    this.route();
  }

  addRoute (pattern, path) {
    this.routes.push({pattern, path});
    return this;
  }

  setNotFoundPagePath (path) {
    this.notFoundPagePath = path;
    return this;
  }

  listen () {
    window.addEventListener('popstate', () => this.route());

    this.route();
  }
}
