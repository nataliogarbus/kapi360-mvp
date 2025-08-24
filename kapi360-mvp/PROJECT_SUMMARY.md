# Resumen del Proyecto: Agente de Diagnóstico Kapi

Este documento resume el estado actual del proyecto del Agente de Diagnóstico Kapi, las modificaciones realizadas, la arquitectura y los pasos para la configuración y prueba local, así como consideraciones para la implementación en Kinsta.

## 1. Objetivo del Proyecto (Según `GEMINI.md`)

El objetivo principal es la validación y cualificación de prospectos para Kapi, posicionando la herramienta como una prueba de la promesa de la marca. La herramienta convierte los "dolores" del cliente en KPIs deficientes, demostrando que Kapi es la solución.

**Flujo del Usuario (Experiencia en Dos Fases):**

- **Fase 1: Informe Inmediato (Sin Fricción):** El usuario ingresa la URL de su sitio web y hace clic en "Generar Informe". La herramienta muestra una puntuación general y un resumen de los KPIs principales.
- **Fase 2: Informe Personalizado (Con Fricción Justificada):** Después de ver el informe inicial, se le ofrece un "análisis más preciso" a cambio de completar un formulario para capturar datos de contacto y cualificar el lead.

## 2. Arquitectura de la Solución

- **Interfaz de Usuario (Frontend):** `index.html` con JavaScript (`src/js/main.js`) que maneja la lógica del formulario y la visualización del informe.
- **Servidor de Desarrollo Local/Proxy:** `Netlify Dev` para servir los archivos locales y actuar como un proxy para evitar problemas de CORS. Una regla en `netlify.toml` redirige las llamadas de `/api/get-report` al backend.
- **Lógica de Backend:** Un script PHP (`kapi-endpoint.php`) alojado en WordPress. Este script recibe la petición, llama a la API de Gemini para generar el informe, envía datos a SureTriggers (Ottokit) en segundo plano y devuelve el informe final al frontend.
- **Automatización en Segundo Plano:** SureTriggers (Ottokit) se utiliza para tareas que no necesitan bloquear al usuario, como enviar notificaciones o actualizar un CRM.

## 3. Modificaciones de Archivos Realizadas

Se realizaron las siguientes modificaciones para sincronizar el frontend y el backend según la arquitectura definida:

### `index.html`

1.  **Cambio de ID del Formulario:** El `id` del formulario se cambió de `kapi-contained-form` a `url-form` para que coincida con el JavaScript de `main.js`.
2.  **Eliminación de JavaScript en Línea:** Todo el bloque `<script>` en línea que contenía la lógica de envío del formulario y la lógica de alternancia de opciones fue eliminado.
3.  **Enlace a `src/js/main.js`:** Se añadió una etiqueta `<script src="./src/js/main.js"></script>` antes del cierre de la etiqueta `</body>` para cargar el archivo JavaScript externo.
4.  **Contenedor del Informe:** El `div` con `id="kapi-report-display"` ahora está envuelto por un nuevo `div` con `id="report-container"`. El `display:none;` se movió al `report-container` para que `main.js` controle la visibilidad del informe a través de este contenedor padre.

### `src/js/main.js`

1.  **Integración de Lógica de Alternancia:** Se incorporó la lógica para mostrar/ocultar el contenedor de opciones personalizadas (`custom-options-container`) basada en la selección de los radio buttons "Análisis Automático" y "Análisis Personalizado".
2.  **Recopilación Completa de Datos del Formulario:** La función de envío del formulario ahora recopila todos los datos del formulario, incluyendo `website_url`, `analysis_type` y `focus_areas[]` (si se seleccionan).
3.  **Ajuste de Referencias de Elementos:** Se aseguró que las referencias a los elementos HTML (`urlForm`, `reportContainer`, `reportContent`) sean correctas según los IDs actualizados en `index.html`.
4.  **Endpoint del Proxy:** Se mantiene el endpoint `/api/get-report` para la comunicación con el backend, que será manejado por `netlify.toml`.

## 4. Configuración de `netlify.toml`

El archivo `netlify.toml` está correctamente configurado para redirigir las solicitudes del frontend al backend PHP:

```toml
[[redirects]]
  from = "/api/get-report"
  to = "https://kapikinsta.kinsta.cloud/kapi-endpoint.php"
  status = 200
```

**Nota:** Para pruebas locales, la URL `to` deberá apuntar a tu servidor PHP local.

## 5. Visión General de `kapi-endpoint.php`

El script PHP (`kapi-endpoint.php`) es el corazón del backend y realiza las siguientes funciones:

- **Carga del Entorno de WordPress:** Utiliza `require_once( __DIR__ . '/wp-load.php' );` para acceder a las funciones de WordPress.
- **Validación de Solicitudes:** Asegura que la solicitud sea un POST y que los datos JSON sean válidos.
- **Construcción del Prompt de Gemini:** Genera un prompt dinámico para la API de Gemini basado en la URL y las áreas de enfoque seleccionadas por el usuario.
- **Llamada a la API de Gemini:** Realiza una solicitud `wp_remote_post` a la API de Gemini para obtener el informe.
- **Envío a Ottokit (SureTriggers):** Envía los datos del formulario y el informe de Gemini a un webhook de Ottokit en segundo plano (no bloqueante) para automatizaciones adicionales.
- **Respuesta al Frontend:** Devuelve el contenido del informe de Gemini al frontend en formato JSON.

**Consideraciones Importantes para `kapi-endpoint.php`:**

- **`GEMINI_API_KEY`:** La clave API de Gemini se obtiene de una constante `GEMINI_API_KEY`. **Es crucial definir esta constante en tu `wp-config.php` de WordPress (tanto localmente para pruebas como en Kinsta para producción).**
- **Entorno WordPress:** Este script requiere un entorno WordPress activo para funcionar debido al uso de funciones de WordPress.

## 6. Instrucciones para Pruebas Locales

Para probar el flujo completo de la aplicación localmente, necesitarás:

- **Node.js y npm:** Para `netlify-cli`.
- **PHP y un servidor web (e.g., Apache/Nginx):** Para servir el archivo `kapi-endpoint.php` dentro de un entorno WordPress. Se recomienda usar herramientas como Local by Flywheel, XAMPP, MAMP o Docker para configurar un entorno WordPress local.

**Pasos para la Configuración y Prueba:**

1.  **Asegura tu Entorno WordPress Local:**
    - Ten una instalación de WordPress funcionando localmente (ej. `http://localhost/your-wordpress-site/`).
    - **Coloca `kapi-endpoint.php`:** Asegúrate de que `kapi-endpoint.php` esté accesible desde tu instalación de WordPress. Una buena práctica es colocarlo en la raíz de tu tema activo o en un plugin personalizado. Si lo colocas en la raíz de WordPress, la línea `require_once( __DIR__ . '/wp-load.php' );` debería funcionar. Si no, ajusta la ruta para que apunte correctamente a `wp-load.php`.
    - **Define `GEMINI_API_KEY`:** Abre tu `wp-config.php` local y añade:
      ```php
      define('GEMINI_API_KEY', 'TU_CLAVE_API_DE_GEMINI_AQUI');
      ```
      Reemplaza `TU_CLAVE_API_DE_GEMINI_AQUI` con tu clave API de Gemini real. **¡No uses esta clave directamente en producción!**

2.  **Instala Netlify CLI (si no lo tienes):**

    ```bash
    npm install netlify-cli -g
    ```

3.  **Navega a la Raíz de tu Proyecto (`kapi_output`):**

    ```bash
    cd c:\Users\Natalio\kapi_output
    ```

4.  **Inicia Netlify Dev con Proxy al Backend PHP:**
    Ejecuta el siguiente comando, reemplazando los placeholders con los detalles de tu entorno WordPress local:

    ```bash
    netlify dev --target-port=<PUERTO_WORDPRESS_LOCAL> --target-url=<URL_COMPLETA_A_KAPI_ENDPOINT_PHP_LOCAL>
    ```

    - `<PUERTO_WORDPRESS_LOCAL>`: El puerto en el que se ejecuta tu servidor web local (ej. `80`, `8888`, `8000`).
    - `<URL_COMPLETA_A_KAPI_ENDPOINT_PHP_LOCAL>`: La URL completa donde `kapi-endpoint.php` es accesible en tu servidor local (ej. `http://localhost/your-wordpress-site/kapi-endpoint.php`).

    **Ejemplo:**

    ```bash
    netlify dev --target-port=80 --target-url=http://localhost/my-kapi-wp/kapi-endpoint.php
    ```

5.  **Accede a la Aplicación Local:**
    Netlify Dev te proporcionará una URL local (ej. `http://localhost:8888`). Abre esta URL en tu navegador.

6.  **Prueba el Formulario:**
    - Ingresa una URL en el formulario.
    - Selecciona las opciones de análisis (automático o personalizado).
    - Haz clic en "Generar Informe".
    - **Verifica:**
      - La interfaz de usuario muestra el estado de carga y luego el informe.
      - En las herramientas de desarrollador de tu navegador (pestaña "Network"), verifica que la solicitud POST se envíe a `/api/get-report` y que la respuesta sea correcta.
      - Revisa los logs de tu servidor PHP local para cualquier error en el backend.

## 7. Consideraciones para la Implementación en Kinsta

Cuando estés listo para implementar en Kinsta:

- **`GEMINI_API_KEY` en Kinsta:** Asegúrate de definir la constante `GEMINI_API_KEY` en el `wp-config.php` de tu instalación de WordPress en Kinsta. **Nunca subas claves API directamente en tu código fuente a un repositorio público.** Utiliza las variables de entorno o la configuración segura de Kinsta para esto.
- **Ubicación de `kapi-endpoint.php`:** Asegúrate de que `kapi-endpoint.php` esté en una ubicación accesible dentro de tu instalación de WordPress en Kinsta, y que la ruta `require_once( __DIR__ . '/wp-load.php' );` sea correcta en ese entorno.
- **Netlify Deployment:** Configura tu sitio de Netlify para que se conecte a tu repositorio de código (si lo tienes) o sube los archivos directamente. Netlify manejará la configuración de redirección de `netlify.toml` automáticamente.
- **Dominio de Kinsta:** La URL `to` en `netlify.toml` (`https://kapikinsta.kinsta.cloud/kapi-endpoint.php`) ya apunta a un dominio de Kinsta, lo cual es correcto para la producción.

Este resumen debería proporcionarte toda la información necesaria para continuar con el desarrollo y la implementación del Agente de Diagnóstico Kapi.
