<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $ip = $_SERVER['REMOTE_ADDR']; // Obtener la IP del usuario
    $tiempo_actual = time();

    // Verificar si hay un historial de envíos en la sesión
    if (isset($_SESSION['ultimo_envio']) && ($tiempo_actual - $_SESSION['ultimo_envio']) < 60) {
        echo "Por favor, espera antes de enviar otro mensaje.";
        exit;
    } else {
        $_SESSION['ultimo_envio'] = $tiempo_actual; // Actualizar el tiempo del último envío
    }

    function limpiarDatos($data) {
        return htmlspecialchars(trim($data));
    }

    // Obtener los datos del formulario
    $nombre = limpiarDatos($_POST['nombre']);
    $telefono = limpiarDatos($_POST['telefono']);
    $email = limpiarDatos($_POST['email']);
    $tema = limpiarDatos($_POST['tema']);
    $mensaje = limpiarDatos($_POST['mensaje']);
    
    // Validaciones adicionales del lado del servidor
    $emailRegex = "/^[^\s@]+@[^\s@]+\.[^\s@]+$/";
    $telefonoRegex = "/^[0-9]{9}$/";

    if (empty($nombre) || empty($telefono) || empty($email) || empty($tema) || empty($mensaje)) {
        echo "Todos los campos son obligatorios.";
        exit;
    }

    if (!preg_match($telefonoRegex, $telefono)) {
        echo "El número de teléfono no es válido.";
        exit;
    }

    if (!preg_match($emailRegex, $email)) {
        echo "El correo electrónico no es válido.";
        exit;
    }

    // Proteger contra inyección de correo
    if (preg_match("/[\r\n]/", $nombre) || preg_match("/[\r\n]/", $email)) {
        echo "Datos no válidos.";
        exit;
    }

    $destinatario = "Crs.barroso@gmail.com"; 
    $asunto = "Nuevo mensaje de contacto: $tema";
    $cuerpo = "Has recibido un nuevo mensaje de contacto.\n\n".
              "Nombre: $nombre\n".
              "Teléfono: $telefono\n".
              "Email: $email\n".
              "Mensaje:\n$mensaje";
    
    // Cabeceras del correo
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Intentar enviar el correo
    if (mail($destinatario, $asunto, $cuerpo, $headers)) {
        echo "¡El mensaje ha sido enviado con éxito!";
    } else {
        echo "Lo siento, ha habido un problema al enviar tu mensaje.";
    }
} else {
    echo "El formulario debe enviarse utilizando el método POST.";
}
?>