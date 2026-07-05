<?php
header('Content-Type: application/json; charset=utf-8');

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

// Evita inyección de cabeceras (header injection) quitando saltos de línea.
$clean = fn($v) => str_replace(["\r", "\n"], '', $v);
$name    = $clean($name);
$email   = $clean($email);
$subject = $clean($subject);

$mailSubject = "[Quantory] Nuevo mensaje: $subject";
$body = "Nombre: $name\n" .
        "Correo: $email\n" .
        "Asunto: $subject\n\n" .
        "Mensaje:\n$message\n";

$headers = "From: Quantory Web <no-reply@" . ($_SERVER['HTTP_HOST'] ?? 'quantory.com') . ">\r\n" .
           "Reply-To: $name <$email>\r\n" .
           "Content-Type: text/plain; charset=UTF-8";

$sent = mail($destination, $mailSubject, $body, $headers);

if ($sent) {
    respond(true, 'Mensaje enviado con éxito.');
} else {
    http_response_code(500);
    respond(false, 'No se pudo enviar el mensaje. Intenta más tarde.');
}
