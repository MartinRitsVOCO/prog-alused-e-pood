// Import views
import productListView from "./view/productList.js";
import cartView from "./view/cart.js";
import favoritesView from "./view/favorites.js";
import productDetailsView from "./view/productDetails.js";

// Initialize variables
const rootPath = "/prog-alused-e-pood";
let currentView = "";
let productList = [];
let categoryList = [];
let cart;
let customer;

// Update handleRouteChange to render views
function handleRouteChange() {
    const path = window.location.pathname;
    let view;
    
    switch (path) {
        case rootPath + '/cart':
            view = cartView(cart, customer, rootPath);
            currentView = "cart";
        break;
        
        case rootPath + '/favorites':
            view = favoritesView(productList, cart, customer, rootPath);
            currentView = "favorites";
        break;
        
        default:
            if (path.match(rootPath + '/product/[0-9]+')) {
                const productId = path.split('/').pop();
                view = productDetailsView(productId, productList, cart, rootPath);
                currentView = "productDetails";
            } else {
                view = productListView(productList, categoryList, cart, customer, rootPath);
                currentView = "productList";
            }
    }
    
    document.getElementById('view-container').innerHTML = "";
    document.getElementById('view-container').appendChild(view);
}

// Function for nav route elements
function clickRouter(event) {
    event.preventDefault();
    history.pushState(null, '', event.target.href);
    handleRouteChange();
}

// Initialize router
function initRouter(pList, cList, cartObject, customerObject) {
    productList = pList;
    categoryList = cList;
    cart = cartObject;
    customer = customerObject;

    window.addEventListener('popstate', handleRouteChange);
}

export { handleRouteChange, clickRouter, initRouter, rootPath, currentView };