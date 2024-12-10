<?php
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
$userName = $_POST["name"];
$infoArray = explode(',',$_POST["info"]);
$name = $infoArray[0];
$number = $infoArray[1];
$email = $infoArray[2];
$address = $infoArray[3];

$query = "UPDATE USER SET Name = '$name', PhoneNumber = '$number', Email = '$email', Address = '$address' where BINARY UserName = '$userName'";
$result = $mysqli->query($query);

if (!$result)
	printf("%s", $mysqli->error);
else
	echo $result;
?>
