export default function productListView(productList, categoryList, rootPath) {
    let contentHTML = '<div id="product-list">';

    productList.forEach(product => {
        contentHTML += 
        `<section class="product-entry">
            <h3>${product.name}<h3>
            <p>
                <a onclick="clickRouter(event)" href="${rootPath}/product/${product.id}">View</a>
            </p>
        </section>`;
    })

    contentHTML += "</div>";

    return contentHTML
}