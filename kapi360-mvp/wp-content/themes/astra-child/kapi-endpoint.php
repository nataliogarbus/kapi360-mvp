<?php
// Versión de prueba minimalista (v4) - Sin cURL ni llamadas a API

// --- CABECERAS Y CONFIGURACIÓN BÁSICA ---
ini_set('display_errors', 0);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// --- FUNCIÓN DE RESPUESTA JSON ESTÁNDAR ---
function send_json_response($data, $is_success = true) {
    if (!$is_success) {
        http_response_code(500);
        $response = ['success' => false, 'data' => ['message' => $data['message'], 'details' => $data]];
    } else {
        $response = ['success' => true, 'data' => $data];
    }
    echo json_encode($response);
    exit;
}

// --- LÓGICA PRINCIPAL ---
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json_response(['message' => 'Método no permitido.'], false);
}

$body = json_decode(file_get_contents('php://input'), true);
$client_url = isset($body['url']) ? filter_var($body['url'], FILTER_SANITIZE_URL) : null;

if (empty($client_url)) {
    send_json_response(['message' => 'No se proporcionó una URL.'], false);
}

// --- RESPUESTA DE PRUEBA (SIN GEMINI, SIN cURL) ---
// Se devuelve un informe falso con la estructura que el frontend espera.
$fake_report_structure = <<<EOT
{
  "generalScore": 99,
  "clientUrl": "{$client_url}",
  "rutas": [
    {
      "id": "mercado_competencia",
      "title": "Prueba de Mercado y Competencia",
      "score": 98,
      "coordenadas": [
        {
          "id": "autoridad-dominio",
          "title": "Prueba de Autoridad de Dominio",
          "score": 99,
          "status": "Óptimo",
          "what_is_it": "Esta es una prueba.",
          "why_it_matters": "Confirma que el script se ejecuta sin la llamada a la API.",
          "sub_kpis": [],
          "soluciones": {
            "diy": { "content": "-" },
            "con_kapi": { "content": "-" },
            "kapi_lo_hace": { "content": "-" }
          }
        }
      ]
    }
  ]
}
EOT;

// --- RESPUESTA FINAL --- 
send_json_response(['report_content' => $fake_report_structure], true);

?>