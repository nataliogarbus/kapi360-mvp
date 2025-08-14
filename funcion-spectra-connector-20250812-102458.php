Loaded cached credentials.
┬íHola! Por supuesto. Como desarrollador WordPress senior, me complace guiarte en este proceso. No solo te dar├® el c├│digo, sino que te explicar├® el *porqu├®* de cada paso, para que entiendas la l├│gica y las buenas pr├ícticas detr├ís de esta implementaci├│n.

Aqu├¡ tienes una gu├¡a completa y detallada.

---

### **Gu├¡a Completa: Conectar Spectra Forms con un Proxy PHP para Procesamiento Externo**

En esta gu├¡a, vamos a crear una funcionalidad que se engancha a un formulario de Spectra. Cuando un usuario env├¡a el formulario con una URL, esa URL se enviar├í de forma segura a un script PHP en nuestro propio servidor (actuando como un proxy). Este script podr├¡a, en el futuro, comunicarse con una API externa como Gemini. Finalmente, mostraremos la respuesta procesada de vuelta al usuario en la misma p├ígina del formulario.

#### **Estructura del Proyecto**

Necesitaremos dos piezas de c├│digo principales:

1.  **El Script Proxy (`gemini-proxy.php`):** Un archivo PHP independiente en la ra├¡z de tu instalaci├│n de WordPress. Ser├í el endpoint que recibe la URL.
2.  **El C├│digo en `functions.php`:** El c├│digo que se conecta al hook de Spectra, llama a nuestro proxy y maneja la respuesta para mostrarla.

---

### **Paso 1: Crear el Script Proxy (`gemini-proxy.php`)**

Este script es nuestro intermediario. Su trabajo es recibir la solicitud desde WordPress, procesarla (en este ejemplo, solo devolver├í un mensaje de ├®xito, pero aqu├¡ es donde llamar├¡as a una API externa) y devolver una respuesta limpia en formato JSON.

1.  Crea un nuevo archivo llamado `gemini-proxy.php` en el directorio ra├¡z de tu instalaci├│n de WordPress (en la misma carpeta donde se encuentran `wp-config.php` y `wp-load.php`).

2.  Pega el siguiente c├│digo en `gemini-proxy.php`:

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

### **Paso 2: Configurar el Formulario de Spectra**

Ahora, aseg├║rate de que tu formulario de Spectra est├® configurado correctamente.

1.  Edita la p├ígina que contiene tu formulario de Spectra.
2.  Selecciona el campo de texto donde los usuarios pegar├ín la URL.
3.  En la configuraci├│n del bloque, ve a la pesta├▒a **Avanzado**.
4.  En el campo **"Nombre del Campo" (Field Name)**, as├¡gnale un nombre ├║nico y descriptivo. Para este ejemplo, usaremos: `submitted-url`. **Este paso es crucial**, ya que es la clave que usaremos en PHP para obtener el valor.
5.  Guarda la p├ígina.

---

### **Paso 3: La Funci├│n Principal en `functions.php`**

Aqu├¡ es donde ocurre la magia. A├▒adiremos una funci├│n al `functions.php` de tu tema (preferiblemente un tema hijo) que se ejecutar├í despu├®s de que el formulario de Spectra se env├¡e con ├®xito.

1.  Abre el archivo `functions.php` de tu tema activo.
2.  A├▒ade el siguiente c├│digo al final del archivo:

    ```php
    <?php
    /**
     * Maneja el env├¡o exitoso de un formulario de Spectra para enviarlo a un proxy.
     *
     * @param array $form_data Los datos enviados desde el formulario.
     */
    function kdev_handle_spectra_form_submission( $form_data ) {
        // 1. Definir el nombre del campo que estamos buscando (el mismo que en el editor de Spectra)
        $field_name = 'submitted-url';

        // 2. Verificar si nuestro campo espec├¡fico fue enviado y no est├í vac├¡o.
        if ( ! isset( $form_data[ $field_name ] ) || empty( $form_data[ $field_name ] ) ) {
            // Si el campo no existe en este env├¡o, no hacemos nada.
            return;
        }

        // 3. Sanitizar la URL obtenida del formulario.
        $submitted_url = esc_url_raw( $form_data[ $field_name ] );

        // 4. Definir la URL de nuestro script proxy.
        // Usamos site_url() para construir una URL absoluta y fiable.
        $proxy_url = site_url( '/gemini-proxy.php' );

        // 5. Preparar y ejecutar la solicitud a nuestro proxy usando wp_remote_post.
        $response = wp_remote_post( $proxy_url, [
            'method'      => 'POST',
            'timeout'     => 15, // 15 segundos de tiempo de espera
            'redirection' => 5,
            'blocking'    => true, // Espera la respuesta antes de continuar
            'headers'     => [],
            'body'        => [
                'submitted_url' => $submitted_url,
            ],
        ]);

        // 6. Manejar la respuesta del proxy.
        if ( is_wp_error( $response ) ) {
            // Si wp_remote_post fall├│ (ej. no se pudo conectar al proxy).
            $error_message = $response->get_error_message();
            // Guardamos un mensaje de error en un 'transient' para mostrarlo al usuario.
            set_transient( 'gemini_proxy_response_' . get_current_user_id(), 'Error de conexi├│n: ' . $error_message, 60 );
        } else {
            // Si la conexi├│n fue exitosa, procesamos el cuerpo de la respuesta.
            $body = wp_remote_retrieve_body( $response );
            $data = json_decode( $body, true ); // Decodificamos el JSON a un array asociativo.

            if ( $data && $data['success'] ) {
                // Si el proxy devolvi├│ un JSON exitoso.
                $display_message = '<strong>Respuesta del An├ílisis:</strong><br>' . esc_html( $data['data']['analysis'] );
                set_transient( 'gemini_proxy_response_' . get_current_user_id(), $display_message, 60 );
            } else {
                // Si el proxy devolvi├│ un JSON de error.
                $error_message = isset($data['data']['message']) ? $data['data']['message'] : 'Ocurri├│ un error desconocido.';
                set_transient( 'gemini_proxy_response_' . get_current_user_id(), 'Error del proxy: ' . esc_html($error_message), 60 );
            }
        }
    }
    add_action( 'spectra_form_success', 'kdev_handle_spectra_form_submission', 10, 1 );

    /**
     * Crea un shortcode para mostrar la respuesta del proxy.
     *
     * @return string El HTML con la respuesta o una cadena vac├¡a.
     */
    function kdev_display_gemini_response_shortcode() {
        // Obtenemos el ID del usuario actual para que el transient sea ├║nico por usuario.
        $transient_key = 'gemini_proxy_response_' . get_current_user_id();

        // Buscamos si hay una respuesta guardada en el transient.
        if ( ( $response_message = get_transient( $transient_key ) ) ) {
            // Si encontramos una respuesta, la envolvemos en un div para darle estilo.
            $output = '<div class="gemini-proxy-response">' . wp_kses_post( $response_message ) . '</div>';

            // Borramos el transient para que no se muestre de nuevo en la siguiente recarga.
            delete_transient( $transient_key );

            return $output;
        }

        return ''; // Si no hay transient, no devolvemos nada.
    }
    add_shortcode( 'gemini_response', 'kdev_display_gemini_response_shortcode' );
    ```

**Explicaci├│n del C├│digo de `functions.php`:**

1.  **`add_action('spectra_form_success', ...)`**: Este es el hook. Le decimos a WordPress que ejecute nuestra funci├│n `kdev_handle_spectra_form_submission` cada vez que Spectra dispare la acci├│n `spectra_form_success`.
2.  **`wp_remote_post()`**: Esta es la forma correcta y segura en WordPress para hacer solicitudes HTTP a otros servidores (o a s├¡ mismo). Es mucho mejor que usar cURL directamente.
3.  **Manejo de la Respuesta**: Verificamos si `wp_remote_post` devolvi├│ un error (`is_wp_error`). Si no, obtenemos el cuerpo (`wp_remote_retrieve_body`), que es el JSON de nuestro proxy, y lo decodificamos (`json_decode`).
4.  **Transients (`set_transient`, `get_transient`)**: Este es el truco para mostrar la respuesta. El hook `spectra_form_success` se ejecuta en segundo plano (AJAX). No podemos simplemente hacer un `echo` para mostrar algo en la p├ígina. En su lugar, guardamos el mensaje de respuesta en un *transient*, que es un dato temporal en la base de datos de WordPress. Le damos un nombre ├║nico (`'gemini_proxy_response_' . get_current_user_id()`) para que la respuesta de un usuario no se muestre a otro, y un tiempo de expiraci├│n corto (60 segundos).
5.  **Shortcode (`[gemini_response]`)**: Creamos un shortcode simple. Esta es la pieza final. El shortcode busca el transient. Si lo encuentra, muestra el mensaje y **lo borra inmediatamente** para que no vuelva a aparecer si el usuario recarga la p├ígina.

---

### **Paso 4: Mostrar la Respuesta al Usuario**

Ya casi terminamos. El ├║ltimo paso es decirle a WordPress d├│nde mostrar la respuesta.

1.  Vuelve a editar la p├ígina donde tienes tu formulario de Spectra.
2.  A├▒ade un bloque de "Shortcode" justo debajo de tu formulario.
3.  Dentro del bloque de shortcode, escribe: `[gemini_response]`
4.  Guarda la p├ígina.

**(Opcional) A├▒adir algo de estilo:**
Puedes a├▒adir el siguiente CSS en el Personalizador de WordPress (`Apariencia > Personalizar > CSS Adicional`) para que la respuesta se vea mejor.

```css
.gemini-proxy-response {
    margin-top: 20px;
    padding: 15px;
    border-left: 5px solid #4CAF50; /* Verde ├®xito */
    background-color: #f1f1f1;
    border-radius: 5px;
}
```

### **┬íPrueba Final!**

Ahora, visita la p├ígina del formulario, introduce una URL v├ílida (ej. `https://es.wordpress.org/`) y env├¡alo. Despu├®s de que aparezca el mensaje de ├®xito del formulario, la p├ígina deber├¡a recargarse o actualizarse, y el mensaje de nuestro proxy aparecer├í justo debajo del formulario.

┬íY eso es todo! Has creado un flujo de datos robusto y seguro desde un formulario de Spectra hasta un procesador backend, mostrando la respuesta de vuelta al usuario de una manera limpia y profesional.
