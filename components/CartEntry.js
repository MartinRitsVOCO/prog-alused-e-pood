import ProductEntry from "./ProductEntry.js";
import RemoveFromCartButton from "./RemoveFromCartButton.js";

export default class CartEntry extends ProductEntry {
    constructor(...args) {
        super(...args);
        this.cartEntry = super.render();
    }

    render() {
        const removeButton = new RemoveFromCartButton(this.product, this.cart, this.removeEntry, this);
        this.cartEntry.querySelector(".product-entry-buttons").appendChild(removeButton.render());

        return this.cartEntry;
    }

    removeEntry() {
        this.cartEntry.remove();
    }
}