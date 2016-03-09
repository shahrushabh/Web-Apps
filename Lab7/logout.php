<?php
session_start();
session_destroy();
header("Location: ../Lab7/login.php");
?>