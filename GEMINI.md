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
Este documento es el manual paso a paso que refleja la arquitectura final del proyecto Kapi 360.

1. Arquitectura de la Solución (Stack Tecnológico y Flujo de Datos)
   - **Framework Frontend:** Next.js (React). El proyecto reside en el directorio `kapi360-mvp`.
   - **Componentes:** La interfaz está construida con componentes de React (`.tsx`), ubicados en `kapi360-mvp/src/components`.
   - **Lógica de Backend:** API Route de Next.js. La lógica principal se encuentra en `kapi360-mvp/src/app/api/diagnose/route.ts`.
   - **Servicio de IA:** La API de Google Gemini (a través de la librería `@google/generative-ai`) se llama directamente desde la API Route para generar los análisis.
   - **Base de Datos:** Supabase. Cada diagnóstico generado se almacena en una tabla `diagnostics` para registro y futuros análisis.
   - **Despliegue:** Vercel. El repositorio de Git está conectado a Vercel para despliegue continuo.

   **Flujo de Datos:**
   1. El usuario interactúa con la aplicación en la URL de Vercel.
   2. Al enviar el formulario, el cliente (React) hace una llamada `fetch` a su propio backend (`/api/diagnose`).
   3. La API Route en Next.js recibe la petición.
   4. La API Route construye un prompt dinámico y se comunica con la API de Gemini.
   5. La API Route recibe la respuesta de Gemini y la guarda en Supabase (en segundo plano).
   6. La API Route devuelve el análisis al cliente.
   7. El cliente (React) renderiza dinámicamente el informe en la interfaz.

2. Prompts Clave para Gemini
   - **Prompt del Sistema (en `route.ts`):** "Actúa como un analista experto en marketing digital y estrategia de negocio para PYMES. Tu cliente te ha proporcionado la URL de su sitio web para un diagnóstico rápido. URL del cliente: ${url}. Tipo de análisis solicitado: ${mode}. Por favor, genera un informe conciso y accionable en formato Markdown. El tono debe ser profesional, directo y orientado a resultados de negocio (KPIs), no solo a métricas técnicas."
   - **Lógica de Modos:** El prompt se adapta dinámicamente según el modo seleccionado (`auto`, `custom`, `manual`, `consulta`), añadiendo instrucciones específicas para cada caso.

3. Variables de Entorno
   El correcto funcionamiento depende de las siguientes variables de entorno definidas en un archivo `.env.local` en la raíz de `kapi360-mvp`:
   - `GEMINI_API_KEY`: Clave para la API de Google Gemini.
   - `NEXT_PUBLIC_SUPABASE_URL`: URL del proyecto de Supabase.
   - `SUPABASE_SERVICE_ROLE_KEY`: Clave de servicio de Supabase para operaciones de backend.

4. Estrategia de Medición y Optimización
   - **Analíticas:** Se pueden configurar eventos en Vercel Analytics y/o Google Analytics para medir la interacción del usuario y las tasas de conversión.
   - **A/B Testing:** Vercel permite realizar A/B testing para probar diferentes variantes de la interfaz o de los prompts de Gemini y optimizar los resultados.
   - **Base de Datos:** La información guardada en Supabase es clave para analizar la calidad de los informes y el tipo de clientes que utilizan la herramienta.

