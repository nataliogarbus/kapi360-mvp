<?php
/**
 * Plugin Name:       Kapi Diagnostics Endpoint
 * Description:       Creates a dedicated REST API endpoint for the Kapi diagnostics tool to ensure it is theme-independent and robust.
 * Version:           1.0
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
    
    // Get the URL from the request body.
    $client_url = $request->get_param('url');

    // Sanitize the URL.
    $client_url = esc_url_raw( $client_url );

    // Check if the URL is empty after sanitization.
    if ( empty( $client_url ) ) {
        return new WP_Error( 'no_url_provided', 'No valid URL was provided.', [ 'status' => 400 ] );
    }

    // --- FAKE REPORT STRUCTURE (FROM PREVIOUS SCRIPT) ---
    // This structure will eventually be replaced by a real call to the Gemini API.
    $fake_report_structure = <<<EOT
{
  "generalScore": 88,
  "clientUrl": "{$client_url}",
  "rutas": [
    {
      "id": "mercado_competencia",
      "title": "Mercado y Competencia (Plugin)",
      "score": 85,
      "coordenadas": [
        {
          "id": "autoridad-dominio",
          "title": "Autoridad de Dominio",
          "score": 90,
          "status": "Óptimo",
          "what_is_it": "Esta es una prueba desde el nuevo plugin.",
          "why_it_matters": "Confirma que la nueva arquitectura de plugin funciona correctamente.",
          "sub_kpis": [],
          "soluciones": {
            "diy": { "content": "Contenido DIY desde el plugin." },
            "con_kapi": { "content": "Contenido 'con Kapi' desde el plugin." },
            "kapi_lo_hace": { "content": "Contenido 'Kapi lo hace' desde el plugin." }
          }
        }
      ]
    }
  ]
}
EOT;

    // Prepare the data for the response.
    $response_data = [ 'report_content' => $fake_report_structure ];

    // Return a new WP_REST_Response object.
    return new WP_REST_Response( $response_data, 200 );
}
