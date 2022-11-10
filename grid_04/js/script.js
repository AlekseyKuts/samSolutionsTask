//filling Cart function
function fillCart(){
    ids = JSON.parse(localStorage.getItem('ids'));
    counts = JSON.parse(localStorage.getItem('counts'));
    total = JSON.parse(localStorage.getItem('total'));
    if (ids == null || ids.length == 0) return;


    document.getElementById('checkoutButton').style.pointerEvents = 'auto';


    for (i = 0; i < ids.length; i++){
        let id = ids[i];
        let cartItem = document.createElement('div');
        cartItem.className = "cart__item";
        cartItem.id = id + "_cart";

        let cartItemHeading = document.createElement('div');
        cartItemHeading.className = "cart__item_heading";
        cartItemHeading.textContent = document.getElementById(id).children[1].textContent;

        let cartItemPrice = document.createElement('div');
        cartItemPrice.className = "cart__item_price";
        cartItemPrice.textContent = document.getElementById(id).children[3].textContent + " x " + counts[ids.indexOf(id)];

    
        let cartItemRemove = document.createElement('div');
        cartItemRemove.className = "cart__item_remove";
        cartItemRemove.textContent = "×";
        cartItemRemove.addEventListener('click', removeCartItemListener);

        cartItem.appendChild(cartItemHeading);
        cartItem.appendChild(cartItemPrice);
        cartItem.appendChild(cartItemRemove);


        let liCartItem = document.createElement('li');
        liCartItem.appendChild(cartItem);


        document.getElementById('cart__list').appendChild(liCartItem);    


    }

    
    document.getElementById('total_price').textContent = total + "$";
}

//filling Cart on start or refresh page
fillCart();


function removeCartItem(id){
    ids = JSON.parse(localStorage.getItem('ids'));
    counts = JSON.parse(localStorage.getItem('counts'));
    total = JSON.parse(localStorage.getItem('total'));

    let index = ids.indexOf(id);


    
    let cost = document.getElementById(id).children[3].textContent;
    cost = Number(cost.slice(0, cost.length-1));

    

    total -= Number(cost) * Number(counts[index]);


    ids.splice(index, 1);
    counts.splice(index, 1);

    localStorage.setItem('ids', JSON.stringify(ids));
    localStorage.setItem('counts', JSON.stringify(counts));
    localStorage.setItem('total', JSON.stringify(total));
    
    document.getElementById(id+"_cart").parentElement.remove();
    document.getElementById('total_price').textContent = total + "$";

    if (ids.length == 0){
        document.getElementById('checkoutButton').style.pointerEvents = 'none';
    }
}

function removeCartItemListener(e){
    removeCartItem(e.currentTarget.parentElement.id.slice(0, e.currentTarget.parentElement.id.length-5));
}

function createCartItemTemplate(id){
    let cartItem = document.createElement('div');
    cartItem.className = "cart__item";
    cartItem.id = id + "_cart";

    let cartItemHeading = document.createElement('div');
    cartItemHeading.className = "cart__item_heading";
    cartItemHeading.textContent = document.getElementById(id).children[1].textContent;

    let cartItemPrice = document.createElement('div');
    cartItemPrice.className = "cart__item_price";
    cartItemPrice.textContent = document.getElementById(id).children[3].textContent + " x 1";

    
    let cartItemRemove = document.createElement('div');
    cartItemRemove.className = "cart__item_remove";
    cartItemRemove.textContent = "×";
    cartItemRemove.addEventListener('click', removeCartItemListener);

    cartItem.appendChild(cartItemHeading);
    cartItem.appendChild(cartItemPrice);
    cartItem.appendChild(cartItemRemove);


    let liCartItem = document.createElement('li');
    liCartItem.appendChild(cartItem);

    return liCartItem;
}

function addNewCartItem(id){

    ids = JSON.parse(localStorage.getItem('ids'));
    counts = JSON.parse(localStorage.getItem('counts'));
    total = JSON.parse(localStorage.getItem('total'));

    if (ids == null) ids = [];
    if (counts == null) counts = [];
    if (total == null) total = 0;

    let liCartItem = createCartItemTemplate(id);

    document.getElementById('cart__list').appendChild(liCartItem);

    let cost = document.getElementById(id).children[3].textContent;
    cost = Number(cost.slice(0, cost.length-1));
    
    ids.push(id);
    counts.push(1);
    total += cost;

    localStorage.setItem('ids', JSON.stringify(ids));
    localStorage.setItem('counts', JSON.stringify(counts));
    localStorage.setItem('total', JSON.stringify(total));
    document.getElementById('total_price').textContent = total + "$";

}

function incCountCartItem(id){
    ids = JSON.parse(localStorage.getItem('ids'));
    total = JSON.parse(localStorage.getItem('total'));
    counts = JSON.parse(localStorage.getItem('counts'));

    let index = ids.indexOf(id);
    counts[index]++;

    let cost = document.getElementById(id).children[3].textContent;
    cost = Number(cost.slice(0, cost.length-1));

    total += cost;

    localStorage.setItem('ids', JSON.stringify(ids));
    localStorage.setItem('counts', JSON.stringify(counts));
    localStorage.setItem('total', JSON.stringify(total));
    document.getElementById('total_price').textContent = total + "$";
    document.getElementById(id + "_cart").children[1].textContent = cost + "$ x " + counts[index];
}

function addToCart(id){
    ids = JSON.parse(localStorage.getItem('ids'));
    if (ids == null || ids.length == 0){
        document.getElementById('checkoutButton').style.pointerEvents = 'auto';
    }
    if (ids == null || ids.indexOf(id) < 0) addNewCartItem(id);
    else incCountCartItem(id);
}