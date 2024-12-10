<?php
$host = "localhost";
$user = "X34497163";
$passwd = "X34497163";
$dbname = "X34497163";

$mysqli = new mysqli ($host, $user, $passwd, $dbname);

$username = $_POST["username"];
$password = $_POST["password"];
$name = $_POST["name"];
$number = $_POST["number"];
$email = $_POST["email"];
$address = $_POST["address"];

$query = "INSERT INTO USER VALUES ('$username', '$password', '$name', '$number', '$email', '$address', 0)";
$result = $mysqli->query($query);
if (!$result)
	echo $mysqli->error;
echo "inserted";


?>
