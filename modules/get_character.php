<?php
$db_servername = '#';
$db_username = '#';
$db_password = '#';
$db_name = '#';

if(isset($_GET['uid'])) {
	$p_uid = $_GET['uid'];
	$p_task = (isset($_GET['task'])) ? $_GET['task'] : 'get_character_by_uid';
	$p_data = (isset($_GET['data'])) ? $_GET['data'] : '';

	if($p_data != '' && $p_task == 'save_character_by_uid') {
		$new_data = setup_new_data($p_data);
	}


	// Create connection
	$db_conn = new mysqli($db_servername, $db_username, $db_password, $db_name);

	// Check connection
	if ($db_conn->connect_error) {
		die("Connection failed: " . $db_conn->connect_error);
	}
	//echo "Connected successfully";

	$sql_query = [
		'get_character_by_uid' => "SELECT * FROM gw_characters WHERE uid='".$p_uid."'",
		'save_character_by_uid' => "UPDATE gw_characters SET ". $new_data ." WHERE uid='".$p_uid."'"
	];

	$sql_result = $db_conn->query($sql_query[$p_task]);

	if ($sql_result->num_rows > 0) {
		// output data of each row
		while($row = $sql_result->fetch_assoc()) {
			//var_dump($row);
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

function setup_new_data(entry_data) {
	$return_data = '';

	// "Itemname = 'content', Itemname = 'content'"


	return $return_data;
}


?>