import ProductEntry from "../components/ProductEntry.js";

export default function cartView(cart, customer, rootPath) {
    const productList = cart.products;
    const productListElement = document.createElement("div");
    productListElement.id = "product-list";

    if (productList.length <= 0) {
        productListElement.textContent = "No Products Available"
    } else {
        productList.forEach(product => {
            const productEntry = new ProductEntry(rootPath, product, cart, customer);
            productListElement.appendChild(productEntry.render());
        })
    }

    return productListElement;
}