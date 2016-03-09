<?php
session_start();
$_SESSION['validated'] = "true";
$file = file_get_contents('posts.txt');
$postArray = json_decode($file);

// Generate table from current posts.txt file.
function table(){ //creates the table

	echo "<table border=2>";
	foreach ($GLOBALS['postArray'] as $index => $jsons) {
		foreach ($jsons as $key => $value) {
			print "<tr><td>";
			print $key;
			print "<td>";
			print $value;
			print "<td>";
			print "<a href='#' onclick='doSomething(\"$key,$value\")'>Edit Post</a>"; //edit post link to js
			print "</td></tr>";
		}
	}
}

?>

<!DOCTYPE html>
<html>
<head>
	<title>
		Feeds
	</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
</head>
<body>
<div id="logout" align="right">
	<a href="logout.php">Logout</a>
</div>
<script type="text/javascript">
	function posts () {
		posts.prototype.editPost = {}
	}
	function doSomething(key,value) { //prompt
	    var newPost = prompt("Edit Post", key);
	}
	function submitPost() {

	}
</script>

<?php table();?>
<form action="viewPosts.php" method="post">
New Post: <br>
<textarea name="message" cols="40" rows="5"></textarea>
<input type="submit" action="submitPost()">
</br>
Current Posts 
</form>

</body>
</html>