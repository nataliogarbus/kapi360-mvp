# Plan de Ejecución: Laboratorio de Estrategia Kapi

Este plan detalla la implementación del "Laboratorio de Estrategia Kapi" basado en el `BRIEF_FINAL.md`.

---

### Etapa 1 a 5 (Completadas)
*(Las etapas anteriores documentan el desarrollo inicial hasta la implementación de la arquitectura Next.js/Vercel/Supabase y las primeras versiones del dashboard.)*

- [x] Tareas 1.1 a 5.11 completadas.

---

### Etapa 6: Refinamiento y Visión Unificada (v2.1)
*Objetivo: Alinear la aplicación con la visión estratégica definitiva del informe como una herramienta 100% interactiva.*

- [x] **Tarea 6.1:** Aclarar la visión del informe: el dashboard interactivo **es** el informe.
- [x] **Tarea 6.2:** Actualizar los pilares de análisis a los 4 definidos.
- [x] **Tarea 6.3:** Unificar la vista del informe en `ReportSection.tsx`.
- [x] **Tarea 6.4:** Actualizar la función `parseReport` para que busque y extraiga los datos de los nuevos 4 pilares.
- [x] **Tarea 6.5:** Refinar el formulario de `DiagnosticForm.tsx` para clarificar los modos de análisis.

---

### Etapa 7: Evolución a Informe Detallado (v2.2)
*Objetivo: Implementar la visión detallada del informe, con múltiples capas de interactividad y nuevas funcionalidades.*

- [ ] **Tarea 7.1 (Bug Fix):** Corregir el CSS del efecto `hover` en los cuadrantes para que el texto se muestre correctamente.
- [ ] **Tarea 7.2 (Flujo Principal):** Reemplazar el panel lateral por un sistema de acordeón, donde cada cuadrante se expande "en el sitio" para mostrar los detalles.
- [ ] **Tarea 7.3 (Micro-Dashboards):** Diseñar e implementar "mini-brújulas" para cada coordenada dentro de un pilar.
- [ ] **Tarea 7.4 (Planes Anidados):** Implementar un segundo nivel de acordeón dentro de las "Rutas de Solución" (`Lo Hago Yo`, etc.) para mostrar el plan de acción específico de cada una.
- [ ] **Tarea 7.5 (UX):** Añadir un botón o toggle para "Expandir Todo" / "Contraer Todo" el plan de acción.
- [ ] **Tarea 7.6 (Funcionalidad Clave):** Implementar la función "Enviar por Correo", incluyendo la captura de email y la lógica de suscripción a newsletter.
