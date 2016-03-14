<?php
session_start();
$_SESSION['validated'] = "true";

// Generate table from current posts.txt file.
function table(){ //creates the table

	$file = file_get_contents('posts.txt');
	$postsArray = json_decode($file);
	$table = "";
	$table = "<table id=\"posts\" border=2 align=\"center\">";
	foreach ($postsArray as $index => $jsons) {
		foreach ($jsons as $key => $value) {
			$table .= "<tr><td align=\"center\">";
			$table .= htmlspecialchars($key);
			$table .= "<td align=\"center\">";
			$table .= htmlspecialchars($value);
			if($key == $_SESSION['username']) {
				$table .= "<td>";
				$table .= "<button style=\"background: white;\" onclick='doSomething(\"$value\",\"$index\")'><img style=\"width: 20px; height: 20px;\" src=\"edit.png\"></button>";
			}
			$table .= "</td></tr>";
		}
	}
	// Print the generated table.
	print $table;
}

?>

<!DOCTYPE html>
<html>

<head>
	<title> Feeds </title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
</head>

<body>
	<div id="logout" align="right">
		<a href="logout.php">Logout</a>
	</div>
	New Post: <br>
	<textarea id="message" cols="40" rows="5"></textarea>
	<button id="post" onclick="submitPost()">Post</button><br>
	<h3 align="center">Current Feeds</h3>
	<?php table(); ?>
	<script type="text/javascript">
	    // AJAX call to updatePpost.php This will UPDATE the existing post.
		function doSomething(usrpost,index) {
			var oldPost = usrpost;
			oldPost = $('#posts')[0].rows[index].cells[1].innerHTML;
		    var newPost = prompt("Edit Post", oldPost);
		    if((newPost == null) || (newPost == "")) {
		    	return;
		    }
			$.ajax({url: "updatePosts.php",
				type: "post",
				datatype: "json",
				data: {"oldData":oldPost,"newData":newPost,"new":0},
				success: function() {
						var table = $('#posts')[0];
						table.rows[index].cells[1].innerHTML = newPost;
					}
				});
		}
	    // AJAX call to updatePost.php This will CREATE a new post in the file.
		function submitPost() {
		    var newPost = $('#message').val();
		    var user = "<?= $_SESSION['username']?>";
			$.ajax({url: "updatePosts.php",
				type: "post",
				datatype: "json",
				data: {"data":newPost,"new":1},
				success: function(data) {
						$('#message').val('');
						var add = "<tr><td align=\"center\">" + user + "<td align=\"center\">" + newPost + "<td>"
						add += "<button style=\"background: white;\" onclick='doSomething(\"$value\")'><img style=\"width: 20px; height: 20px;\" src=\"edit.png\"></button></td></tr>";
						$('#posts').append(add);
					}
				});
		}
	</script>
</body>
</html>