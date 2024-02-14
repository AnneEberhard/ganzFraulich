<?php

$recipient = 'anne.eberhard@gmx.net';
##$redirect = 'success.html';


switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): // Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case ("POST"): // Send the email;
        header("Access-Control-Allow-Origin: *");

        $newsletterStatus = isset($_POST['newsletter']) ? $_POST['newsletter'] : '0';

        if ($newsletterStatus === '1') {
            $newsletterMessage = "Sender/in hat sich für den Newsletter angemeldet.";
        } else {
            $newsletterMessage = "";
        }

        $subject = "Contact From " . $_POST['name'];
        $headers = "From: noreply@ganzfraulich.de";
        $message = $_POST['message'] . "\n\n" . $newsletterMessage;

        mail($recipient, $subject, $message, $headers, $newsletterMessage);

        break;
    default: // Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
?>