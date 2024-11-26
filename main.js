import Product from "./class/Product.js";
import Cart from "./class/Cart.js";
import Order from "./class/Order.js";
import Customer from "./class/Customer.js";

import productListView from "./view/productList.js";
import cartView from "./view/cart.js";
import favoritesView from "./view/favorites.js";
import productDetailsView from "./view/productDetails.js";

const rootPath = "/prog-alused-e-pood";
const productList = []
const categoryList = []

window.addEventListener('popstate', handleRouteChange);

// Update handleRouteChange to render views
function handleRouteChange() {
    const path = window.location.pathname;
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
                view = productListView(productList, categoryList, rootPath);
            }
    }
        
    document.getElementById('view-container').innerHTML = view;
}
        
window.clickRouter = function(event) {
    event.preventDefault();
    history.pushState(null, '', event.target.href);
    handleRouteChange();
}
        
document.querySelectorAll('.route').forEach(link => {link.addEventListener('click', window.clickRouter)});

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
                console.log(productList);
                console.log(categoryList);
                handleRouteChange()
            })