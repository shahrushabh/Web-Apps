<?php
include 'viewPosts.php';
session_start();


$file = file_get_contents('posts.txt');
$postArray = json_decode($file);



$postArray[$_POST['index']] ['post'] = $_POST['post']; //change 



//$newFile = json_encode($postArray);
//file_put_contents('posts.txt', $newFile);



?>

