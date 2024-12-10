<?php
header("Access-Control-Allow-Origin: http://localhost:8000");
$host ="localhost";
$user ="X34497163";
$passwd = "X34497163";a
$dbname = "X34497163";

$mysqli = new mysqli($host, $user, $passwd, $dbname);
if ($mysqli->connect_errno)
    echo "failed to connect";

$name = $_POST["name"];

// Fetch cart details
$query = "SELECT CART.UserName, CART.GameName, GAMES.Price, COUNT(*) as Quantity FROM CART INNER JOIN GAMES ON CART.GameName = GAMES.GameName WHERE BINARY UserName = '$name' GROUP BY CART.GameName, GAMES.Price, CART.UserName";
$result = $mysqli->query($query);

if (!$result) {
    echo $mysqli->error;
    return;
}

$rows = mysqli_fetch_all($result);

$allItemsAvailable = true;

foreach ($rows as $temp) {
    // Extract cart details
    $userName = $temp[0];
    $gameName = $temp[1];
    $price = $temp[2];
    $quantity = $temp[3];

    // Check if there is enough stock
    $checkStockQuery = "SELECT Stock FROM GAMES WHERE GameName = '$gameName'";
    $stockResult = $mysqli->query($checkStockQuery);
    $stockRow = mysqli_fetch_assoc($stockResult);
    $currentStock = $stockRow['Stock'];

    if ($currentStock < $quantity) {
        // Not enough stock for one item, set flag to false
        $allItemsAvailable = false;
        echo "Error: Not enough stock for $gameName (Requested: $quantity, Available: $currentStock)<br/>";
        break; // Exit the loop if any item is out of stock
		return;
    }
}

if ($allItemsAvailable) {
    // All items are available, update the stock for each item in the cart
	foreach ($rows as $temp) 
	{
		$userName = $temp[0];
       		$gameName = $temp[1];
       		$quantity = $temp[3];

        // Update stock
		$updateStockQuery = "UPDATE GAMES SET Stock = Stock - $quantity WHERE GameName = '$gameName'";
    	    	$mysqli->query($updateStockQuery);

        // Handle the rest of your cart logic here...
        }
	$query = "DELETE FROM CART WHERE BINARY UserName = '$name'";
	$result = $mysqli->query($query);
	
	if (!$result) {
   	 echo $mysqli->error;
	    return;
	}
	else
		echo "Cart ordered";
} 
?>
