
<?php
/**
 * Astra Child Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Astra Child
 */

/**
 * Define Constants
 */
define( 'CHILD_THEME_ASTRA_CHILD_VERSION', '1.0.0' );

/**
 * Astra Child Theme Enqueue styles
 */
function child_enqueue_styles() {
	wp_enqueue_style( 'astra-child-theme-css', get_stylesheet_directory_uri() . '/style.css', array('astra-theme-css'), CHILD_THEME_ASTRA_CHILD_VERSION, 'all' );
}

add_action( 'wp_enqueue_scripts', 'child_enqueue_styles', 15 );

/**
 * Kapi Diagnostic Agent REST API Endpoint
 *
 * Registers a custom REST API endpoint to handle the diagnostic report generation.
 */
add_action('rest_api_init', function () {
    register_rest_route('kapi/v1', '/get-report', array(
        'methods' => 'POST',
        'callback' => 'kapi_handle_report_request',
        'permission_callback' => '__return_true' // Allow public access
    ));
});

/**
 * Handles the logic for the /get-report endpoint.
 *
 * @param WP_REST_Request $request The incoming request object.
 * @return WP_REST_Response|WP_Error The response object.
 */
function kapi_handle_report_request(WP_REST_Request $request) {
    // 1. Recibir y validar los datos del formulario
    $data = $request->get_json_params();

    if (json_last_error() !== JSON_ERROR_NONE) {
        return new WP_Error('bad_json', 'Error: Datos JSON inválidos.', array('status' => 400));
    }

    if (empty($data['website_url'])) {
        return new WP_Error('missing_url', 'Error: La URL del sitio web es requerida.', array('status' => 400));
    }

    // 2. Llamar a la API de Gemini
    $gemini_api_key = defined('GEMINI_API_KEY') ? GEMINI_API_KEY : ''; // It's better to define this in wp-config.php
    if (empty($gemini_api_key)) {
        return new WP_Error('no_api_key', 'Error: La clave API de Gemini no está configurada en el servidor.', array('status' => 500));
    }
    
    $gemini_endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' . $gemini_api_key;

    // Construir el prompt para Gemini
    $prompt_text = "Genera un informe de diagnóstico SEO y UX para la URL: " . esc_url_raw($data['website_url']);
    if (!empty($data['analysis_type']) && $data['analysis_type'] === 'Personalizado' && !empty($data['focus_areas'])) {
        $focus_areas = implode(', ', array_map('sanitize_text_field', $data['focus_areas']));
        $prompt_text .= " con un enfoque en las áreas: " . $focus_areas . ".";
    } else {
        $prompt_text .= " con un análisis automático general.";
    }
    $prompt_text .= " El informe debe ser conciso, en español, y estructurado en puntos clave, con un tono profesional y útil. Incluye una puntuación general del 1 al 100.";

    $gemini_payload = [
        'contents' => [
            ['parts' => [['text' => $prompt_text]]]
        ]
    ];

    $gemini_response = wp_remote_post($gemini_endpoint, array(
        'method'      => 'POST',
        'headers'     => array('Content-Type' => 'application/json'),
        'body'        => json_encode($gemini_payload),
        'timeout'     => 60,
    ));

    if (is_wp_error($gemini_response)) {
        error_log('Gemini API Connection Error: ' . $gemini_response->get_error_message());
        return new WP_Error('api_connection_error', 'Error de conexión con la API de Gemini.', array('status' => 502));
    }

    $response_code = wp_remote_retrieve_response_code($gemini_response);
    $response_body = wp_remote_retrieve_body($gemini_response);

    if ($response_code !== 200) {
        error_log("Gemini API Error ($response_code): " . $response_body);
        return new WP_Error('api_error', "Error de la API de Gemini (Código: $response_code)", array('status' => 502));
    }

    $gemini_data = json_decode($response_body, true);
    $gemini_report_content = $gemini_data['candidates'][0]['content']['parts'][0]['text'] ?? 'Error: No se pudo extraer el contenido del informe de Gemini.';

    // 3. Enviar datos a Ottokit en segundo plano (no bloqueante)
    $ottokit_webhook_url = 'https://webhook.ottokit.com/ottokit/9a4417b1-11dc-4414-af0e-6ef320040943';
    $data['gemini_report'] = $gemini_report_content;

    wp_remote_post($ottokit_webhook_url, array(
        'method'      => 'POST',
        'headers'     => array('Content-Type' => 'application/json; charset=utf-8'),
        'body'        => json_encode($data),
        'blocking'    => false,
    ));

    // 4. Devolver la respuesta final al cliente
    $response_data = [
        'message' => 'Informe generado y datos enviados a Ottokit.',
        'report_content' => $gemini_report_content,
    ];

    return new WP_REST_Response($response_data, 200);
}
