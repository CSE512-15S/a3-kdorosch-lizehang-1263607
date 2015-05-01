<?php
	ini_set('display_errors',1);
	error_reporting(E_ALL);
	header('Content-Type: application/json');
	header('Access-Control-Allow-Origin: *');

	$db = new PDO("mysql:dbname=CLUE;host=localhost","root","461298");
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	// subject, gender, spcl_prog_text, resident, class
	$dimension = $_GET['q'];

	if (strcmp($dimension, "subject") == 0) {
		$query = "SELECT id, subject, checkin_date FROM checkIn WHERE subject <> 'Commuter Commons' ORDER BY subject;";
	} else if (strcmp($dimension, "s1_gender") == 0) {
		$query = "SELECT id, s1_gender, checkin_date FROM checkIn WHERE subject <> 'Commuter Commons' ORDER BY s1_gender;";
	} else if (strcmp($dimension, "spcl_prog_text") == 0) {
		$query = "SELECT id, spcl_prog_text, checkin_date FROM checkIn WHERE subject <> 'Commuter Commons' ORDER BY spcl_prog_text;";
	} else if (strcmp($dimension, "resident") == 0) {
		$query = "SELECT id, resident, checkin_date FROM checkIn WHERE subject <> 'Commuter Commons' ORDER BY resident;";
	} else if (strcmp($dimension, "class") == 0) {
		$query = "SELECT id, class, checkin_date FROM checkIn WHERE subject <> 'Commuter Commons' ORDER BY class;";
	}

	$rows = $db->query($query);

	$result = "[";
	foreach ($rows as $row) {
		$currJSON = sprintf("{\"%s\": \"%s\", \"%s\": \"%s\"},\n", "category", $row[1], "check_in_date", $row[2]);
		$result = $result.$currJSON;
	}
	$result = substr($result, 0, strlen($result)-2);
	$result = $result."]";
	
	print_r($result);
?>