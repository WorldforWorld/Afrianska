<?php

if (isset($_POST["first_name"]) && isset($_POST["email"]) && isset($_POST["message"]) ) { 

	// Формируем массив для JSON ответа
    $result = array(
    	'first_name' => $_POST["first_name"],
    	'email' => $_POST["email"],
    	'message' => $_POST["message"]
    ); 

    // Переводим массив в JSON
    echo json_encode($result); 
}

?>