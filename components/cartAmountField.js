export default class CartAmountField {
    constructor(product, cart) {
        this.product = product;
        this.cart = cart;
        this.field = document.createElement("input");
        this.cartProduct = this.cart.products.find(entry => entry.id === this.product.id);
    }

    render() {
        this.field.type = "number";
        this.field.max = 999;
        this.field.min = 1;
        this.field.step = 1;
        this.field.value = this.cartProduct.quantity;
        this.field.classList.add("cart-amount-field");

        this.field.addEventListener("change", this.onChange.bind(this));

        return this.field;
    }

    onChange() {
        if (this.field.value < 1 || this.field.value > 999) {
            this.field.value = this.cartProduct.quantity;
            return;
        }
        
        this.cartProduct.quantity = this.field.value;
        console.log("Product quantity changed. New product amount is " + this.cartProduct.quantity);
    }
}