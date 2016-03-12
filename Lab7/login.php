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
<form align="center" id="loginForm">
	Username: <input type="text" id="username" autofocus></input><br><br>
	Password: <input type="password" id="password"></input><br><br>
</form>
<div align="center">
	<input type="submit" id = "sub_button" value="Log In"></input>
</div>

	<script type="text/javascript">
		$('#sub_button').click(function submit() {
			var username = $('#username').val();
			var password = $('#password').val();
			$.ajax({url: "checkLogin.php",
					type: "post",
					datatype: "json",
					data: {"username":username,"password":password},
					success: function(data) {
						var response = JSON.parse(data)['result'];
						console.log(response);
						if(response !== "verified") {
							var error = "<div id=\"error\" align=\"center\"><label style=\"color: red\"; align=\"center\">Invalid Username and/or password.</label></div><br>";
							$('#loginForm').prepend(error);
						} else {
							window.location.href = "../Lab7/viewPosts.php";
						}
					}
				}
			);
		});
	</script>
</body>
</html>