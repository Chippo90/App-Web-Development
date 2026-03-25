//Get the registration form
const form = document.getElementById("registerForm");

//Listen when form is submitted
form.addEventListener("submit", async (e) => {

    //Prevent page reload
    e.preventDefault();

    //Get values from inputs
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        //Send POST request to backend
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {

            alert("User registered successfully!");

            //Redirect to login page
            window.location.href = "login.html";

        } else {

            alert(data.message || "Registration failed");

        }

    } catch (error) {

        console.error("Error:", error);
        alert("Server error");

    }

});