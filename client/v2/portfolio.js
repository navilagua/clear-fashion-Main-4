// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let choices = {reasonable_price : false, recently_released : false, brands : 0, sort : "Name"};


let uniqueBrands = ["All"]; 
Array.prototype.push.apply(uniqueBrands, [...new Set(currentProducts.map(item => item.brand))]);
console.log(uniqueBrands);
// inititiqte selectors;
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectSort = document.querySelector('#sort-select');
const selectBrand = document.querySelector('#brand-select');

const selectRecently = document.querySelector('#recently-select');
const selectReasonable = document.querySelector('#reasonable-select');

const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  console.log(meta);
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page, size) => {
  try {
    console.log(`https://clear-fashion-api.vercel.app?page=${page}&size=${size}`)

    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }


    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  products = products.filter((o, index) => choices.brands == 0 || o.brand == uniqueBrands[choices.brands]);

  products.sort((x, y) => choices.sort == "price-asc" ? (x.price > y.price ? 1 : -1) : 
                          choices.sort == "price-desc" ? (x.price < y.price ? 1 : -1) : 
                          choices.sort == "date-asc" ? (new Date(x.released) < new Date(y.released)  ? 1 : -1) : 
                          choices.sort == "date-desc" ?  (new Date(x.released) > new Date(y.released) ? 1 : -1) :
                          x.name > y.name ? 1 : -1
      );

  if (choices.reasonable_price)
  {
    products = products.filter((o, index) => o.price < 50);
  }
  if (choices.recently_released)
  { 
    var d = new Date();
    d.setDate(d.getDate() - 14);
    products = products.filter((o, index) => new Date(o.released) > d);
  }

  sectionProducts.innerHTML = '<h2>Products</h2>';
  if (products.length > 0)
  {
    const table = document.createElement('table');
    table.style.width = '100px';
    table.style.border = '1px solid black';
    let head = table.createTHead();
    let row = head.insertRow();
    for (let key of Object.keys(products[0])) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  
    products.forEach(function(i, ind) {
      let row = table.insertRow();
      for (let key in i) {
        let cell = row.insertCell();
        let text = document.createTextNode(i[key]);
        cell.appendChild(text);
      }
    })
  
    // div.innerHTML = template;
    // fragment.appendChild(div);
    sectionProducts.appendChild(table);
  }
  else
  {
    const span = document.createElement('span');
    span.innerHTML = "No products available with these filters !";
    sectionProducts.appendChild(span);
  }

};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
};

const renderFilters = () => {
  let selectedVal = uniqueBrands[choices.brands];
  uniqueBrands = ["All"]; 
  Array.prototype.push.apply(uniqueBrands, [...new Set(currentProducts.map(item => item.brand))]);
  
  const options = Array.from(
    uniqueBrands,
    (value, index) => `<option value="${value}">${value}</option>`
  ).join('');
  selectBrand.innerHTML = options;

  let colArr = [...selectBrand.options].map(x => x.value);
  if (colArr.includes(selectedVal))
  {
    choices.brands = colArr.indexOf(selectedVal);
  }
  else
  {
    choices.brands = 0;
  }

  selectBrand.selectedIndex = choices.brands;

}

const render = (products, pagination) => {
  renderFilters();
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

/**
 * Select the page to display
 * @type {[type]}
 */
selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value), currentPagination.pageSize)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

/**
 * Select the sorting type
 * @type {[type]}
 */
selectSort.addEventListener('change', event => {
  choices.sort = selectSort.selectedOptions[0].value;
    render(currentProducts, currentPagination);
});

/**
 * Select the filtering by brand
 * @type {[type]}
 */
selectBrand.addEventListener('change', event => {
  choices.brands = selectBrand.selectedIndex;
    render(currentProducts, currentPagination);
});

/**
 * Select the filtering by brand
 * @type {[type]}
 */
 selectRecently.addEventListener('change', event => {
  choices.recently_released = selectRecently.checked;
    render(currentProducts, currentPagination);
});

/**
 * Select the filtering by brand
 * @type {[type]}
 */
selectReasonable.addEventListener('change', event => {
  choices.reasonable_price = selectReasonable.checked;
    render(currentProducts, currentPagination);
});


document.addEventListener('DOMContentLoaded', () =>
  fetchProducts(1, 12)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);
