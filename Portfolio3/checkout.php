<?php

if(!isset($_POST["cart"])) {
	header("Location: ../Portfolio2/");
}

// Save current cart in the session.
$cart = json_decode($_POST["cart"]);

// Process Submission, i.e. Append it to the file cotaining the orders history.
if((isset($_POST["checkout"])) && ($_POST["checkout"] == "true")) {
	$file = "orders.txt";
	file_put_contents($file, $_POST["cart"], FILE_APPEND | LOCK_EX);
	$response = array("status" => "submitted");
	echo json_encode($response);
}

?>