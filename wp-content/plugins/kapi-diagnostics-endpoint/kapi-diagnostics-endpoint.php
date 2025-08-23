<?php
/**
 * Plugin Name:       Kapi Diagnostics Endpoint
 * Description:       Creates a dedicated REST API endpoint for the Kapi diagnostics tool to ensure it is theme-independent and robust.
 * Version:           1.3
 * Author:            Gemini for Kapi Agency
 */

// Security check to prevent direct access to the file.
if ( ! defined( 'ABSPATH' ) ) {
    exit; 
}

/**
 * Register our custom REST API route.
 */
add_action( 'rest_api_init', function () {
    register_rest_route( 'kapi/v1', '/get_report', [
        'methods'  => 'POST',
        'callback' => 'kapi_handle_get_report_request',
        'permission_callback' => '__return_true', // Publicly accessible
    ] );
} );

/**
 * The callback function that handles the request to our endpoint.
 *
 * @param WP_REST_Request $request The full request object.
 * @return WP_REST_Response|WP_Error The response object or a WP_Error on failure.
 */
function kapi_handle_get_report_request( WP_REST_Request $request ) {
    // --- 1. OBTENER Y VALIDAR DATOS DE ENTRADA ---
    $client_url = $request->get_param('url');
    $client_url = esc_url_raw($client_url);

    if (empty($client_url)) {
        return new WP_Error('no_url_provided', 'No valid URL was provided.', ['status' => 400]);
    }

    // --- 2. CONFIGURAR LA LLAMADA A LA API DE GEMINI (GENERATIVE LANGUAGE) ---
    $api_key = 'AIzaSyCLC8gqU0nilDZj8SJcOo4yne5phytRIxo';
    $api_url = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=' . $api_key;

    // --- 3. CREAR EL PROMPT PARA GEMINI ---
    $prompt = <<<EOT
Actúa como un analista de marketing digital experto llamado 'Kapi'. Tu tarea es analizar la siguiente URL de un cliente: {$client_url}.

Debes devolver SÓLO un objeto JSON, sin ningún texto, explicación o markdown ```json ``` antes o después.

El JSON debe tener la siguiente estructura exacta y estar completamente relleno con un análisis simulado pero realista y profesional para una PYME. Los 'score' deben ser números enteros. Los textos deben ser concisos y orientados a negocios. El 'clientUrl' en el JSON debe ser la URL proporcionada.

{
  "generalScore": 85,
  "clientUrl": "{$client_url}",
  "rutas": [
    {
      "id": "mercado_competencia",
      "title": "Mercado y Competencia",
      "score": 82,
      "coordenadas": [
        { "id": "autoridad-dominio", "title": "Autoridad de Dominio", "score": 90, "status": "Óptimo", "what_is_it": "Mide la reputación y relevancia de tu sitio web en la industria.", "why_it_matters": "Una alta autoridad mejora tu ranking en Google, atrayendo más tráfico orgánico que tus competidores.", "sub_kpis": [], "soluciones": { "diy": {"content": "Publica contenido de alta calidad y consigue enlaces de sitios relevantes."}, "con_kapi": {"content": "Te ayudamos a definir una estrategia de contenidos y link building para acelerar tu autoridad."}, "kapi_lo_hace": {"content": "Ejecutamos campañas de outreach y creamos contenido premium para posicionarte como líder."} } },
        { "id": "visibilidad-buscadores", "title": "Visibilidad en Buscadores", "score": 75, "status": "Mejorable", "what_is_it": "Indica qué tan fácil es para los clientes encontrarte en Google para términos clave.", "why_it_matters": "Si no apareces en la primera página, estás perdiendo el 90% del tráfico potencial.", "sub_kpis": [], "soluciones": { "diy": {"content": "Investiga palabras clave y optimiza los títulos y descripciones de tus páginas."}, "con_kapi": {"content": "Realizamos un análisis de palabras clave y optimizamos tu sitio para los términos de mayor impacto."}, "kapi_lo_hace": {"content": "Gestionamos tu SEO de forma integral para dominar los rankings de tu sector."} } }
      ]
    },
    {
      "id": "plataforma_ux",
      "title": "Plataforma y UX",
      "score": 78,
      "coordenadas": [
        { "id": "velocidad-carga", "title": "Velocidad de Carga", "score": 70, "status": "Crítico", "what_is_it": "El tiempo que tarda tu sitio en ser interactivo para un usuario.", "why_it_matters": "Por cada segundo de más en la carga, la conversión puede caer hasta un 7%. Un sitio lento frustra y aleja a los clientes.", "sub_kpis": [], "soluciones": { "diy": {"content": "Comprime imágenes y utiliza un servicio de hosting rápido."}, "con_kapi": {"content": "Analizamos tu sitio para encontrar cuellos de botella y te damos un plan de optimización técnica."}, "kapi_lo_hace": {"content": "Implementamos optimizaciones avanzadas de caché, imágenes y código para garantizar la máxima velocidad."} } },
        { "id": "usabilidad-movil", "title": "Usabilidad Móvil", "score": 85, "status": "Óptimo", "what_is_it": "La facilidad con la que los usuarios pueden navegar e interactuar en tu sitio desde un celular.", "why_it_matters": "Más del 60% del tráfico web es móvil. Si tu sitio no funciona bien en celulares, pierdes la mayoría de tus clientes potenciales.", "sub_kpis": [], "soluciones": { "diy": {"content": "Usa un diseño 'responsive' y asegúrate de que los botones sean fáciles de presionar."}, "con_kapi": {"content": "Auditamos la experiencia móvil de tu sitio y te indicamos los puntos de fricción a eliminar."}, "kapi_lo_hace": {"content": "Rediseñamos o ajustamos tu sitio para que ofrezca una experiencia móvil impecable que convierta visitantes en clientes."} } }
      ]
    }
  ]
}
EOT;

    // --- 4. REALIZAR LA LLAMADA A LA API USANDO LA API HTTP DE WORDPRESS ---
    $response = wp_remote_post($api_url, [
        'method'    => 'POST',
        'headers'   => [
            'Content-Type'  => 'application/json',
        ],
        'body'      => json_encode(['contents' => [['parts' => [['text' => $prompt]]]]]),
        'timeout'   => 60,
    ]);

    // --- 5. MANEJO DE ERRORES Y RESPUESTA MEJORADO ---
    if (is_wp_error($response)) {
        error_log('Kapi Diagnostics - WP_Error on API call: ' . $response->get_error_message());
        return new WP_Error('gemini_api_wp_error', 'Error de WordPress al conectar con la API: ' . $response->get_error_message(), ['status' => 500]);
    }

    $body = wp_remote_retrieve_body($response);
    $gemini_data = json_decode($body, true);
    $report_content = $gemini_data['candidates'][0]['content']['parts'][0]['text'] ?? null;

    if (empty($report_content)) {
        $response_code = wp_remote_retrieve_response_code($response);
        $response_headers = wp_remote_retrieve_headers($response);
        error_log('Kapi Diagnostics - Empty content from API.');
        error_log('API Response Code: ' . $response_code);
        error_log('API Response Headers: ' . print_r($response_headers, true));
        error_log('API Response Body: ' . $body);
        
        return new WP_Error('gemini_api_empty', 'The Gemini API returned an empty or invalid response.', ['status' => 500]);
    }

    // --- 6. DEVOLVER LA RESPUESTA AL FRONTEND ---
    $response_data = [
        'success' => true,
        'data'    => ['report_content' => $report_content],
    ];

    return new WP_REST_Response($response_data, 200);
}

/**
 * Register our custom REST API route for registration.
 */
add_action( 'rest_api_init', function () {
    register_rest_route( 'kapi/v1', '/register', [
        'methods'  => 'POST',
        'callback' => 'kapi_handle_registration_request',
        'permission_callback' => '__return_true', // Publicly accessible
    ] );
} );

/**
 * The callback function that handles the registration request.
 *
 * @param WP_REST_Request $request The full request object.
 * @return WP_REST_Response|WP_Error The response object or a WP_Error on failure.
 */
function kapi_handle_registration_request( WP_REST_Request $request ) {
    $params = $request->get_json_params();

    // Sanitize all inputs
    $name = sanitize_text_field( $params['name'] ?? '' );
    $title = sanitize_text_field( $params['title'] ?? '' );
    $company = sanitize_text_field( $params['company'] ?? '' );
    $email = sanitize_email( $params['email'] ?? '' );
    $phone = sanitize_text_field( $params['phone'] ?? '' );
    $city = sanitize_text_field( $params['city'] ?? '' );
    $state = sanitize_text_field( $params['state'] ?? '' );
    $country = sanitize_text_field( $params['country'] ?? '' );
    $website = sanitize_text_field( $params['website'] ?? '' );

    if ( empty( $name ) || empty( $email ) || empty( $company ) ) {
        return new WP_Error( 'missing_data', 'Nombre, Email y Empresa son requeridos.', [ 'status' => 400 ] );
    }

    $to = 'nataliogarbus@gmail.com';
    $subject = 'Nuevo Prospecto Registrado - Kapi Diagnostics';
    $body = "Se ha registrado un nuevo prospecto a través de la herramienta de diagnóstico Kapi:\n\n";
    $body .= "Sitio Web Analizado: " . $website . "\n";
    $body .= "----------------------------------------\n";
    $body .= "Nombre: " . $name . "\n";
    $body .= "Cargo: " . $title . "\n";
    $body .= "Empresa: " . $company . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Teléfono: " . $phone . "\n";
    $body .= "Ubicación: " . $city . ", " . $state . ", " . $country . "\n";
    $body .= "----------------------------------------\n";
    $headers = ['Content-Type: text/plain; charset=UTF-8'];

    $sent = wp_mail( $to, $subject, $body, $headers );

    if ( ! $sent ) {
        return new WP_Error( 'email_failed', 'El servidor no pudo enviar el correo.', [ 'status' => 500 ] );
    }

    return new WP_REST_Response( [ 'success' => true, 'message' => 'Registration successful.' ], 200 );
}

