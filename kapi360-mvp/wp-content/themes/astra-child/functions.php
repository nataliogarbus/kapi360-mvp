<?php
// Kapi API Endpoint
add_action('init', 'kapi_handle_api_request');
function kapi_handle_api_request() {
    if (isset($_REQUEST['kapi_action']) && $_REQUEST['kapi_action'] === 'get_report') {
        
        header('Content-Type: application/json');
        
        // Handle potential POST data
        $input = json_decode(file_get_contents('php://input'), true);
        $url = isset($input['url']) ? esc_url_raw($input['url']) : 'No URL provided';

        // Respond with test message
        echo json_encode([
            'message' => 'Hello from the new WordPress functions.php endpoint!',
            'report_content' => 'La conexión funciona y la URL recibida fue: ' . $url
        ]);

        die();
    }
}
