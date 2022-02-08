// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let choices = {reasonable_price : false, recently_released : false, brands : 0, sort : "Name", fav: false};


//Unique brands
let uniqueBrands = ["All"]; 
Array.prototype.push.apply(uniqueBrands, [...new Set(currentProducts.map(item => item.brand))]);

//fav
let fav = JSON.parse(window.localStorage.getItem('favorites'));
if (fav == null)
{
  fav = [];
}

// inititiate selectors;
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectSort = document.querySelector('#sort-select');
const selectBrand = document.querySelector('#brand-select');

const selectRecently = document.querySelector('#recently-select');
const selectReasonable = document.querySelector('#reasonable-select');
const selectFavorite = document.querySelector('#favorite-select');

const sectionProducts = document.querySelector('#products');
const sectionOptions = document.querySelector('#options');

const spanNbProducts = document.querySelector('#nbProducts');
const spanNewProducts = document.querySelector('#newProducts');
const spanP50 = document.querySelector('#p50');
const spanP90 = document.querySelector('#p90');
const spanP95 = document.querySelector('#p95');
const spanLastDate = document.querySelector('#lastDate');

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

  products.sort((x, y) => choices.sort == "price-asc" ? (x.price > y.price ? 1 : -1) : 
                          choices.sort == "price-desc" ? (x.price < y.price ? 1 : -1) : 
                          choices.sort == "date-asc" ? (new Date(x.released) < new Date(y.released)  ? 1 : -1) : 
                          choices.sort == "date-desc" ?  (new Date(x.released) > new Date(y.released) ? 1 : -1) :
                          x.name > y.name ? 1 : -1
      );

  $('#products').empty();
  if (products.length > 0)
  {
    const table = document.createElement('table');
    table.className = 'styled-table';
    let head = table.createTHead();
    let row = head.insertRow();

    let properties = ["Picture", "Brand", "Name", "Price", "Date released", "Favorite"];
    for (let i = 0; i < properties.length; i++)
    {
      let th = document.createElement("th");
      let text = document.createTextNode(properties[i]);
      th.appendChild(text);
      row.appendChild(th);
    }
    
    
    let body = table.createTBody();
    products.forEach(function(obj, i) {
      let row = body.insertRow();
      row.align = 'center';
      let cell = row.insertCell();
      let link = document.createElement('a');
      link.href = obj.link;
      let linkImage = document.createElement("img");

      checkIfImageExists(obj.photo, exists => {
        if (exists)
        {
          linkImage.src = obj.photo;
        }
        else
        {
          linkImage.src = "https://4.bp.blogspot.com/-OCutvC4wPps/XfNnRz5PvhI/AAAAAAAAEfo/qJ8P1sqLWesMdOSiEoUH85s3hs_vn97HACLcBGAsYHQ/s1600/no-image-found-360x260.png";
        }
      });
      linkImage.style.width = '200px';
      linkImage.style.height = '200px';
      
      link.appendChild(linkImage);
      cell.appendChild(link);

      cell = row.insertCell();
      cell.id = "brand";
      cell.appendChild(document.createTextNode(obj.brand));
      
      cell = row.insertCell();
      cell.id = "name";
      cell.appendChild(document.createTextNode(obj.name));
      
      cell = row.insertCell();
      cell.id = "price";
      cell.appendChild(document.createTextNode(obj.price + "€"));
      
      cell = row.insertCell();
      cell.id = "date";
      cell.appendChild(document.createTextNode(formatDate(new Date(obj.released))));

      cell = row.insertCell();
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "table-checkbox";
      checkbox.checked = fav.some(x => x.uuid === obj.uuid);
      checkbox.addEventListener('change', e => {
        let id = e.currentTarget.parentNode.parentNode.getElementsByTagName("td")[2].textContent;
        if (e.currentTarget.checked){
          fav.push(currentProducts.filter(x => x.name ==  id)[0]);
        }
        else{
          fav.splice(fav.findIndex(item => item.name == id), 1);
        }
        window.localStorage["favorites"] = JSON.stringify(fav);
      })
      cell.appendChild(checkbox);
    });

    var td = table.rows[0].cells[0]; //Image
    td.style.width = '250px';

    var td = table.rows[0].cells[1]; //Brand
    td.style.width = '100px';

    var td = table.rows[0].cells[2]; //Name
    td.style.width = '220px';

    var td = table.rows[0].cells[3]; //Price
    td.style.width = '80px';

    var td = table.rows[0].cells[4]; //Date
    td.style.width = '130px';

    var td = table.rows[0].cells[5]; //Fav
    td.style.width = '50px';
    
  
    sectionProducts.appendChild(table);
  }
  else
  {
    const div = document.createElement('div');
    div.style.textAlign ='center';
    div.style.margin = '4em auto 4em';
    const span = document.createElement('span');
    span.innerHTML = "No products available with these filters !";
    span.style.fontSize='130%';
    span.style.color='red';
    div.appendChild(span);
    sectionProducts.appendChild(div);
  }

};

/** Funcs helper */

function checkIfImageExists(url, callback) {
    const img = new Image();
  
    img.src = url;
  
    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };
      
      img.onerror = () => {
        callback(false);
      };
    }
};

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
};

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
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
  const pageSize = choices.fav ? fav.length : pagination.pageSize; //count

  let products = choices.fav ? [...fav] : [...currentProducts];

  var d = new Date();
  d.setDate(d.getDate() - 14);
  let newProd = products.filter((o, index) => new Date(o.released) > d).length;

  products.sort((x, y) => x.price > y.price ? 1 : -1);
  let p5OPrice = products[(products.length * 50 / 100) | 0].price;
  let p90Price = products[(products.length * 90 / 100) | 0].price;
  let p95Price = products[(products.length * 95 / 100) | 0].price;

  products.sort((x, y) => new Date(x.released) < new Date(y.released)  ? 1 : -1);
  let lastReleased = products[0].released;

  spanNbProducts.innerHTML = pageSize;
  spanNewProducts.innerHTML = newProd;
  spanP50.innerHTML = p5OPrice + "€";
  spanP90.innerHTML = p90Price + "€";
  spanP95.innerHTML = p95Price + "€";
  spanLastDate.innerHTML = formatDate(new Date(lastReleased));
};

const renderFilters = () => {
  let selectedVal = uniqueBrands[choices.brands];
  uniqueBrands = ["All"]; 
  Array.prototype.push.apply(uniqueBrands, [...new Set(selectFavorite.checked ? fav.map(item => item.brand) : currentProducts.map(item => item.brand))]);
  
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

};

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
  selectFavorite.checked = choices.fav = false;
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

/**
 * Select the page to display
 * @type {[type]}
 */
selectPage.addEventListener('change', event => {
  selectFavorite.checked = choices.fav = false;
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
  if (choices.fav)
  {
    render(fav, currentPagination);
  }
  else
  {
    render(currentProducts, currentPagination);
  }
});

/**
 * Select the filtering by brand
 * @type {[type]}
 */
selectBrand.addEventListener('change', event => {
  choices.brands = selectBrand.selectedIndex;
  if (choices.fav)
  {
    render(fav, currentPagination);
  }
  else
  {
    render(currentProducts, currentPagination);
  }
});

/**
 * Select the filtering by recently released
 * @type {[type]}
 */
 selectRecently.addEventListener('change', event => {
  choices.recently_released = selectRecently.checked;
  if (choices.fav)
  {
    render(fav, currentPagination);
  }
  else
  {
    render(currentProducts, currentPagination);
  }
});

/**
 * Select the filtering by reasonable price
 * @type {[type]}
 */
selectReasonable.addEventListener('change', event => {
  choices.reasonable_price = selectReasonable.checked;
  if (choices.fav)
  {
    render(fav, currentPagination);
  }
  else
  {
    render(currentProducts, currentPagination);
  }
});

/**
 * Select the filtering by reasonable price
 * @type {[type]}
 */
selectFavorite.addEventListener('change', event => {
  choices.fav = selectFavorite.checked;
  if (choices.fav)
  {
    render(fav, currentPagination);
  }
  else
  {
    render(currentProducts, currentPagination);
  }
});




document.addEventListener('DOMContentLoaded', () =>{
  fetchProducts(1, 12)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
  
  
  }
);

