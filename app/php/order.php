<?php
    // CORS headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $userName = $_POST["userName"];
    $userMail = $_POST["userMail"];
    $content = $_POST["content"];

    $error_msg = "Error performing the request.";

    $link = mysql_connect('localhost', 'LOGIN', 'PASS') or die($error_msg . " (mysql_connect)"); 
    mysql_select_db('mse') or die($error_msg . " (mysql_select_db)");

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        // $headers = 'From: ' . "YOUR_MAIL" . "\r\n" .
        //    'Reply-To: ' . $userMail . "\r\n" .
        //    'X-Mailer: PHP/' . phpversion();

        // send email
        //if( mail("YOUR_MAIL","Mariage - commande photos photographe pour ".$userName, "Mail : " . $userMail . " (faire répondre sur le mail pour répondre directement à la personne)\n\nContenu de la commande : \n\n".$content."\n\n--- fin de la commande ---", $headers) ) {
        //    echo "Demande effectuée avec succès.";
        //} else {
        //    echo "Error performing the request.";
        //}
        
        $query = "INSERT INTO orders (userName, userMail, content) VALUES ('".$userName."', '".$userMail."', '".$content."')";

        if (mysql_query($query) === TRUE) {
            echo "Demande effectuée avec succès.";
        } else {
            echo $error_msg . " (mysql_query POST)";
        }
    }

    else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        
        $query = 'SELECT * FROM orders';
        $result = mysql_query($query) or die($error_msg . " (mysql_query GET)");
        echo "[";
        $first = true;
        while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {
            if(!$first) echo ",\n"; else { $first = false; echo "\n";}
            echo "{";
            echo "\"userName\": \"" . $line["userName"] . "\",";
            echo "\"userMail\": \"" . $line["userMail"] . "\",";
            $content = trim(preg_replace('/\n/', '\\n', $line["content"]));
            echo "\"content\": \"" . $content . "\"";
            echo "}";
        }
        echo "]"; 
        mysql_free_result($result);  
    }

    mysql_close($link);

?>
