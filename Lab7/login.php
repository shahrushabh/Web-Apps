<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
	<title>Sign In</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
</head>
<body>
<h1 align="center">Sign In</h1>
<?php
	if(isset($_SESSION['validated']) &&  ($_SESSION['validated'] == "false")) {
		echo "<div align=\"center\"><label style=\"color: red\"; align=\"center\">Invalid Username and/or password.</label></div>";
	}
?>
<script type="text/javascript">
	$(document).ready(function() {
		$('#sub_button').click(function() {
			var username = $('#username').val();
			var password = $('#password').val();
			$.ajax({url: "checkLogin.php",
					type: "post",
					datatype: "json",
					data: {"username":username,"password":password},
					success: function(data) {
						if(data.result === "verified") {
							
						}
					}});
		});
	});
</script>
<form align="center" method="post">
		Username: <input type="text" id="username" autofocus></input><br><br>
		Password: <input type="password" id="password"></input><br><br>
		<input type="submit" id = "sub_button" value="Log In"></input>
</form>
</body>
</html>