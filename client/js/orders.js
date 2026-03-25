//Fetch orders from backend
fetch("/api/orders")
    .then(res => res.json())
    .then(orders => {

        //Get container
        const orderList = document.getElementById("order-list");

        //If no orders exist
        if (orders.length === 0) {
            orderList.innerHTML = "<p>No orders yet.</p>";
            return;
        }

        //Loop through each order
        orders.forEach(order => {

            const div = document.createElement("div");
            div.className = "card";

            div.innerHTML = `
        <h3>Order ID: ${order._id}</h3>
        <p>Total: ${order.totalAmount} €</p>
        <p>Status: ${order.paymentStatus}</p>
        <p>Date: ${new Date(order.createdAt).toLocaleString()}</p>
      `;

            orderList.appendChild(div);
        });

    });