document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');

    // Add click event listener to the main "Log In" button
    loginButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get values from the input fields
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simple validation or mock action
        if (email && password) {
            alert('Login attempt simulated! Username: ' + email + '. (This is a static clone)');
            // In a real application, you would send this data to a server.
        } else {
            alert('Please enter both your username/email and password.');
        }
    });

    // You could also add a listener for the "Another Logged In Device" button
    const loginWithBtn = document.querySelector('.login-with-btn');
    loginWithBtn.addEventListener('click', function() {
        alert('Simulating login with another device option.');
    });
});