<?php
$user = "X34497163";
$host ="localhost";
$passwd = "X34497163";
$dbname = "X34497163";

$mysqli = new mysqli ($host, $user, $passwd, $dbname);
$game = $_POST["game"];
$name = $_POST["name"];
if ($mysqli->connect_errno)
{
	echo "failed to connect";
	return;
}

$query = "DELETE FROM CART WHERE BINARY GameName = '$game' and BINARY UserName ='$name'";
$result = $mysqli->query($query);
if (!$result)
{	
	echo $mysqli->error;
}

echo "true";
?>
