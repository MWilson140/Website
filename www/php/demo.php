<?php
function printResults($result)
{
	//printf("%s", $result->num_rows);
	for ($i =1; $i <$result->num_rows+1; $i++)
	{
		$row = $result->fetch_row();
		printf("%s", $row[1]);
		//printf("Game: %s i %s numrows %s ", $row[1], $i, $result->num_rows);
		echo "<img src = \"images/{$row[1]}.png\" >";
 		if ($i % 2 == 0 && $i > 1)
		echo "<br />";
	}
}
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
$gameName = $_GET["gameName"];
if ($gameName == "*")
	$query = "SELECT * FROM Games";
else
	$query = "SELECT * FROM Games WHERE GameName like '%$gameName%'";

echo $query . "<br />";
$result = $mysqli->query($query);
if (!$result)
	printf("%s", $mysqli->error);
else
	printResults($result);	
?>
