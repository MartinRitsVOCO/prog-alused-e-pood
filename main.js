// Import classes
import Product from "./class/Product.js";
import Cart from "./class/Cart.js";
import Order from "./class/Order.js";
import Customer from "./class/Customer.js";

// Import router
import { handleRouteChange, clickRouter, initRouter, rootPath, currentView } from "./route.js";

// Initialize variables
const productList = []
const categoryList = []
const cart = new Cart();

// Event delegation for click events
document.addEventListener("click", (event) => {
    if (event.target.matches('.router-link') || currentView != "") {
        clickRouter(event);
    }
    if (event.target.matches('.favorite-button')) {
        clickFavorite(event);
    }
    if (event.target.matches('.add-to-cart')) {
        clickAddToCart(event);
    }
})

// Function for favorite toggle elements
function clickFavorite(event) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target;
    console.log(target);
    
    // Capture the exact state by creating a snapshot
    const initialState = {
        classList: Array.from(target.classList),
        favorite: target.classList.contains('favorite-button--true'),
        timestamp: Date.now()
    };
    console.log('Initial state snapshot:', initialState);

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

// Function for add to cart elements
function clickAddToCart(event) {
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
                initRouter(productList, categoryList, cart);
                handleRouteChange();
            })