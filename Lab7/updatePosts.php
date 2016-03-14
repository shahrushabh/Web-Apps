<?php
session_start();

$user = $_SESSION['username'];
$isNewPost = $_POST['new'];
if(isset($_POST['data'])) {
	$postData = $_POST['data'];
}
if(isset($_POST['newData'])) {
	$newPostData = $_POST['newData'];
}
if(isset($_POST['oldData'])) {
	$oldPostData = $_POST['oldData'];
}

$file = file_get_contents('posts.txt');
$postsArray = json_decode($file);

// Check if this will be a new Post.
if($isNewPost == 1) {
	$newEntry = array($user=>$postData);
	$postsArray[count($postsArray)] = $newEntry;
}

// Otherwise update the existing post. 
else {
	foreach (array_values($postsArray) as $index => $jsons) {
		foreach ($jsons as $key => $value) {
			if($value == $oldPostData) {
				$postsArray[$index]->$key = $newPostData;
			}
		}
	}
}
// Update the file.
file_put_contents('posts.txt', json_encode($postsArray));
exit();

?>