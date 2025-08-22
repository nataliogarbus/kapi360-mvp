# Plan de Ejecución: Laboratorio de Estrategia Kapi

Este plan detalla la implementación del "Laboratorio de Estrategia Kapi" basado en el `BRIEF_FINAL.md`.

---

### Etapa 1 a 5 (Completadas)
*(Las etapas anteriores documentan el desarrollo inicial hasta la implementación de la arquitectura Next.js/Vercel/Supabase y las primeras versiones del dashboard.)*

- [x] Tareas 1.1 a 5.11 completadas.

---

### Etapa 6: Refinamiento y Visión Unificada (v2.1)
*Objetivo: Alinear la aplicación con la visión estratégica definitiva del informe como una herramienta 100% interactiva.*

- [ ] **Tarea 6.1:** Aclarar la visión del informe: el dashboard interactivo **es** el informe. No hay una sección de "análisis detallado" separada.
- [ ] **Tarea 6.2:** Actualizar los pilares de análisis a los 4 definidos:
    - `Mercado y Competencia`
    - `Plataforma y UX`
    - `Contenido y Redes`
    - `Crecimiento e IA`
- [ ] **Tarea 6.3:** Unificar la vista del informe en `ReportSection.tsx`, eliminando el renderizado de texto plano y dejando solo el dashboard interactivo.
- [ ] **Tarea 6.4:** Actualizar la función `parseReport` para que busque y extraiga los datos de los nuevos 4 pilares, basándose en la nueva estructura de prompt definida en `GEMINI.md`.
- [ ] **Tarea 6.5:** Refinar el formulario de `DiagnosticForm.tsx` para que las 4 modalidades de análisis (`Automático`, `Personalizado`, `Manual`, `Consulta`) sean claras y funcionales.