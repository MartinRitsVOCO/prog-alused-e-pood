import ProductEntry from "../components/ProductEntry.js";

export default function productListView(productList, categoryList, cart, customer, rootPath) {
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