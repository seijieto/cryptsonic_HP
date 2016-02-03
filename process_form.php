<?php

// Define some constants
define("RECIPIENT_NAME", "Seiji Eto");
define("RECIPIENT_EMAIL", "seijieto@gmail.com");
define("EMAIL_SUBJECT", "Visitor Message");

// Read the form values
$success = false;
$sender_name = isset($_POST['sender_name']) ? preg_replace("/[^\.\-\' a-zA-Z0-9]/", "", $_POST['sender_name']) : "";
$sender_email = isset($_POST['sender_email']) ? preg_replace("/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['sender_email']) : "";
$message = isset($_POST['message']) ? preg_replace("/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['message']) : "";

// If all values exist, send the email
if ($sender_name && $sender_email && $message) {
  $recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
  $headers = "From: " . $sender_name . " <" . $sender_email . ">";
  $success = mail(RECIPIENT_EMAIL, EMAIL_SUBJECT, $message, $headers);
}

// Return an appropriate response to the browser
if (isset($_GET["ajax"])) {
  echo $success ? "success" : "error";
} else {
?>
<html>
  <head>
    <title>Thanks!</title>
  </head>
  <body>
  <?php if ($success) echo "<p>Thanks for sending your message! We'll get back to you shortly.</p>" ?>
  <?php if (!$success) echo "<p>There was a problem sending your message. Please try again.</p>" ?>
  <p>Click your browser's Back button to return to the page.</p>
  </body>
</html>
<?php
}
?>


