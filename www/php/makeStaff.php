<?php
$host ="localhost";
$user = "X34497163";
$passwd = "X34497163";
$dbname = "X34497163";

$mysqli = new mysqli ($host, $user, $passwd, $dbname);
if ($mysqli->connect_errno)
{
	echo "failed to connect";
	return;
}
$name = $_POST["name"];
$query = "UPDATE USER SET STAFF = '1' WHERE BINARY UserName = '$name'";
$mysqli->query($query);
?>
