<?php
session_start();

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


<script type="text/javascript">
function posts () {
	posts.prototype.editPost = {}
}
function doSomething(key,value) { //prompt
    var newPost = prompt("Edit Post", key);
}
</script>

<html> 
<title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
</title>
<body>

<form action="viewPosts.php" method="post">
<?php table();?>
New Post: <br>
<textarea name="message" cols="40" rows="5"></textarea>
<input type="submit" action="submitPost()">
</br>
Current Posts 
</form>

</body>
</html>