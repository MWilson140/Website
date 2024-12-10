<?php
$host = "localhost";
$user = "X34497163";
$passwd = "X34497163";
$dbname = "X34497163";

$mysqli = new mysqli($host, $user, $passwd, $dbname);
if ($mysqli->connect_errno)
{
	echo "failed to connect";
	return;
}
$gameName = $_POST["gameName"];
$stock = $_POST["stock"];
$price = $_POST["price"];
$genres = $_POST["genres"];

$query = "INSERT INTO GAMES VALUES ('$gameName', $genres, '$stock', '$price')";
$result = $mysqli->query($query);
if (!$result)
	echo $mysqli->error . $query;
else
echo "inserted";
?>
