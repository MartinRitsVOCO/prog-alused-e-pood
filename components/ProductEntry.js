import { clickRouter } from "../route.js";
import AddToCartButton from "./AddToCartButton.js";
import FavoriteButton from "./FavoriteButton.js";

export default class ProductEntry {
    constructor(rootPath, product, cart, customer) {
        this.rootPath = rootPath;
        this.product = product;
        this.cart = cart;
        this.customer = customer;
    }

    render() {
        const productEntry = document.createElement("section");
        productEntry.classList.add("product-entry");

        const productHeader = document.createElement("a");
        productHeader.href = `${this.rootPath}/product/${this.product.id}`;
        productHeader.addEventListener("click", clickRouter);

        productHeader.appendChild(document.createElement("h3"));
        productHeader.firstChild.textContent = this.product.name;
        productHeader.appendChild(document.createElement("img"));
        productHeader.lastChild.src = this.product.image;

        productEntry.appendChild(productHeader);

        const productPrice = document.createElement("div");
        productPrice.textContent = this.product.price + "€";
        productPrice.classList.add("product-entry-price");

        productEntry.appendChild(productPrice);

        const productButtons = document.createElement("div");
        productButtons.classList.add("product-entry-buttons");

        const addToCart = new AddToCartButton(this.product, this.cart);
        const favoriteButton = new FavoriteButton(this.product, this.customer);

        productButtons.appendChild(addToCart.render());
        productButtons.appendChild(favoriteButton.render());

        productEntry.appendChild(productButtons);

        return productEntry;
    }
}