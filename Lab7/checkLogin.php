<?php
session_start();

$jarr = file_get_contents("users.txt");
$darr = json_decode($jarr);
$uname = $_POST['username'];
$pass = $_POST['password'];


foreach ($darr as $index => $jsons) {
	$objvars = get_object_vars($jsons);
	if($uname == $objvars['username']) {
		if($pass == $objvars['password']) {
			$_SESSION['username'] = $_POST['username'];
			$_SESSION['validated'] = "true";
			header('Location: ../Lab7/viewPosts.php');
		} else {
			// echo "Invalid username and/or password. <a href=\"login.html\">Please try again!</a>";
			$_SESSION['validated'] = "false";
			header("Location: ../Lab7/login.php");
		}
	}
	else {
		$_SESSION['validated'] = "false";
		header("Location: ../Lab7/login.php");
	}

}

?>