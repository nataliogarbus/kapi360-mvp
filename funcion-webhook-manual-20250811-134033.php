Loaded cached credentials.
┬íExcelente iniciativa! Actuar como tu mentor en este desarrollo para WordPress ser├í un placer.

Crear una funci├│n que intercepte datos de un formulario y los procese en el backend es una tarea fundamental en el desarrollo con WordPress. Hacerlo de forma segura y eficiente es lo que diferencia a un desarrollador profesional.

Aqu├¡ tienes una gu├¡a completa, paso a paso, para lograr exactamente lo que necesitas.

---

### **Gu├¡a Completa: Interceptar un Formulario POST con `wp_remote_post` en un Tema Hijo de Astra**

#### **Objetivo Final**

Crearemos una funci├│n en el `functions.php` de nuestro tema hijo que:
1.  Se ejecuta en el hook `init`.
2.  Verifica si se ha enviado un campo `website_url` mediante POST.
3.  Si existe, env├¡a ese valor a un script PHP externo (nuestro proxy) usando `wp_remote_post`.
4.  Recibe la respuesta del proxy y la muestra de forma segura en formato JSON.

#### **Prerrequisitos**

1.  **Tema Hijo de Astra:** Debes tener un tema hijo de Astra instalado y activado. **Nunca** modifiques los archivos del tema padre directamente, ya que perder├¡as los cambios al actualizar.
2.  **Un formulario HTML:** Necesitamos una manera de enviar los datos.
3.  **El script `gemini-proxy.php`:** Un archivo PHP en tu servidor que recibir├í la petici├│n.

---

### **Paso 1: Crear el Formulario HTML (El Disparador)**

Para que nuestra funci├│n se ejecute, necesitamos un formulario que env├¡e la informaci├│n. Puedes a├▒adir este c├│digo HTML en cualquier p├ígina o entrada de tu sitio WordPress usando el editor de bloques (en un bloque "HTML Personalizado").

Este formulario es simple: tiene un campo de texto llamado `website_url` y un bot├│n de env├¡o.

```html
<h3>Enviar URL para procesar</h3>
<p>
  Ingresa la URL de un sitio web para enviarla a nuestro servicio de proxy.
</p>

<!-- El action puede estar vac├¡o para enviar los datos a la misma URL de la p├ígina actual. -->
<form action="" method="POST">
    <label for="website_url">URL del Sitio Web:</label><br>
    <input type="text" id="website_url" name="website_url" size="50" value="https://wordpress.org/">
    <br><br>
    <input type="submit" value="Enviar para Procesar">
</form>
```

**┬┐Por qu├® `action=""`?** Al dejar el `action` vac├¡o, el formulario se env├¡a a la misma URL en la que se encuentra. Como nuestro c├│digo se ejecutar├í en la acci├│n `init` (que se carga en cada petici├│n), interceptar├í este env├¡o sin problemas.

---

### **Paso 2: Preparar el Script `gemini-proxy.php` (El Receptor)**

Este es el script que recibir├í la informaci├│n desde WordPress. Para este ejemplo, crearemos un proxy muy simple. Sube este archivo a la ra├¡z de tu servidor o a una carpeta de tu elecci├│n.

**`gemini-proxy.php`**
```php
<?php
// Establecemos la cabecera para indicar que la respuesta es JSON.
header('Content-Type: application/json');

// Verificamos si hemos recibido el campo 'website_url' por POST.
if (isset($_POST['website_url'])) {
    
    // Sanitizamos la URL recibida para seguridad b├ísica.
    $received_url = filter_var($_POST['website_url'], FILTER_SANITIZE_URL);

    // Aqu├¡ ir├¡a tu l├│gica compleja.
    // Por ejemplo: hacer un cURL a esa URL, analizar su contenido, etc.
    // Para este ejemplo, simplemente prepararemos una respuesta de ├®xito.

    $response_data = [
        'status' => 'success',
        'message' => 'URL recibida y procesada correctamente por el proxy.',
        'processed_url' => $received_url,
        'timestamp' => date('Y-m-d H:i:s')
    ];

    // Devolvemos la respuesta en formato JSON.
    echo json_encode($response_data);

} else {
    // Si no se recibi├│ el campo esperado, devolvemos un error.
    $response_data = [
        'status' => 'error',
        'message' => 'Error: No se recibi├│ el campo "website_url".'
    ];

    // Devolvemos el error en formato JSON.
    echo json_encode($response_data);
}

// Es importante terminar la ejecuci├│n del script aqu├¡.
exit;
```

**Nota importante:** Anota la URL p├║blica de este archivo (ej. `https://tusitio.com/gemini-proxy.php`). La necesitaremos en el siguiente paso.

---

### **Paso 3: La Funci├│n en `functions.php` (El N├║cleo L├│gico)**

Ahora, la pieza central. Abre el archivo `functions.php` de tu **tema hijo** y a├▒ade el siguiente c├│digo al final.

He comentado cada l├¡nea para que entiendas perfectamente qu├® hace y por qu├®.

**`functions.php` (del tema hijo)**
```php
<?php
/**
 * Intercepta un formulario POST para enviar datos a un proxy externo.
 *
 * Esta funci├│n se engancha a la acci├│n 'init' de WordPress.
 * Verifica la existencia de un campo POST 'website_url'.
 * Si existe, lo sanitiza y lo env├¡a a un servicio externo
 * mediante wp_remote_post. Finalmente, muestra la respuesta
 * del servicio usando wp_send_json_success y termina la ejecuci├│n.
 */
function gemini_intercept_post_and_proxy() {

    // 1. VERIFICACI├ôN: Solo actuar si nuestro campo espec├¡fico existe en la petici├│n POST.
    // Usamos isset() para comprobar que la variable fue enviada.
    if ( ! isset( $_POST['website_url'] ) ) {
        return; // Si no existe, no hacemos nada y WordPress contin├║a su carga normal.
    }

    // 2. SEGURIDAD: Sanitizar el dato recibido.
    // esc_url_raw() es la funci├│n ideal para URLs que se usar├ín en peticiones de backend.
    $website_url = esc_url_raw( $_POST['website_url'] );

    // Si despu├®s de sanitizar, la URL est├í vac├¡a, no continuamos.
    if ( empty( $website_url ) ) {
        // Podr├¡amos enviar un error, pero por simplicidad, solo detenemos.
        return;
    }

    // 3. PREPARACI├ôN DE LA PETICI├ôN EXTERNA
    // La URL de nuestro script receptor. ┬íC├ímbiala por la tuya!
    $proxy_url = 'https://URL_DE_TU_SITIO.com/gemini-proxy.php'; 

    // El cuerpo (body) de nuestra petici├│n POST.
    // wp_remote_post espera un array asociativo.
    $body_data = [
        'website_url' => $website_url,
    ];

    // Argumentos para la petici├│n. Aqu├¡ podemos definir el m├®todo, el cuerpo, etc.
    $request_args = [
        'body'      => $body_data,
        'timeout'   => 15, // Tiempo de espera en segundos.
    ];

    // 4. EJECUCI├ôN: Realizar la llamada POST usando la API HTTP de WordPress.
    $response = wp_remote_post( $proxy_url, $request_args );

    // 5. MANEJO DE LA RESPUESTA
    // Primero, verificamos si la petici├│n en s├¡ misma fall├│ (ej. error de cURL, timeout).
    if ( is_wp_error( $response ) ) {
        $error_message = $response->get_error_message();
        // wp_send_json_error es la forma correcta de enviar una respuesta de error en AJAX.
        wp_send_json_error( 'Hubo un problema con la petici├│n: ' . $error_message );
    }

    // Si la petici├│n fue exitosa, obtenemos el cuerpo de la respuesta.
    $response_body = wp_remote_retrieve_body( $response );
    
    // La respuesta de nuestro proxy es una cadena JSON, as├¡ que la decodificamos.
    // El segundo par├ímetro 'true' convierte el objeto en un array asociativo.
    $decoded_data = json_decode( $response_body, true );

    // 6. SALIDA FINAL: Enviar la respuesta al navegador.
    // wp_send_json_success toma un array de datos, lo codifica a JSON,
    // a├▒ade un campo "success: true" y termina la ejecuci├│n del script (wp_die()).
    // Esto es perfecto para respuestas de tipo AJAX.
    wp_send_json_success( $decoded_data );
}

// Enganchamos nuestra funci├│n a la acci├│n 'init'.
// 'init' es un buen hook porque se ejecuta temprano, antes de que se env├¡en las cabeceras HTML.
add_action( 'init', 'gemini_intercept_post_and_proxy' );
```

---

### **Paso 4: Probar la Implementaci├│n**

1.  Aseg├║rate de que el archivo `gemini-proxy.php` est├í subido a tu servidor.
2.  Copia la URL p├║blica de ese archivo y p├®gala en la variable `$proxy_url` dentro de tu `functions.php`.
3.  Crea una nueva p├ígina en WordPress y pega el c├│digo del formulario HTML del Paso 1.
4.  Guarda y visita esa p├ígina en tu navegador.
5.  Ver├ís el formulario. Deja la URL por defecto (`https://wordpress.org/`) o pon otra y haz clic en "Enviar para Procesar".

**Resultado esperado:**

La p├ígina se recargar├í y, en lugar de mostrar tu sitio web, ver├ís una cadena de texto en formato JSON, similar a esta:

```json
{
  "success": true,
  "data": {
    "status": "success",
    "message": "URL recibida y procesada correctamente por el proxy.",
    "processed_url": "https:\/\/wordpress.org",
    "timestamp": "2025-08-11 10:30:00"
  }
}
```

Esto confirma que todo el flujo ha funcionado correctamente.

### **Consideraciones de un Desarrollador Senior (Pr├│ximos Pasos)**

*   **Seguridad con Nonces:** Para protegerte contra ataques CSRF (Cross-Site Request Forgery), un formulario real deber├¡a incluir un "nonce" de WordPress. Se genera con `wp_nonce_field()` en el formulario y se verifica con `wp_verify_nonce()` en la funci├│n PHP.
*   **Mejor Experiencia de Usuario (JavaScript):** En una aplicaci├│n real, no querr├¡as que el usuario viera una p├ígina JSON. Lo ideal ser├¡a enviar el formulario usando JavaScript (con `fetch` o jQuery AJAX), mostrar un indicador de "cargando" y luego mostrar la respuesta del servidor en la misma p├ígina sin recargarla.
*   **Manejo de Errores m├ís Robusto:** Podr├¡as a├▒adir m├ís l├│gica para manejar diferentes c├│digos de respuesta HTTP de `wp_remote_post` (ej. 404, 500) y dar mensajes m├ís espec├¡ficos al usuario.

┬íFelicidades! Has implementado un manejador de formularios robusto y seguro siguiendo las mejores pr├ícticas de WordPress. Si tienes alguna duda sobre alguno de los pasos, no dudes en consultarme.
