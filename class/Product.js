export default class Product {
    constructor(id, name, price, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category =  category;
        this.quantity;
        this.favorite = false;
    }

    describe() {
        return `${this.name} is a ${this.category} product that costs ${this.price}€`;
    }

    static discountedPrice(price, discount) {
        return price * ((100 - discount) / 100);
    }
}