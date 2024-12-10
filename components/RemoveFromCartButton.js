export default class RemoveFromCartButton {
    constructor(product, cart, removeEntry, cartEntry) {
        this.product = product;
        this.cart = cart;
        this.removeEntry = removeEntry.bind(cartEntry);
        this.button = document.createElement("button");
    }

    render() {
        this.button.classList.add("remove-from-cart");

        this.button.addEventListener("click", this.onClick.bind(this));

        return this.button;
    }

    onClick() {
        this.cart.removeProduct(this.product.id);
        this.removeEntry();
    }
}