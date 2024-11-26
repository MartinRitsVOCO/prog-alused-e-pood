export default function productListView(productList, categoryList, rootPath) {
    let contentHTML = '<div id="product-list">';

    productList.forEach(product => {
        contentHTML += 
        `<section class="product-entry">
            <a onclick="clickRouter(event)" href="${rootPath}/product/${product.id}">
                <h3>${product.name}</h3>
                <img src="${product.image}">
            </a>
            <div class="product-entry-price">${product.price}€</div>
            <div class="product-entry-buttons">
                <button class="add-to-cart" data-product-id="${product.id}" onclick="clickAddToCart(event)">
                <button class="favorite-${product.favorite ? 'true' : 'false'}" data-product-id="${product.id}" onclick="clickFavorite(event)">
            </div>
        </section>`;
    })

    contentHTML += "</div>";

    return contentHTML
}