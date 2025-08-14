```php
    <?php
    /**
     * Gemini Proxy Script
     *
     * Este script recibe una URL, la procesa y devuelve una respuesta JSON.
     * Se carga el entorno de WordPress para tener acceso a sus funciones.
     */

    // Cargar el entorno de WordPress para usar sus funciones (opcional pero recomendado)
    define('WP_USE_THEMES', false);
    require_once( __DIR__ . '/wp-load.php' );

    // Establecer la cabecera de respuesta como JSON
    header('Content-Type: application/json');

    // 1. Validar el m├®todo de la solicitud
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        // Si no es POST, enviar un error.
        wp_send_json_error(
            ['message' => 'Error: M├®todo de solicitud no permitido. Se esperaba POST.'],
            405 // C├│digo de estado HTTP 405 Method Not Allowed
        );
        exit;
    }

    // 2. Validar y sanitizar la URL recibida
    if (!isset($_POST['submitted_url']) || empty($_POST['submitted_url'])) {
        // Si no se envi├│ la URL, enviar error.
        wp_send_json_error(
            ['message' => 'Error: No se proporcion├│ ninguna URL.'],
            400 // C├│digo de estado HTTP 400 Bad Request
        );
        exit;
    }

    // Sanitizamos la URL para asegurarnos de que es segura.
    $url_recibida = esc_url_raw($_POST['submitted_url']);

    if (!filter_var($url_recibida, FILTER_VALIDATE_URL)) {
        // Si la URL no es v├ílida despu├®s de sanitizar.
        wp_send_json_error(
            ['message' => 'Error: La URL proporcionada no es v├ílida.'],
            400
        );
        exit;
    }

    // 3. L├│gica de procesamiento (Aqu├¡ es donde te conectar├¡as a Gemini u otra API)
    // Por ahora, simplemente simularemos un procesamiento exitoso.
    $processed_message = "Hemos recibido y procesado exitosamente la URL: " . esc_html($url_recibida);
    $analysis_result = "An├ílisis de la IA: La p├ígina parece tratar sobre un tema interesante."; // Mensaje de ejemplo

    // 4. Devolver una respuesta JSON exitosa
    // Usamos wp_send_json_success para estandarizar la respuesta.
    wp_send_json_success([
        'original_url' => $url_recibida,
        'message' => $processed_message,
        'analysis' => $analysis_result,
    ]);

    exit;
    ```

**Explicaci├│n del Proxy:**
*   **`require_once( __DIR__ . '/wp-load.php' );`**: Cargamos el n├║cleo de WordPress para poder usar sus funciones como `wp_send_json_success`, `esc_url_raw`, etc. Es una pr├íctica robusta.
*   **Validaci├│n**: Siempre valida y sanitiza cualquier dato que recibas (`$_POST`). Aqu├¡ nos aseguramos de que la solicitud sea `POST` y que la URL sea v├ílida.
*   **`wp_send_json_success()` / `wp_send_json_error()`**: Estas son funciones de WordPress que formatean la respuesta en un est├índar JSON, establecen las cabeceras correctas y terminan la ejecuci├│n. Es la forma correcta de devolver datos a una solicitud AJAX o API en WordPress.

---