import Router from './index.js';

const router = Router.instance();

router
  .addRoute(/^$/, './src/pages/dashboard/index.js')
  .addRoute(/^products$/, 'products/list')
  .addRoute(/^products\/add$/, 'products/edit')
  .addRoute(/^products\/([\w()-]+)$/, 'products/edit')
  .addRoute(/^sales$/, 'sales')
  .addRoute(/^categories$/, 'categories')
  .addRoute(/^404\/?$/, 'error404')
  .setNotFoundPagePath('./src/pages/error404/index.js')
  .listen();
