export default function cartView(cart, rootPath) {
    let contentHTML = '<div id="product-list">';

    cart.products.forEach(product => {
        contentHTML += 
        `<section class="product-entry">
            <a onclick="clickRouter(event)" href="${rootPath}/product/${product.id}">
                <h3>${product.name}</h3>
                <img src="${product.image}">
            </a>
            <div class="product-entry-price">${product.price}€</div>
            <div class="product-entry-buttons">
                <button class="add-to-cart add-to-cart--true" data-product-id="${product.id}">
                <button class="favorite-button favorite-button--${product.favorite ? 'true' : 'false'}" data-product-id="${product.id}">
            </div>
        </section>`;
    })

    contentHTML += "</div>";

    return contentHTML
}