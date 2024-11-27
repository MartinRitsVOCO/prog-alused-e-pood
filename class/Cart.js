export default class Cart {
    constructor() {
        this.products = [];
    }

    addProduct(product, quantity = 1) {
        if (this.products.some(entry => entry.id === product.id)) {
            this.updateProductQuantity( product.id, quantity);
            return;
        }
        product.quantity = quantity;
        this.products.push(product);
    }
    updateProductQuantity(id, delta) {
        const productIndex = this.products.findIndex(entry => entry.id === id);
        this.products[productIndex].quantity += delta;
        if (this.products[productIndex].quantity <= 0) {
            this.removeProduct(id);
        }
    }

    removeProduct(id) {
        return this.products.splice(this.products.findIndex(entry => entry.id === id), 1);
    }

    calculateTotal() {
        return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
    }

    get totalItems() {
        return this.products.reduce((total, product) => total + product.quantity, 0);
    }

    clear() {
        this.products = [];
    }
}