// Import classes
import Product from "./class/Product.js";
import Cart from "./class/Cart.js";
import Order from "./class/Order.js";
import Customer from "./class/Customer.js";

// Import views
import productListView from "./view/productList.js";
import cartView from "./view/cart.js";
import favoritesView from "./view/favorites.js";
import productDetailsView from "./view/productDetails.js";

// Initialize variables
const rootPath = "/prog-alused-e-pood";
const productList = []
const categoryList = []
const cart = new Cart();
let currentView = "";

// Update handleRouteChange to render views
function handleRouteChange() {
    const path = window.location.pathname;
    let view;
    
    switch (path) {
        case rootPath + '/cart':
            view = cartView(cart, rootPath);
            currentView = "cart";
        break;
        
        case rootPath + '/favorites':
            view = favoritesView(productList, cart, rootPath);
            currentView = "favorites";
        break;
        
        default:
            if (path.match(rootPath + '/product/[0-9]+')) {
                const productId = path.split('/').pop();
                view = productDetailsView(productId, productList, cart, rootPath);
                currentView = "productDetails";
            } else {
                view = productListView(productList, categoryList, cart, rootPath);
                currentView = "productList";
            }
    }
        
    document.getElementById('view-container').innerHTML = view;
}

// Global function for nav route elements
window.clickRouter = function(event) {
    event.preventDefault();
    history.pushState(null, '', event.target.href);
    handleRouteChange();
}

// Global function for favorite toggle elements
window.clickFavorite = function(event) {
    event.preventDefault();
    const target = event.target;
    const productId = target.dataset.productId;
    const product = productList.find(product => product.id == productId);
    if (product.favorite) {
        product.favorite = false;
        target.classList.remove('favorite-button--true');
        target.classList.add('favorite-button--false');
        if (currentView === "favorites") {
            target.parentElement.parentElement.remove();
        }
    } else {
        product.favorite = true;
        target.classList.remove("favorite-button--false");
        target.classList.add("favorite-button--true");
    }
}

// Global function for add to cart elements
window.clickAddToCart = function(event) {
    event.preventDefault();
    const target = event.target;
    const productId = target.dataset.productId;
    const product = productList.find(product => product.id == productId);
    cart.addProduct(product);
    if (!target.classList.contains("add-to-cart--true")) {
        target.classList.remove("add-to-cart--false");
        target.classList.add("add-to-cart--true");
    }
}

// add event listeners
window.addEventListener('popstate', handleRouteChange);       
document.querySelectorAll('.route').forEach(link => {link.addEventListener('click', window.clickRouter)});

// API call for product information
fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=> {
                json.forEach(item => {
                    productList.push(
                        new Product(
                            item.id,
                            item.title,
                            item.price,
                            item.category,
                            item.description,
                            item.image
                        )
                    )

                    if (!categoryList.includes(item.category)) {
                        categoryList.push(item.category);
                    }
                })
                categoryList.sort((a, b) => a.localeCompare(b));
                handleRouteChange()
            })