Playbook Estratégico del Agente de Diagnóstico Kapi
(El Playbook Estratégico de alto nivel se mantiene sin cambios)

---

Guía de Implementación Técnica: Agente Kapi 360° (v2.2)
Este documento es el manual paso a paso que refleja la arquitectura final y la visión detallada e interactiva del proyecto Kapi 360.

### 1. Arquitectura de la Solución (v2.1)
(La arquitectura base con Next.js, Supabase y Vercel se mantiene)

**Flujo de Datos Unificado (v2.1):**
El flujo general se mantiene, pero el `parseReport` en `ReportSection.tsx` se volverá significativamente más complejo para poder extraer la nueva estructura de datos anidada que generará la IA.

### 2. Evolución del Informe (v2.2)
La versión 2.2 transforma el dashboard en una herramienta de análisis profunda con múltiples capas de interacción.

- **Flujo de Acordeón:** Se elimina el panel lateral. El clic en un cuadrante lo expande en el mismo lugar para mostrar su detalle.
- **Mini-Brújulas:** Cada "Coordenada Clave" (sub-métrica) tendrá su propio puntaje y una visualización tipo "mini-brújula".
- **Planes de Acción Anidados:** Las "Rutas de Solución" (`Lo Hago Yo`, etc.) son ahora acordeones que, al expandirse, revelan un plan de acción detallado y específico para esa ruta.
- **Funcionalidad Adicional:** Se añadirá la opción de "ver todo" y "enviar por correo" (con suscripción).

### 3. Prompt Clave para Gemini (v2.2 - Visión Detallada)
Este es el nuevo prompt diseñado para generar la estructura de datos completa y anidada que necesita la v2.2.

- **Prompt del Sistema (en `route.ts`):** "Actúa como un analista experto en marketing digital y estratega de negocio para PYMES. Genera un informe detallado y accionable en formato Markdown basado en la URL del cliente: ${url}. El tono debe ser profesional, directo y orientado a KPIs. **La estructura del informe DEBE seguir este formato anidado EXACTO, incluyendo todos los títulos, puntajes, subtítulos en negrita y guiones:**

		**Puntaje General:** [Puntaje de 0 a 100]/100

		## Mercado y Competencia (Puntaje: [Puntaje de 0 a 100]/100)
		**Qué es:** [Explicación concisa del pilar]
		**Por qué importa:** [Explicación del impacto en el negocio]
		**Coordenadas Clave:**
		- **[Nombre de Métrica 1]:** [Puntaje de 0 a 100]/100
		- **[Nombre de Métrica 2]:** [Puntaje de 0 a 100]/100
		- **[Nombre de Métrica 3]:** [Puntaje de 0 a 100]/100
		- **[Nombre de Métrica 4]:** [Puntaje de 0 a 100]/100
		**Plan de Acción:**
		- **Lo Hago Yo:**
		  - [Paso 1 a realizar por el usuario]
		  - [Paso 2 a realizar por el usuario]
		- **Lo Hace Kapi con mi Equipo:**
		  - [Paso 1 en colaboración]
		  - [Paso 2 en colaboración]
		- **Lo Hace Kapi:**
		  - [Paso 1 que ejecuta Kapi]
		  - [Paso 2 que ejecuta Kapi]

		## Plataforma y UX (Puntaje: [Puntaje de 0 a 100]/100)
		(Repetir la misma estructura anidada que el pilar anterior)

		## Contenido y Redes (Puntaje: [Puntaje de 0 a 100]/100)
		(Repetir la misma estructura anidada que el pilar anterior)

		## Crecimiento e IA (Puntaje: [Puntaje de 0 a 100]/100)
		(Repetir la misma estructura anidada que el pilar anterior)

		(Cualquier texto adicional o resumen puede ir aquí, después de los 4 pilares estructurados.)"
