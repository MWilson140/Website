<?php
$host = "localhost";
$user = "X34497163";
$passwd = "X34497163";
$dbname = "X34497163";
$mysqli = new mysqli($host, $user, $passwd, $dbname);
if ($mysqli->connect_error)
	echo "Failed to connect";

$name = $_POST["name"];
$pword = $_POST["pword"];

$query = "SELECT Username, Staff FROM USER WHERE BINARY username = '$name' AND BINARY password = '$pword'";
$result = $mysqli->query($query);
if ($result->num_rows == 0)
{
	echo "false";
	return;
}
$rows = mysqli_fetch_all($result);
$json = json_encode($rows);
echo $json; 
?>
