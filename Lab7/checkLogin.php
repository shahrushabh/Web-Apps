<?php
session_start();

$jarr = file_get_contents("users.txt");
$darr = json_decode($jarr);
$uname = $_POST['username'];
$pass = $_POST['password']; 
$response = array("result"=>"");

foreach ($darr as $index => $jsons) {
    $objvars = get_object_vars($jsons);
    if($uname == $objvars['username']) {
        if($pass == $objvars['password']) {
            $_SESSION['username'] = $_POST['username'];
            $_SESSION['validated'] = "true";
            $response["result"] = "verified";
            echo json_encode($response);
            exit();
        }
    }
}
$_SESSION['validated'] = "false";
$response["result"] = "nonverified";
echo json_encode($response);
?>