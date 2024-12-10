import CartEntry from "../components/CartEntry.js";

export default function cartView(cart, customer, rootPath) {
    const productList = cart.products;
    const productListElement = document.createElement("div");
    productListElement.id = "product-list";

    if (productList.length <= 0) {
        productListElement.textContent = "No Products Available"
    } else {
        productList.forEach(product => {
            const cartEntry = new CartEntry(rootPath, product, cart, customer);
            productListElement.appendChild(cartEntry.render());
        })
    }

    return productListElement;
}