<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>Sign In</title>
</head>
<body>
<h1 align="center">Sign In</h1>
<?php
	if(isset($_SESSION['validated']) &&  ($_SESSION['validated'] == "false")) {
		echo "<div align=\"center\"><label style=\"color: red\"; align=\"center\">Invalid Username and/or password.</label></div>";
	}
?>
<form align="center" action= "checkLogin.php" method="post">
		Username: <input type="text" name="username" autofocus></input><br><br>
		Password: <input type="password" name="password"></input><br><br>
		<input type="submit" id = "sub_button" value="Log In"></input>
</form>
</body>
</html>