export default function productDetailsView(productId, productList, cart, rootPath) {
    const product = productList.find(product => product.id == productId);
    const category = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    return `<article class="product-details">
                <section class="product-details-header">
                    <h2>${product.name}</h2>
                    <h3>${category}</h3>
                </section>
                <section class="product-details-body">
                    <img src="${product.image}">
                    <p>${product.description}</p>
                </section>
            </article>`;
}