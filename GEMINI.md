Playbook Estratégico del Agente de Diagnóstico Kapi
Este documento define la estrategia, el objetivo y el flujo de usuario de la herramienta de diagnóstico de Kapi. Actúa como el mapa de ruta de alto nivel para asegurar que cada acción técnica esté alineada con el objetivo de negocio.

1. Objetivo de Negocio: La Esencia de la Marca Kapi
   El objetivo principal no es solo la captación de leads, sino la validación y cualificación de prospectos. La herramienta se posiciona como una prueba de la promesa de la marca Kapi: ser un socio estratégico que se enfoca en los Key Performance Indicators (KPIs) para generar crecimiento medible. La herramienta convierte los "dolores" del cliente en KPIs deficientes, demostrando que Kapi es la solución.
2. Perfil del Cliente Ideal (ICP)
   ¿Quién es? Una PYME manufacturera argentina.
   Sus Dolores: Sienten que su marketing es "hecho a pulmón," que su sitio web es "viejo," que "las redes sociales no traen clientes," y no logran entender el ROI.
   Su Deseo: Buscan un socio estratégico que les dé confianza, profesionalismo y resultados medibles.
3. Flujo del Usuario (Experiencia en Dos Fases)
   La experiencia está diseñada para ser fluida, profesional y de intercambio de valor.
   Fase 1: Informe Inmediato (Sin Fricción)
   Acción del Usuario: Ingresa la URL de su sitio web y hace clic en "Generar Informe".
   Objetivo de Kapi: Ofrecer un valor rápido y tangible sin pedir datos de contacto. La herramienta muestra una puntuación general y un resumen de los KPIs principales.
   Herramientas Clave: Gemini (a través de SureWriter) interpreta los datos de la API de Google PageSpeed Insights para generar un informe de alto nivel directamente en la landing page.
   Fase 2: Informe Personalizado (Con Fricción Justificada)
   Acción del Usuario: Después de ver el informe inicial, se le ofrece un "análisis más preciso" a cambio de completar un formulario.
   Objetivo de Kapi: Capturar datos de contacto clave, entender mejor la situación del cliente (ej. sus competidores) y cualificar el lead.
   Herramientas Clave: SureTriggers Pro toma los datos del formulario y activa un flujo para notificarte a ti y a tu equipo. SureWriter, potenciado por Gemini, genera el análisis de competencia para un informe profesional.
4. Contenido del Informe y Ganchos de Venta (Enfoque KPI)
   Cada sección del informe convierte un problema técnico en un KPI deficiente, que Kapi puede resolver.
   Plataforma y UX (Impacto SEO/AEO y UX):
   KPIs: Puntuación de velocidad de carga, usabilidad móvil.
   Gancho: Conecta un sitio web lento o desactualizado con un alto KPI de rebote y una baja puntuación de SEO. La solución de Kapi es el Desarrollo Web para mejorar estos KPIs.
   Contenido y Redes (Impacto en la Marca y la Conversión):
   KPIs: Frecuencia de publicación, engagement, falta de activos de conversión (newsletter, catálogos).
   Gancho: La inconsistencia se presenta como un KPI de alcance y engagement deficiente. Kapi ofrece la Gestión de Campañas en Redes Sociales y la Creatividad y Guionado de piezas para convertir este canal en un motor de ventas medible.
   Mercado y Competencia (Impacto en Visibilidad y Oportunidades):
   KPIs: Visibilidad en buscadores, cuota de mercado digital.
   Gancho: La falta de posicionamiento en Google se traduce en la pérdida de cuota de mercado digital frente a la competencia. Kapi ofrece la Gestión de Campañas de Google Adwords para mejorar este KPI de visibilidad.
5. Stack Tecnológico y Herramientas
   Este apartado detalla el ecosistema de herramientas que se utilizarán para construir y potenciar el proyecto, minimizando la necesidad de código.
   SureTriggers Pro (Automatización y Lógica): Es el cerebro del agente de IA. Se encargará de conectar todos los servicios, desde la captura del formulario hasta la comunicación con las APIs y el envío de las notificaciones.
   SureWriter Pro (Generación de Contenido e Insights): Es el motor de la voz de Kapi. Generará los textos clave del informe, traduciendo los datos técnicos en insights de negocio claros y concisos.
   Astra Pro / Spectra Pro / Ultimate Addons (Frontend y Diseño): Son las herramientas de construcción de la landing page. Se utilizarán para crear la interfaz de usuario con un diseño profesional y la capacidad de mostrar el informe de forma dinámica.
   ZipWP Pro (Prototipos Rápidos): Se usará para generar prototipos de sitios web de forma ágil, permitiendo a Kapi mostrar soluciones visuales a los clientes potenciales, haciendo el valor de la agencia tangible.
   Gemini (IA Generativa): Se utilizará a través de SureWriter para generar contenido del informe y del blog. También se usará con VSCode para la implementación de código y con los "gems de diseño" para crear los mockups visuales.
6. Consideraciones Adicionales
   SEO/AEO Integrado: Todo el contenido del sitio (blog, base de conocimientos) estará diseñado con un enfoque SEO para atraer tráfico orgánico de forma constante. Se analizará el posicionamiento de apps si es relevante para el prospecto.
   Lead Scoring: Se implementará un sistema de puntuación para priorizar a los leads que completan la segunda fase del informe. Esto te permite enfocarte en los clientes con mayor potencial.
   Integración de Leads: Los leads cualificados serán enviados automáticamente a tu CRM para una gestión fluida del proceso de ventas.
   Este playbook es la guía estratégica para la implementación técnica. El siguiente documento detalla cómo construirlo.

Guía de Implementación Técnica: Agente Kapi 360°
Este documento es el manual paso a paso para construir la herramienta de diagnóstico utilizando tu stack de herramientas, con un enfoque en la fiabilidad, la medición y la automatización del embudo de ventas.

1. Arquitectura de la Solución (Conexión de Herramientas)
   Interfaz de Usuario (Frontend): Un archivo `index.html` local con JavaScript (`main.js`) que maneja la lógica del formulario.
   Servidor de Desarrollo Local: Se utiliza `Netlify Dev` para servir los archivos locales y actuar como un proxy para evitar problemas de CORS. Una regla en `netlify.toml` redirige las llamadas de `/api/get-report` al backend.
   Lógica de Backend: Un script PHP (`kapi-endpoint.php`) alojado en WordPress. Este script recibe la petición, llama a la API de Gemini para generar el informe, envía datos a SureTriggers en segundo plano y devuelve el informe final al frontend.
   Automatización en Segundo Plano: SureTriggers se utiliza para tareas que no necesitan bloquear al usuario, como enviar notificaciones o actualizar un CRM, recibiendo los datos desde el script PHP.
2. Prompts para Gemini: Generación de Mockup y Código
   Prompt para el "Gem de Diseño UX" (para generar el mockup):
   "Quiero un diseño de interfaz de usuario para un informe que se despliegue en la misma landing page. El público objetivo son dueños y gerentes de PYMES manufactureras.

Utiliza la siguiente guía de estilos:

- Paleta de Colores: Primario #0057FF, Acento #00DD82, Fondo #1A1A1A, Texto #E5E7EB.
- Tipografía: Poppins, sans-serif.
- Botones: Fondo #0057FF, texto blanco, bordes redondeados.

El diseño debe incluir:

- Una Puntuación General de 85/100 destacada en el color de acento.
- Tres secciones modulares con títulos: 'Plataforma y UX', 'Contenido y Redes', 'Mercado y Competencia'.
- Dentro de cada sección, muestra visualizaciones de datos simples (barras de progreso, listas de verificación) y un párrafo con un insight de negocio que conecte el problema con los servicios de Kapi.
- Un área para solicitar datos de competidores, con un formulario simple.
- Un botón de llamada a la acción al final que diga 'Agenda tu Reunión con un Experto'.

Prompt para Gemini VSCode (para implementar la lógica del informe):
// Objetivo: Escribe el código JavaScript para la landing page del agente de diagnóstico.
// Tarea 1: El código debe manejar el envío de un formulario de una URL (sin recargar la página).
// Tarea 2: Debe usar una llamada asíncrona (fetch) para enviar la URL a un endpoint de proxy local (`/api/get-report`).
// Tarea 3: El proxy local (manejado por Netlify Dev) redirigirá la llamada a un script PHP en el backend de WordPress.
// Tarea 4: Cuando la página reciba una respuesta JSON del script PHP, el código debe buscar el informe en `result.data.report_content`.
// Tarea 5: El código debe 'pintar' de forma dinámica el contenido del informe en un div con el ID 'report-content'.
// Tarea 6: Utiliza un estado de 'cargando' para mostrar un mensaje mientras el informe se genera.

Prompt para SureWriter Pro (para generar el contenido del informe de forma dinámica):
"Actúa como un analista experto en marketing digital. Genera un insight de negocio de 50 palabras para una PYME manufacturera. Basado en que su [KPI_analizado] tiene un resultado de [Dato_obtenido], explica brevemente cómo este dato afecta el [KPI_de_negocio] de la empresa. Conecta este problema con nuestro servicio de [Servicio_de_Kapi]."

3. Flujo en SureTriggers Pro (Paso a Paso y Lógica Avanzada)
   Disparador (Trigger): Configura el trigger para que escuche el "Webhook" de tu landing page.
   Módulo 1: Conexión a API y Lógica de Reintento: Conecta un módulo de "HTTP Request" a la API de Google PageSpeed Insights. Configura la lógica de reintento automático para asegurar que el flujo no falle si la primera llamada falla.
   Módulo 2: Lógica Condicional (Router): Crea un "Router" para manejar las dos fases del informe y las diferentes opciones de análisis. Esto garantiza un flujo modular según la selección del usuario.
   Módulo 3: Procesamiento de Datos: Analiza la respuesta JSON de las APIs para extraer los datos relevantes.
   Módulo 4: Generación de Contenido con IA: Llama a la API de SureWriter con el prompt dinámico y las variables extraídas de los datos.
   Módulo 5: Notificaciones y Manejo de Errores:
   Si el flujo es exitoso, notifica a tu equipo vía Slack o email.
   Si la automatización falla, envía una notificación de error con los detalles para una pronta corrección.
   Módulo 6: Lead Scoring y CRM: Asigna una puntuación al lead basado en los resultados del informe y el nivel de interacción, y luego envía los datos automáticamente a tu CRM.
   Módulo 7: Respuesta (Response): Devuelve un JSON a la landing page con todos los datos y el texto generado para el informe, haciendo que la experiencia sea fluida e inmediata.
4. Estrategia de Medición y Optimización
   A/B Testing: Utiliza las capacidades de Astra Pro y Spectra Pro para crear diferentes versiones de la landing page y probar qué diseño, color o texto de llamada a la acción convierte mejor.
   Analíticas de Conversión: Configura eventos en Google Analytics para medir con precisión las tasas de conversión de la Fase 1 a la Fase 2 del informe.
   https://kapikinsta.kinsta.cloud/
