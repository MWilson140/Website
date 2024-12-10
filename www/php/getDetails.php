<?php

$user ="X34497163";
$host ="localhost";
$passwd = "X34497163";
$dbname = "X34497163";
$mysqli = new mysqli($host, $user, $passwd, $dbname);
if ($mysqli->connect_errno)
	echo "Failed to connect";


$name = $_POST["name"];
$query = "SELECT Name, PhoneNumber, Email, Address FROM USER WHERE BINARY UserName = '$name'";
$result = $mysqli->query($query);
$rows =  mysqli_fetch_all($result);
$json = json_encode($rows);
echo $json;
?>
