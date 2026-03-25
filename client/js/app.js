const API_URL = "/api/products"; // relative path now

let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function fetchProducts() {

    const response = await fetch(API_URL);
    const products = await response.json();

    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {

        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
      <img src="${product.imageUrl || 'https://via.placeholder.com/200'}" width="150">
      <h3>${product.name}</h3>
      <p>${product.brand}</p>
      <p><strong>${product.price} €</strong></p>
      <button onclick="addToCart('${product._id}', '${product.name}', ${product.price})">
        Add to Cart
      </button>
    `;

        productList.appendChild(div);
    });
}

function addToCart(id, name, price) {

    const existing = cart.find(item => item.productId === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            productId: id,
            name,
            price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");
}
//Search products
function searchProducts() {

    //Get value typed by user
    const searchValue = document.getElementById("searchInput").value;

    //Fetch products using search query
    fetch(`/api/products?search=${searchValue}`)
        .then(res => res.json())
        .then(products => {

            const productList = document.getElementById("product-list");
            productList.innerHTML = "";

            products.forEach(product => {

                const div = document.createElement("div");
                div.className = "card";

                div.innerHTML = `
          <h3>${product.name}</h3>
          <p>${product.brand}</p>
          <p>${product.price} €</p>
          <button onclick="addToCart('${product._id}', '${product.name}', ${product.price})">
            Add to Cart
          </button>
        `;

                productList.appendChild(div);
            });

        });
}
fetchProducts();