<?php
// Configuración de la base de datos
$servidor = "localhost";  // O la IP del servidor si es remoto
$usuario = "root";        // Tu usuario en phpMyAdmin (por defecto es "root")
$clave = "";             // La contraseña de MySQL (por defecto está vacía en XAMPP)
$baseDeDatos = "pwabd"; // El nombre de tu base de datos

// Crear la conexión
$conn = new mysqli($servidor, $usuario, $clave, $baseDeDatos);

// Verificar si la conexión es exitosa
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
} else {
    echo "Conexión exitosa a la base de datos.";
}

// Realiza una consulta simple para verificar que todo funciona
$sql = "SELECT * FROM users";  // Cambia 'tu_tabla' por una tabla real de tu base de datos
$resultado = $conn->query($sql);

// Mostrar los resultados de la consulta
if ($resultado->num_rows > 0) {
    // Muestra los datos de cada fila
    while($fila = $resultado->fetch_assoc()) {
        echo "id: " . $fila["id"] . " - Nombre: name" . $fila["name"] . "<br>"," - Nombre:email " . $fila["email"] . "<br>";  // Cambia 'nombre_columna' por una columna real
    }
} else {
    echo "0 resultados";
}

// Cerrar la conexión
$conn->close();
?>
