<?php
// Configuración para el envío de correo
$destinatario = "fluxon@fluxon.com.co";
$asunto = "Nuevo mensaje desde el sitio web de Vitalkor";

// Verificar si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $nombre = $_POST["name"] ?? "No especificado";
    $email = $_POST["email"] ?? "No especificado";
    $telefono = $_POST["phone"] ?? "No especificado";
    $asuntoForm = $_POST["subject"] ?? "Consulta General";
    $mensaje = $_POST["message"] ?? "No especificado";
    
    // Validar datos
    $errores = [];
    
    if (empty($nombre)) {
        $errores[] = "El nombre es obligatorio";
    }
    
    if (empty($email)) {
        $errores[] = "El correo electrónico es obligatorio";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errores[] = "El formato del correo electrónico no es válido";
    }
    
    if (empty($mensaje)) {
        $errores[] = "El mensaje es obligatorio";
    }
    
    // Si no hay errores, enviar el correo
    if (empty($errores)) {
        // Construir el cuerpo del mensaje
        $cuerpoMensaje = "Has recibido un nuevo mensaje desde el formulario de contacto de Vitalkor.\n\n";
        $cuerpoMensaje .= "Nombre: " . $nombre . "\n";
        $cuerpoMensaje .= "Email: " . $email . "\n";
        $cuerpoMensaje .= "Teléfono: " . $telefono . "\n";
        $cuerpoMensaje .= "Asunto: " . $asuntoForm . "\n\n";
        $cuerpoMensaje .= "Mensaje:\n" . $mensaje . "\n";
        
        // Cabeceras del correo
        $cabeceras = "From: " . $email . "\r\n";
        $cabeceras .= "Reply-To: " . $email . "\r\n";
        $cabeceras .= "X-Mailer: PHP/" . phpversion();
        
        // Intentar enviar el correo
        if (mail($destinatario, $asunto, $cuerpoMensaje, $cabeceras)) {
            echo json_encode(["success" => true, "message" => "Mensaje enviado con éxito"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al enviar el mensaje"]);
        }
    } else {
        // Si hay errores, devolver los errores
        echo json_encode(["success" => false, "errors" => $errores]);
    }
    
    exit; // Terminar la ejecución del script
}

// Si se accede directamente al script sin enviar el formulario
echo json_encode(["success" => false, "message" => "Acceso no permitido"]);
?>
