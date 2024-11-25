<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $cart = json_decode(file_get_contents('php://input'), true); // You might pass the cart data here or get from session

    // Send email logic (ensure the mail server is configured)
    $subject = "Your Order Receipt";
    $message = "Thank you for your order!\n\n";
    $total = 0;

    foreach ($cart as $item) {
        $message .= $item["name"] . " - PHP " . ($item["price"] * $item["quantity"]) . "\n";
        $total += $item["price"] * $item["quantity"];
    }

    $message .= "\nTotal: PHP " . $total;

    // Mail headers
    $headers = "From: no-reply@clothing-shop.com";

    // Send email
    mail($email, $subject, $message, $headers);
    echo "Receipt sent to $email!";
}
?>
