<?php
//header("Access-Control-Allow-Origin: http://localhost:8000");

$user = "X34497163";
$host = "localhost";
$passwd = "X34497163";
$dbname = "X34497163";

$mysqli = new mysqli($host, $user, $passwd, $dbname);

$genre = $_POST["genre"];
$query = "SELECT GameName, Price FROM GAMES WHERE $genre = 1";
$result = $mysqli->query($query);
if (!$result)
{
	echo $mysql->error;
	return;
}
$rows = mysqli_fetch_all($result);
$json = json_encode($rows); 
echo $json;
?>
