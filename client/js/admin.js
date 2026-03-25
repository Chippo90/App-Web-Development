//Get form element
const form = document.getElementById("productForm");

//Listen for form submission
form.addEventListener("submit", async (e) => {

    //Prevent page reload
    e.preventDefault();

    //Collect values
    const productData = {
        name: document.getElementById("name").value,
        brand: document.getElementById("brand").value,
        price: Number(document.getElementById("price").value),
        category: document.getElementById("category").value,
        imageUrl: document.getElementById("imageUrl").value
    };

    //Send POST request to backend
    await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
    });

    alert("Product added successfully!");

    //Reset form
    form.reset();
});