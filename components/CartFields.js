export default class CartFields {
    constructor(product, cart) {
        this.product = product;
        this.cart = cart;
        this.container = document.createElement("div");
        this.sumField = document.createElement("div");
        this.amountField = document.createElement("input");
        this.cartProduct = this.cart.products.find(entry => entry.id === this.product.id);
    }

    render() {
        this.container.classList.add("cart-entry-fields");

        this.sumField.classList.add("cart-entry-fields-sum");
        this.sumField.textContent = this.cartProduct.quantity * this.cartProduct.price + "€";

        this.container.appendChild(this.sumField);

        this.amountField.type = "number";
        this.amountField.max = 999;
        this.amountField.min = 1;
        this.amountField.step = 1;
        this.amountField.value = this.cartProduct.quantity;
        this.amountField.classList.add("cart-entry-fields-amounts");

        this.amountField.addEventListener("change", this.onAmountChange.bind(this));

        this.container.appendChild(this.amountField);

        return this.container;
    }

    onAmountChange() {
        if (this.amountField.value < 1 || this.amountField.value > 999) {
            this.amountField.value = this.cartProduct.quantity;
            return;
        }
        
        this.cartProduct.quantity = this.amountField.value;
        this.sumField.textContent = this.cartProduct.quantity * this.cartProduct.price + "€";
    }
}