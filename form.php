<?php
$name=$_POST["name"];
$email=$_POST["email"];
$msg=$_POST["msg"];

$message = 'Yo, this is your PHP File. Someone emailed you from your portfolio.'."\r\n" .
            "\r\nName: ".$name."\r\n".
            "\r\nE-Mail: ".$email."\r\n".
            "\r\nMessage: "."\r\n".
            "\r\n".$msg;

# Include the Autoloader (see "Libraries" for install instructions)
require 'vendor/autoload.php';
use Mailgun\Mailgun;

# Instantiate the client.
$mgClient = new Mailgun(getenv("MAILGUN_KEY"));
$domain = "sandboxd5cc9f6e67ed4d159663cb44e1485a7b.mailgun.org";

# Make the call to the client.
$result = $mgClient->sendMessage("$domain",
    array('from'    => 'Mailgun API <postmaster@sandboxd5cc9f6e67ed4d159663cb44e1485a7b.mailgun.org>',
        'to'      => 'Nicolas Toporcov <ntoporcov@me.com>',
        'subject' => 'New Message from the Website',
        'text'    => $message));
# You can see a record of this email in your logs: https://app.mailgun.com/app/logs

# You can send up to 300 emails/day from this sandbox server.
# Next, you should add your own domain so you can send 10,000 emails/month for free.

if (true){
    echo'success';
}else{
    echo'fail';
}
