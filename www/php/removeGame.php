<?php
$host = "localhost";
$user = "X34497163";
$dbname = "X34497163";
$passwd = "X34497163";

$mysqli = new mysqli($host, $user, $passwd, $dbname);
$gameName = $_POST["gameName"];
$query = "DELETE FROM GAMES WHERE GameName = '$gameName'";

$result = $mysqli->query($query);

if (!$result)
{
	echo "error" . $mysqli->error;
}
else
	echo "deleted"
?>

