// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
let chipest_Tshirt = null
for(const Shirt of marketplace){
  if(Shirt.name.includes('T-shirt')){
    if(chipest_Tshirt==null){
      chipest_Tshirt=Shirt;
    }
    else{
      if(chipest_Tshirt.price>Shirt.price){
        chipest_Tshirt=Shirt;
      }
    }
  }
}

// I can find on these e-shops
// 2. Log the variable
console.log(chipest_Tshirt);




/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
let nbProd=marketplace.length;
// 2. Log the variable
console.log(nbProd);


// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
let brand=[];
for(const obj of marketplace){
  if(brand.includes(obj.brand)){}
  else{
    brand.push(obj.brand)
  }

}

// 2. Log the variable
console.table(brand);
// 3. Log how many brands we have
console.log(brand.length);


// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
let sortedMarket=marketplace.sort((a,b)=> {
  return a.price-b.price;
});
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable
console.table(sortedMarket);

// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
let sortedMarketDate=marketplace.sort((a,b)=>{
  return Date.parse(b.date)-Date.parse(a.date);
});
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable
console.table(sortedMarketDate)


// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
let filtered = marketplace.filter(function (obj){
  return obj.price>=50 && obj.price<=100;
})
// 2. Log the list
console.table(filtered);

// 🎯 TODO: Average price
// 1. Determine the average price of the marketplace
let avg=0
for(const obj of marketplace){
  avg=avg+obj.price;
}
avg=avg/marketplace.length;
// 2. Log the average
console.log(avg);





/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
let brands = {}
for(const obj of brand){
  let array=[];
  for(const prod of marketplace){
    if(prod.brand==obj){
      array.push(prod)
    }
  }
  brands[obj]=array;
  console.log(obj);
  console.table(array);
  console.log(array.length);
}
// 2. Log the variable

// 3. Log the number of products by brands


// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
for(const key in brands){
  brands[key]=brands[key].sort((a,b)=> {
    return b.price-a.price;
  });
  console.table(brands[key])
}
// 2. Log the sort


// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort

for(const key in brands){
  brands[key]=brands[key].sort((a,b)=> {
    return Date.parse(a.date)-Date.parse(b.date);
  });
  console.table(brands[key])
}



/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products

for(const key in brands){
  brands[key]=brands[key].sort((a,b)=> {
    return b.price-a.price;
  });
  let nb=0.9*brands[key].length;
  let i = 0;
  for(const obj of brands[key]){
    i=i+1;
    if(nb<=i){
      console.log(key)
      console.log(obj.price);
      nb=brands[key].length+1;
    }
  }
}
//while would have been better but no experience in java script


/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.
let newProd=false
for(const obj of COTELE_PARIS){
  if(Date.now-Date.parse(obj.released)<1209600000){
    newProd=true;
  }
}
console.log(newProd);

// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€
let reasonAble=true;
for(const obj of COTELE_PARIS){
  if(obj.price>=100){
    reasonAble=false;
  }
}
console.log(reasonAble);

// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product
let target = null;
let i=0;
while(i<COTELE_PARIS.length){
  if(COTELE_PARIS[i].uuid==='b56c6d88-749a-5b4c-b571-e5b5c6483131'){
    
    
    target = COTELE_PARIS[i];
    i=COTELE_PARIS.length;
  }
  i++;

}
console.log(target);

// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product
for( i = 0; i < COTELE_PARIS.length; i++){ 
    
  if ( COTELE_PARIS[i] === `b56c6d88-749a-5b4c-b571-e5b5c6483131`) { 

      COTELE_PARIS.splice(i, 1); 
  }
}
console.table(COTELE_PARIS);

// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;
console.log(jacket);
// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};
blueJacket.favorite=true;
console.log(blueJacket);
// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties

jacket = {};
Object.keys(blueJacket).forEach(x => jacket[x] = blueJacket[x]);
jacket.favorite = true;

console.log('Blue jacket');
console.table(blueJacket);

console.log('Jacket');
console.table(jacket);

console.log("Done");


/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage