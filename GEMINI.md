Playbook Estratégico del Agente de Diagnóstico Kapi
Este documento define la estrategia, el objetivo y el flujo de usuario de la herramienta de diagnóstico de Kapi. Actúa como el mapa de ruta de alto nivel para asegurar que cada acción técnica esté alineada con el objetivo de negocio.

(El Playbook Estratégico de alto nivel se mantiene sin cambios)

---

Guía de Implementación Técnica: Agente Kapi 360° (v2.1)
Este documento es el manual paso a paso que refleja la arquitectura final y la visión unificada del proyecto Kapi 360.

1. Arquitectura de la Solución (Stack Tecnológico y Flujo de Datos)
   - **Framework Frontend:** Next.js (React). Proyecto en `kapi360-mvp`.
   - **Componentes Clave:**
     - `page.tsx`: Orquesta la lógica principal (estados de carga, error, etc.).
     - `ReportSection.tsx`: **El corazón de la aplicación.** Recibe el informe en Markdown de la API y lo **parsea** para transformarlo en los datos que alimentan a todos los componentes interactivos del dashboard.
     - `MapaCentral.tsx`: Muestra los 4 pilares interactivos.
     - `StrategicCompass.tsx`: Muestra el puntaje general y su desglose.
     - `PanelDeInteligencia.tsx`: El panel deslizable con el detalle y las rutas de solución.
   - **Lógica de Backend:** API Route de Next.js (`/api/diagnose`).
   - **Servicio de IA:** Google Gemini API.
   - **Base de Datos:** Supabase (almacenamiento de diagnósticos).
   - **Despliegue:** Vercel.

   **Flujo de Datos Unificado:**
   1. El usuario introduce una URL y selecciona un modo.
   2. El cliente (React) llama a `/api/diagnose`.
   3. La API Route construye un prompt dinámico (ver abajo) y llama a Gemini.
   4. La API Route devuelve el informe completo en formato Markdown.
   5. El componente `ReportSection.tsx` recibe este Markdown.
   6. Una función `parseReport` dentro de `ReportSection.tsx` **descompone el Markdown**, extrayendo los datos de cada pilar (puntaje, textos, coordenadas).
   7. Los datos extraídos se pasan como `props` a `MapaCentral` y `StrategicCompass`, renderizando el **dashboard interactivo que es, en sí mismo, el informe final.** No hay una sección de texto plano separada.

2. Prompts Clave para Gemini (Actualizado)
   - **Prompt del Sistema (en `route.ts`):** "Actúa como un analista experto en marketing digital y estrategia de negocio para PYMES. Tu cliente te ha proporcionado la URL de su sitio web para un diagnóstico rápido. URL del cliente: ${url}. Tipo de análisis solicitado: ${mode}. Por favor, genera un informe conciso y accionable en formato Markdown. El tono debe ser profesional, directo y orientado a resultados de negocio (KPIs). **La estructura del informe DEBE seguir este formato EXACTO, incluyendo los títulos, puntajes y subtítulos en negrita:**

		**Puntaje General:** [Puntaje de 0 a 100]/100

		## Mercado y Competencia (Puntaje: [Puntaje de 0 a 100]/100)
		**Qué es:** [Explicación concisa del pilar]
		**Por qué importa:** [Explicación del impacto en el negocio]
		**Coordenadas Clave:**
		- [Métrica 1]
		- [Métrica 2]
		- [Métrica 3]

		## Plataforma y UX (Puntaje: [Puntaje de 0 a 100]/100)
		**Qué es:** [Explicación concisa del pilar]
		**Por qué importa:** [Explicación del impacto en el negocio]
		**Coordenadas Clave:**
		- [Métrica 1]
		- [Métrica 2]
		- [Métrica 3]

		## Contenido y Redes (Puntaje: [Puntaje de 0 a 100]/100)
		**Qué es:** [Explicación concisa del pilar]
		**Por qué importa:** [Explicación del impacto en el negocio]
		**Coordenadas Clave:**
		- [Métrica 1]
		- [Métrica 2]
		- [Métrica 3]

		## Crecimiento e IA (Puntaje: [Puntaje de 0 a 100]/100)
		**Qué es:** [Explicación concisa del pilar]
		**Por qué importa:** [Explicación del impacto en el negocio]
		**Coordenadas Clave:**
		- [Métrica 1]
		- [Métrica 2]
		- [Métrica 3]

		(Cualquier texto adicional o resumen puede ir aquí, después de los 4 pilares estructurados.)"

   - **Lógica de Modos:** El prompt se adapta dinámicamente. Para el modo `Personalizado`, solo se incluirán las secciones de los pilares que elija el usuario.

3. Variables de Entorno (Sin cambios)
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

