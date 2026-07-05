<?php
header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/phpmailer/Exception.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$destination = 'quantorycompany@gmail.com';

function respond($ok, $message) {
    echo json_encode(['ok' => $ok, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    respond(false, 'Método no permitido.');
}

// Honeypot: si este campo viene lleno, es un bot.
if (!empty($_POST['website'])) {
    respond(true, 'Mensaje enviado.');
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    http_response_code(422);
    respond(false, 'Completa todos los campos.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    respond(false, 'El correo electrónico no es válido.');
}

$config = require __DIR__ . '/mail-config.php';

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = $config['smtp_host'];
    $mail->Port       = $config['smtp_port'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp_user'];
    $mail->Password   = $config['smtp_pass'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom($config['smtp_user'], 'Quantory Web');
    $mail->addAddress($destination);
    $mail->addReplyTo($email, $name);

    $mail->Subject = "[Quantory] Nuevo mensaje: $subject";
    $mail->Body    = "Nombre: $name\n" .
                      "Correo: $email\n" .
                      "Asunto: $subject\n\n" .
                      "Mensaje:\n$message\n";

    $mail->send();
    respond(true, 'Mensaje enviado con éxito.');
} catch (Exception $e) {
    error_log('Mail error: ' . $mail->ErrorInfo);
    http_response_code(500);
    respond(false, 'No se pudo enviar el mensaje. Intenta más tarde.');
}
