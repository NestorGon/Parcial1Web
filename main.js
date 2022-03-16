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
    main.innerHTML = `<h1 class="col-12 text-center">${category.toUpperCase()}</h1>`;
    list.forEach( element => {
        element.category = category;
        main.innerHTML +=`
        <div class="col-3">
            <div class="card">
                <div class="d-flex justify-content-center pt-3">
                    <img src="${element.image}" class="card-img-top card-image" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text" id="description">${element.description}</p>
                    <p><strong>$${element.price}</strong></p>
                    <div class="d-flex justify-content-center">
                        <a class="btn" onclick="addCart('${element.name}','${category}')" id="add-cart">Add to cart</a>
                    </div>
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
    let found = cart.filter(element => element.item.name==name);
    if (found.length==0) {
        cart.push({item:food,qty:1});
    } else {
        found[0].qty += 1;
    }
    let element = document.querySelector("#cart");
    element.innerText = cart.length + (cart.length==1?' item':' items');
}

function removeCart(name) {
    let foundIndex;
    cart.forEach((element,index) => {
        if (element.item.name==name) {
            foundIndex = index;
        }
    });
    if (cart[foundIndex].qty==1) {
        cart.splice(foundIndex,1);
        let element = document.querySelector("#cart");
        if (cart.length==0)
            element.innerText = ''
        else
            element.innerText = cart.length + (cart.length==1?' item':' items');
    } else {
        cart[foundIndex].qty -= 1;
    }
}

function orderDetail() {
    let body = '';
    let total = 0;
    cart.forEach( (element,index) => {
        total += element.item.price*element.qty;
        body += `
            <tr>
                <th scope="row">${index+1}</th>
                <td>${element.qty}</td>
                <td>${element.item.name}</td>
                <td>${element.item.price}</td>
                <td>${element.item.price*element.qty}</td>
                <td>
                    <button class="btn btn-warning text-light" onclick="addCart('${element.item.name}','${element.item.category}');orderDetail()">+</button>
                    <button class="btn btn-warning text-light" onclick="removeCart('${element.item.name}');orderDetail()">-</button>
                </td>
            </tr>
        `;
    });
    let main = document.querySelector('#main');
    main.innerHTML = `
        <h1 class="col-12 text-center">ORDER DETAIL</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">Item</th>
                <th scope="col">Qty.</th>
                <th scope="col">Description</th>
                <th scope="col">Unit price</th>
                <th scope="col">Amount</th>
                <th scope="col">Modify</th>
                </tr>
            </thead>
            <tbody>
                ${body}
            </tbody>
        </table>
        <div class="d-flex justify-content-between">
            <strong>Total: $${total}</strong>
            <div>
                <button class="cancel" onclick="showPopover()">Cancel</button>
                <button class="confirm" onclick="confirmOrder()">Confirm order</button>
            </div>
        </div>
    `;
}

function showPopover() {
    document.querySelector("#popover").style.visibility = 'visible';
}

function hidePopover() {
    document.querySelector("#popover").style.visibility = 'hidden';
}

function cancelOrder() {
    hidePopover();
    cart = [];
    renderCategory('Burguer');
    document.querySelector("#cart").innerText = '';
}

function confirmOrder() {
    let list = []
    cart.forEach( (element,index) => {
        list.push({item:(index+1),quantity:element.qty,description:element.item.name,unitPrice:element.item.price});
    });
    console.log(list);
    cancelOrder();
}
