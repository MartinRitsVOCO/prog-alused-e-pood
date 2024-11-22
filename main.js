import Product from "./class/Product.js";
import Cart from "./class/Cart.js";
import Order from "./class/Order.js";
import Customer from "./class/Customer.js";

import productListView from "./view/productList.js";
import cartView from "./view/productDetails.js";
import favoritesView from "./view/favorites.js";
import productDetailsView from "./view/productDetails.js";

const rootPath = "/prog-alused-e-pood";

const productList = [
    new Product("1", "Apple", 0.59, "Fruit"),
    new Product("2", "Lollipop", 0.49, "Candy"),
    new Product("3", "Ostrich Egg", 4.99, "Egg"),
    new Product("4", "1TB SSD", 89.99, "Computer Part")
]

window.addEventListener('popstate', handleRouteChange);

// Update handleRouteChange to render views
function handleRouteChange() {
    const path = window.location.pathname;
    console.log(path);
    let view;

    switch (path) {
        case rootPath + '/cart':
            view = cartView();
            break;

        case rootPath + '/favorites':
            view = favoritesView();
            break;

        default:
            if (path.match(rootPath + '/product/[0-9]+')) {
                const productId = path.split('/').pop();
                view = productDetailsView(productId);
            } else {
                view = productListView(productList, rootPath);
            }
    }

    document.getElementById('view-container').innerHTML = view;
}

window.clickRouter = function(e) {
    e.preventDefault();
    history.pushState(null, '', this.href);
    handleRouteChange();
}

document.querySelectorAll('.route').forEach(link => {link.addEventListener('click', window.clickRouter)});
