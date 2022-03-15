/**
 * <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
 */
let burguers = [];
let tacos = [];
let salads = [];
let desserts = [];
let drink = [];
let cart = [];

fetch('https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json')
.then( response => response.json() )
.then( response => {
    response.forEach( element => {
        if (element.name==='Burguers')
            burguers = element.products;
        if (element.name==='Tacos')
            tacos = element.products;
        if (element.name==='Salads')
            salads = element.products;
        if (element.name==='Desserts')
            desserts = element.products;
        if (element.name==='Drinks and Sides')
            drink = element.products;
    });
    renderCategory('Burguers');
});

function renderCategory(category) {
    let list = [];
    if (category=='Burguers')
        list = burguers;
    else if (category=='Tacos')
        list = tacos;
    else if (category=='Salads')
        list = salads;
    else if (category=='Desserts')
        list = desserts;
    else
        list = drink;
    let main = document.querySelector('#main');
    main.innerHTML = `<h1 class="col-12">${category}</h1>`;
    list.forEach( element => {
        main.innerHTML +=`
        <div class="col-3">
            <div class="card" style="width: 18rem;">
                <img src="${element.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">${element.description}</p>
                    <p><strong>${element.price}</strong></p>
                    <a class="btn btn-primary" onclick="addCart('${element.name}','${category}')">Add to cart</a>
                </div>
            </div>
        </div>
        `;
    });
}

function addCart(name,category) {
    let list = [];
    if (category=='Burguers')
        list = burguers;
    else if (category=='Tacos')
        list = tacos;
    else if (category=='Salads')
        list = salads;
    else if (category=='Desserts')
        list = desserts;
    else
        list = drink;
    let food = list.filter(element => element.name==name)[0];
    cart.push(food);
    let element = document.querySelector("#cart");
    element.innerText = cart.length;
}
