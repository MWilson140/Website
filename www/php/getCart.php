<?php
//echo "yre[";
$host ="localhost";
$user ="X34497163";
$passwd = "X34497163";
$dbname = "X34497163";

$mysqli = new mysqli($host, $user, $passwd, $dbname);
if ($mysqli->connect_errno)
	echo "failed to connect";
$name = $_POST["name"];
$query = "SELECT  CART.UserName, CART.GameName, GAMES.Price, COUNT(*) FROM CART INNER JOIN GAMES ON CART.GameName = GAMES.GameName WHERE BINARY UserName = '$name' GROUP BY CART.GameName, GAMES.Price, CART.UserName";
$result = $mysqli->query($query);
if (!$result)
{
	echo $mysqli->error;
	return;
}
$rows = mysqli_fetch_all($result);
$json = json_encode($rows);
echo $json;
?>
