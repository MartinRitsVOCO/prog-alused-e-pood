export default function favoritesView(productList, cart, rootPath) {
    let contentHTML = '<div id="product-list">';

    productList.forEach(product => {
        if (product.favorite) {
            contentHTML += 
            `<section class="product-entry">
                <a onclick="clickRouter(event)" href="${rootPath}/product/${product.id}">
                    <h3>${product.name}</h3>
                    <img src="${product.image}">
                </a>
                <div class="product-entry-price">${product.price}€</div>
                <div class="product-entry-buttons">
                    <button class="add-to-cart add-to-cart--${cart.products.some(entry => entry.id === product.id) ? 'true' : 'false'}" data-product-id="${product.id}" onclick="clickAddToCart(event)">
                    <button class="favorite-button favorite-button--${product.favorite ? 'true' : 'false'}" data-product-id="${product.id}" onclick="clickFavorite(event)">
                </div>
            </section>`;
        }
    })

    contentHTML += "</div>";

    return contentHTML
}