### **Bitácora - Sesión 2025-08-20**

**Fase Actual:** 1 - Planificación
**Rol Actual:** Project Manager
**Resumen:** Se ha asumido el rol de Arquitecto Kapi360. Se analizó el brief del proyecto y se generó el plan de desarrollo detallado para el MVP "Motor de Diagnóstico Digital", abarcando las 4 fases del proyecto.
**Próximo Paso:** Esperar la confirmación de Natalio para dar por concluida la Fase 1 e iniciar la Fase 2: Desarrollo Frontend.

---

### **Bitácora - Sesión 2025-08-20 (Continuación)**

**Fase Actual:** 2 - Desarrollo Frontend
**Rol Actual:** Desarrollador Frontend Senior

**Resumen:**
- Se inició la Fase 2 con la configuración del entorno de Next.js.
- Se encontraron y superaron múltiples obstáculos con el instalador interactivo `npx create-next-app`.
- **Decisión de Arquitectura 1:** Se procedió con una creación manual de la estructura de archivos del proyecto para garantizar una configuración limpia y no interactiva.
- Se guio al usuario para la instalación de dependencias (`npm install`).
- Se comenzó la componentización de la UI a partir de `index.html`:
    - Creados `Header.tsx`, `HeroSection.tsx`, y `DiagnosticForm.tsx`.
    - Implementada la lógica de estado inicial en `DiagnosticForm.tsx` para controlar la visibilidad de las opciones.
- Se encontró un error de ejecución persistente con la librería `animejs`.
- **Decisión de Arquitectura 2:** Se determinó que `animejs` tenía un conflicto de compatibilidad. Se tomó la decisión de reemplazarla por `framer-motion`, una librería más robusta y nativa de React.
- Se guio al usuario para desinstalar `animejs` e instalar `framer-motion`.
- Se refactorizó con éxito el componente `HeroSection.tsx` para usar `framer-motion`, solucionando el error y restaurando la animación del título.

**Estado Final de la Sesión:**
- El esqueleto del proyecto Next.js está configurado y funcional.
- Los componentes base de la UI (`Header`, `HeroSection`, `DiagnosticForm`) están creados e integrados.
- La interactividad básica (selección de modo, animación de título) está funcionando con la nueva librería `framer-motion`.
- El proyecto se encuentra en un estado estable y listo para continuar con la creación de los componentes restantes.