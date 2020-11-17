<?php
$db_servername = 'localhost';
$db_username = 'dev';
$db_password = 'SehrSicher';
$db_name = 'guarded-worlds';

if(isset($_GET['uid'])) {
	$p_uid = $_GET['uid'];

	// Create connection
	$db_conn = new mysqli($db_servername, $db_username, $db_password, $db_name);

	// Check connection
	if ($db_conn->connect_error) {
		die("Connection failed: " . $db_conn->connect_error);
	}
	//echo "Connected successfully";

	$sql_query = [
		'get_character_by_uid' => "SELECT * FROM gw_characters WHERE uid='".$p_uid."'"
	];
	$sql_result = $db_conn->query($sql_query['get_character_by_uid']);

	if ($sql_result->num_rows > 0) {
		// output data of each row
		while($row = $sql_result->fetch_assoc()) {
			echo(json_encode($row));
		}
	} else {
		echo "0 results";
	}

	$db_conn->close();
} else {
	echo("Connection failed: No uID set");
	return;
}
?>