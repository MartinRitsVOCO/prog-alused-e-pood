import ProductEntry from "./ProductEntry.js";
import RemoveFromCartButton from "./RemoveFromCartButton.js";
import CartAmountField from "./cartAmountField.js";

export default class CartEntry extends ProductEntry {
    constructor(...args) {
        super(...args);
        this.cartEntry = super.render();
    }

    render() {
        this.cartEntry.classList.add("cart-entry");

        const entryButtons = this.cartEntry.querySelector(".product-entry-buttons");

        entryButtons.querySelector(".add-to-cart").remove();

        const removeButton = new RemoveFromCartButton(this.product, this.cart, this.removeEntry, this);
        entryButtons.appendChild(removeButton.render());

        const cartAmountField = new CartAmountField(this.product, this.cart);
        entryButtons.appendChild(cartAmountField.render());

        return this.cartEntry;
    }

    removeEntry() {
        this.cartEntry.remove();
    }
}