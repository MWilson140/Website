<?php
$host = "localhost";
$user = "X34497163";
$passwd = "X34497163";
$dbname = "X34497163";

$mysqli = new mysqli($host, $user, $passwd, $dbname);
if ($mysqli->connect_errno)
	echo "Failed to connect";

$name = $_POST["name"];
$game = $_POST["gameName"];
$query = "INSERT INTO CART(UserName, GameName) VALUES ('$name', '$game')";
$result = $mysqli->query($query);
if ($result)
	echo "Game Inserted";
else
	echo "not inserted " . $mysqli->error;
?>
