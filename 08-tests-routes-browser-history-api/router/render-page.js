const renderPage = async (path = '', match) => {
  const {default: Page} = await import(`./10-webpack-part-1/pages/${path}`);

  const page = new Page(match);

  const contentNode = document.getElementById('content');

  contentNode.innerHTML = '';

  contentNode.append(page.element);

  return page;
}

export default renderPage;
