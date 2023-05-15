import escapeHtml from "./utils/escape-html.js";
import fetchJson from "./utils/fetch-json.js";

const IMGUR_CLIENT_ID = "28aaa2e823b03b1";
const BACKEND_URL = "https://course-js.javascript.ru";

export default class ProductForm {
  element;
  subElements = {};
  defaultFormData = {
    title: "",
    description: "",
    quantity: 1,
    subcategory: "",
    status: 1,
    images: [],
    price: 100,
    discount: 0,
  };

  constructor(productId = "") {
    this.productId = productId;
    // this.render();
  }

  async render() {
    const categoriesPromise = this.loadCategories();

    const productsPromise = this.productId
      ? this.loadProductData(this.productId)
      : Promise.resolve(this.defaultFormData);

    const [categoriesData, productResponse] = await Promise.all([
      categoriesPromise,
      productsPromise,
    ]);
    this.formData = Array.isArray(productResponse)
      ? productResponse.at(0)
      : productResponse;

    this.categories = categoriesData;
    this.renderForm();
    return this.element;
  }

  loadProductData(productId) {
    return fetchJson(`${BACKEND_URL}/api/rest/products?id=${productId}`);
  }
  loadCategories() {
    return fetchJson(
      `${BACKEND_URL}/api/rest/categories?_sort=weight&_refs=subcategory`
    );
  }

  renderForm() {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = this.formData
      ? this.getTemplate(this.formData)
      : this.getEmptyTemplate();

    this.element = wrapper.firstElementChild;

    this.subElements = this.getSubElements(this.element);
  }

  getTemplate(data) {
    return `
    <div class="product-form">

    <form data-element="productForm" class="form-grid">
      <div class="form-group form-group__half_left">
        <fieldset>
          <label class="form-label">Название товара</label>
          <input required="" type="text" name="title" class="form-control" value='${
      data.title
    }' placeholder="Название товара">
        </fieldset>
      </div>
      <div class="form-group form-group__wide">
        <label class="form-label">Описание</label>
        <textarea required="" class="form-control" name="description" data-element="productDescription"  placeholder="Описание товара">${
      data.description
    }</textarea>
      </div>

      <div class="form-group form-group__wide" data-element="sortable-list-container">
        ${this.createImagesList(data)}
        <button type="button" name="uploadImage" class="button-primary-outline">
          <span>Загрузить</span>
        </button>
      </div>

      <div class="form-group form-group__half_left">
        <label class="form-label">Категория</label>
        ${this.createCategoriesSelect()}
      </div>

      <div class="form-group form-group__half_left form-group__two-col">
        <fieldset>
          <label class="form-label">Цена ($)</label>
          <input required="" type="number" name="price" class="form-control" placeholder="100" value='${
      data.price
    }'>
        </fieldset>
        <fieldset>
          <label class="form-label">Скидка ($)</label>
          <input required="" type="number" name="discount" class="form-control" placeholder="0" value='${
      data.discount
    }'>
        </fieldset>
      </div>
      <div class="form-group form-group__part-half">
        <label class="form-label">Количество</label>
        <input required="" type="number" class="form-control" name="quantity"  value='${
      data.quantity
    }' placeholder="1">
      </div>
      <div class="form-group form-group__part-half">
        <label class="form-label">Статус</label>
        <select class="form-control" name="status">
          <option value="1">Активен</option>
          <option value="0">Неактивен</option>
        </select>
      </div>
      <div class="form-buttons">
        <button type="submit" name="save" class="button-primary-outline">
          ${this.productId ? "Сохранить" : "Добавить"} товар
        </button>
      </div>
    </form>
  </div>

    `;
  }

  getEmptyTemplate() {
    return `
      <div>
      <h1 class="page-title"> Страница не найдена </h1>
        <p> Данный товар не существет! </p>
      </div>
    `;
  }

  createCategoriesSelect() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML =
      '<select class="form-control" id="subcategory" name="subcategory"></select>';
    const select = wrapper.firstElementChild;

    for (const category of this.categories) {
      for (const subcategory of category.subcategories) {
        select.append(
          new Option(`${category.title} > ${subcategory.title}`, subcategory.id)
        );
      }
    }
    return select.outerHTML;
  }

  createImagesList(data) {
    return `
        <label class="form-label">${this.productId ? "Фото" : ""}</label>
        <div data-element="imageListContainer">
          <ul class="sortable-list">
            ${data.images.map((item) => this.getImagesListItem(item)).join("")}
          </ul>
        </div>
    `;
  }
  getImagesListItem(item) {
    return `
    <li class="products-edit__imagelist-item sortable-list__item" style="">
      <input type="hidden" name="url" value="${item.url}">
      <input type="hidden" name="source" value="${item.source}">
          <span>
            <img src="icon-grab.svg" data-grab-handle="" alt="grab">
            <img class="sortable-table__cell-img" alt="Image" src="${item.url}">
            <span>${item.source}</span>
          </span>
          <button type="button">
            <img src="icon-trash.svg" data-delete-handle="" alt="delete">
          </button>
      </li>
    `;
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll("[data-element]");

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }
    return result;
  }

  destroy() {
    this.remove();
    this.subElements = null;
    this.element = null;
  }
  remove() {
    this.element.remove();
  }
}
