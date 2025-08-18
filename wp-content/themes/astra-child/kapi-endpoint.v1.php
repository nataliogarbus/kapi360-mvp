<?php
// Cargar el entorno de WordPress
require_once( realpath(__DIR__ . '/../../../wp-load.php') );

wp_send_json_success(['message' => 'WordPress loaded successfully.']);

// --- CONFIGURACIÓN ---
// IMPORTANTE: Reemplaza 'YOUR_API_KEY' con tu clave de API de Google AI Studio.
define('GEMINI_API_KEY', 'AIzaSyCLC8gqU0nilDZj8SJcOo4yne5phytRIxo');
define('GEMINI_API_URL', 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=' . GEMINI_API_KEY);

// --- MANEJO DE LA SOLICITUD ---
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    wp_send_json_error(['message' => 'Método no permitido.'], 405);
    exit;
}

// --- LÓGICA PRINCIPAL ---
// Obtener la URL del cuerpo de la solicitud
$body = json_decode(file_get_contents('php://input'), true);
$client_url = isset($body['url']) ? esc_url_raw($body['url']) : null;

if (empty($client_url)) {
    wp_send_json_error(['message' => 'No se proporcionó una URL.'], 400);
    exit;
}

if (GEMINI_API_KEY === 'YOUR_API_KEY') {
    wp_send_json_error(['message' => 'La clave de API de Gemini no ha sido configurada en kapi-endpoint.php.'], 500);
    exit;
}

// --- DEVOLVER DATOS DE MUESTRA (SOLUCIÓN TEMPORAL) ---
// Se omite la llamada a la API de Gemini para permitir pruebas de frontend.
// El contenido de sample-data.json se inserta directamente.
$report_content_string = '{"generalScore":71,"clientUrl":"ejemplo.com","rutas":[{"id":"mercado_competencia","title":"Mercado y Competencia","score":61,"coordenadas":[{"id":"autoridad-dominio","title":"Autoridad de Dominio","score":75,"status":"Mejorable","what_is_it":"Mide la reputación y relevancia de tu sitio web en internet, basado en la calidad y cantidad de enlaces entrantes.","why_it_matters":"Una autoridad alta significa que Google confía en tu sitio, lo que se traduce en mejores rankings y más tráfico orgánico que tu competencia.","sub_kpis":[{"label":"Calidad Backlinks","value":80},{"label":"Cantidad Backlinks","value":60},{"label":"Relevancia Dominios","value":70}],"soluciones":{"diy":{"content":"Utiliza herramientas como Ahrefs Free Backlink Checker para analizar tus 100 mejores enlaces. Busca directorios de tu industria y contacta a sitios relevantes para solicitar enlaces."},"con_kapi":{"content":"Te entregamos un dashboard interactivo con el perfil completo de tus backlinks y los de tu competencia. Identificamos oportunidades de link building de alto impacto y te guiamos en el proceso de adquisición."},"kapi_lo_hace":{"content":"Nuestro equipo de SEO se encarga de la estrategia y ejecución de una campaña de link building de alta calidad, consiguiendo enlaces relevantes que disparan tu autoridad de dominio."}}},{"id":"huella-buscadores","title":"Huella en Buscadores","score":50,"status":"Crítico","what_is_it":"Evalúa para cuántas palabras clave relevantes para tu negocio aparece tu sitio en las primeras páginas de Google.","why_it_matters":"Si tu huella es pequeña, eres invisible para clientes potenciales que buscan activamente tus productos o servicios.","sub_kpis":[{"label":"Keywords Top 3","value":30},{"label":"Keywords Top 10","value":50},{"label":"Volumen Total","value":60}],"soluciones":{"diy":{"content":"Usa Google Search Console para ver tus keywords actuales. Investiga con \'Google Keyword Planner\' términos que usan tus clientes y crea contenido (artículos, páginas de servicio) para esos términos."},"con_kapi":{"content":"Realizamos un análisis exhaustivo de palabras clave, identificando las de mayor oportunidad (alto volumen, baja competencia) y te entregamos un plan de contenidos para atacarlas."},"kapi_lo_hace":{"content":"Creamos y optimizamos el contenido de tu web para posicionar en cientos de palabras clave relevantes, aumentando drásticamente tu visibilidad y el tráfico cualificado."}}},{"id":"analisis-competidores","title":"Análisis de Competencia","score":55,"status":"Crítico","what_is_it":"Compara la cantidad y calidad de tus backlinks (enlaces entrantes) con los de tus competidores directos.","why_it_matters":"Entender la estrategia de enlaces de tu competencia te permite encontrar oportunidades para superarlos y capturar una mayor cuota de mercado.","sub_kpis":[{"label":"Brecha de Backlinks","value":50},{"label":"Brecha de Contenido","value":60}],"soluciones":{"diy":{"content":"Utiliza herramientas gratuitas como \'SimilarWeb\' o \'Ubersuggest\' para obtener un vistazo general del tráfico y las palabras clave de tus competidores. Analiza qué están haciendo bien."},"con_kapi":{"content":"Te proporcionamos un informe detallado de la estrategia online de hasta 3 competidores: sus mejores palabras clave, sus fuentes de tráfico y sus campañas de anuncios."},"kapi_lo_hace":{"content":"Monitoreamos continuamente a tu competencia, adaptamos tu estrategia en tiempo real y ejecutamos campañas para superar sus resultados y capturar su cuota de mercado digital."}}},{"id":"palabras-clave-oportunidad","title":"Palabras Clave de Oportunidad","score":65,"status":"Mejorable","what_is_it":"Identifica términos de búsqueda de alto valor para los que tu competencia rankea y tú no.","why_it_matters":"Son oportunidades de bajo esfuerzo y alto impacto para crear contenido específico y robar tráfico cualificado a tus competidores.","sub_kpis":[{"label":"Relevancia","value":70},{"label":"Dificultad","value":80},{"label":"Volumen","value":50}],"soluciones":{"diy":{"content":"Encuentra en foros como Reddit o Quora las preguntas que hacen tus clientes. Cada pregunta es una potencial palabra clave de oportunidad para un artículo de blog."},"con_kapi":{"content":"Mediante análisis de \'Keyword Gap\', te entregamos un listado priorizado de palabras clave que tu competencia usa y tú no, con el potencial de tráfico estimado para cada una."},"kapi_lo_hace":{"content":"Desarrollamos una estrategia de contenidos completa para posicionarte en esas palabras clave de oportunidad, generando artículos, guías y recursos que atraen tráfico de alto valor."}}}]}]}';

// Devolver el string JSON del informe, tal como lo espera el frontend
wp_send_json_success(['report_content' => $report_content_string]);
