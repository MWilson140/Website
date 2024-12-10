<?php
//echo "true";

$host = "localhost";
$user = "X34497163";
$passwd = "X34497163";
$dbname = "X34497163";

$mysqli = new mysqli($host, $user, $passwd, $dbname);
if ($mysqli->connect_errno)
	echo "Failed to connect";
else
	{
		//echo "connected" . "<br />";
	}
$gameName = $_POST["gameName"];
$query = "SELECT GameName, Price FROM GAMES WHERE GameName like '%$gameName%'";
$result = $mysqli->query($query);
$rows = mysqli_fetch_all($result);
$json = json_encode($rows);
echo $json;

?>
