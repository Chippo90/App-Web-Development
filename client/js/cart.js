//Retrieve cart
//If no cart exists, use empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

//HTML elements
const cartContainer = document.getElementById("cart-items");
const totalElement = document.getElementById("total");


//Render cart items on screen
function renderCart() {

    //Clear previous content
    cartContainer.innerHTML = "";

    //Variable to store total price
    let total = 0;

    //If cart is empty
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalElement.innerText = "";
        return;
    }

    //Loop through each cart item
    cart.forEach((item, index) => {

        //Calculate total
        total += item.price * item.quantity;

        //Create card for each item
        cartContainer.innerHTML += `
      <div class="card">
        <h3>${item.name}</h3>
        <p>Price: ${item.price} €</p>
        <p>Quantity: ${item.quantity}</p>

        <!-- Remove button -->
        <button onclick="removeItem(${index})">
          Remove
        </button>
      </div>
    `;
    });

    //Display total
    totalElement.innerText = `Total: ${total.toFixed(2)} €`;
}

//Remove single item
function removeItem(index) {

    //Remove item from array
    cart.splice(index, 1);

    //Update localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    //Render cart
    renderCart();
}

//Clear entire cart
function clearCart() {

    //Remove cart from storage
    localStorage.removeItem("cart");

    //Reset local array
    cart = [];

    //Render
    renderCart();
}

//PayPal integration
if (typeof paypal !== "undefined") {

    paypal.Buttons({

        //Create PayPal order
        createOrder: async function () {

            //Calculate total amount
            const total = cart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            //Send request to backend
            const response = await fetch("/api/payments/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    totalAmount: total
                })
            });

            const data = await response.json();

            //Return PayPal order ID
            return data.id;
        },

        //After user approves payment
        onApprove: async function (data) {

            //Calculate total again
            const total = cart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            //Send capture request to backend
            await fetch("/api/payments/capture", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orderId: data.orderID,
                    cartItems: cart,
                    totalAmount: total
                })
            });

            //Show success message
            alert("Payment successful!");

            //Clear cart
            localStorage.removeItem("cart");

            //Redirect to order history page
            window.location.href = "orders.html";
        }

    }).render("#paypal-button-container");

}

//Render when page loads
renderCart();