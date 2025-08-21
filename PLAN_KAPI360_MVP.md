### **Plan de Proyecto: Kapi360 - Motor de Diagnóstico Digital (MVP)**

#### **Fase 1: Planificación y Arquitectura (Rol: Project Manager)**
- [x] **Qué:** Definir el plan de proyecto, fases, stack tecnológico y roles.
- [x] **Dónde:** Documento de planificación.
- [x] **Cómo:** Analizar el brief y los activos existentes para crear una hoja de ruta detallada.

#### **Fase 2: Desarrollo Frontend (Rol: Desarrollador Frontend Senior)**
- [x] **Tarea 2.1:** Configurar el entorno de desarrollo inicial.
    - [x] Resolver fallos del instalador interactivo (`npx create-next-app`) mediante la creación manual de la estructura de archivos y la instalación de dependencias con `npm install`.
- [x] **Tarea 2.2:** Descomponer la maqueta estática en una arquitectura de componentes.
    - [x] Crear `Header.tsx` y mostrarlo en la página principal.
    - [x] Crear `HeroSection.tsx` y `DiagnosticForm.tsx` e integrarlos.
    - [x] Implementar lógica de estado (`useState`, `useEffect`) en `DiagnosticForm.tsx` para la selección de modo interactivo.
    - [x] Implementar animación de título en `HeroSection.tsx`, reemplazando la librería `animejs` por `framer-motion` para solucionar errores de compatibilidad.
    - [x] **Refactorizar `DiagnosticForm.tsx` para eliminar la manipulación directa del DOM y usar renderizado condicional idiomático de React.**
    - [x] Crear `ReportSection.tsx` para los resultados.
    - [x] Crear `Faq.tsx` para las preguntas frecuentes.
    - [x] Crear `Footer.tsx` para el pie de página.
- [x] **Tarea 2.3:** Implementar la lógica de envío de formulario y manejo de estado.
    - [x] Implementar manejador `onSubmit` en el formulario para prevenir recarga de página.
    - [x] Añadir estados para `url`, `isLoading`, `error` y `report`.
    - [x] Deshabilitar controles y mostrar `spinner` durante la carga (`isLoading`).
    - [x] Añadir marcador de posición para la llamada a la API (`setTimeout`).
    - [x] Conectar el estado `report` a un componente de visualización (`ReportSection.tsx`).
- [x] **Tarea 2.4:** Validar el flujo de usuario inicial.
    - [ ] **Delegar a Natalio:** "Natalio, una vez que la interfaz sea interactiva, te pediré que consultes al **Gem de Diseño UX** para obtener una segunda opinión sobre la fluidez y claridad del proceso de diagnóstico."

#### **Fase 3: Desarrollo Backend (Rol: Ingeniero de Backend)**
- [x] **Tarea 3.1:** Desarrollar la función sin servidor para el núcleo del diagnóstico.
    - [x] Crear el archivo `src/app/api/diagnose/route.ts`.
    - [x] Implementar una API Route de Next.js que reciba una URL.
    - [x] Orquestar la llamada a la **API de Gemini** para analizar el sitio web y generar los insights del informe.
- [x] **Tarea 3.2:** Configurar la base de datos y la autenticación (Opcional para MVP inicial, priorizar si se necesita guardar informes).
    - [x] **Qué:** Configurar la base de datos y la autenticación.
    - [x] **Dónde:** Plataforma de Supabase.
    - [x] **Cómo:** Crear un nuevo proyecto en Supabase. Diseñar y crear la tabla `diagnostics` para almacenar las URLs enviadas y los informes generados. Guardar las claves de API de forma segura.
- [ ] **Tarea 3.3:** Probar la lógica del prompt de Gemini de forma aislada.
    - [ ] **Delegar a Natalio:** "Natalio, el prompt para que Gemini analice una URL será complejo. Te pediré que uses **Google AI Studio** o **Jules** para experimentar y refinar el prompt hasta que obtengamos la calidad de insights que buscamos, antes de integrarlo en el código."
- [x] **Tarea 3.4:** Conectar la función sin servidor con la base de datos.
    - [x] **Dónde:** En el archivo `src/app/api/diagnose/route.ts`.
    - [x] **Cómo:** Usar el cliente de Supabase para Node.js para guardar cada solicitud y su resultado en la tabla `diagnostics`.

#### **Fase 4: Integración y Despliegue (Rol: Ingeniero DevOps y QA)**
- [x] **Qué:** Conectar el frontend con el backend.
- [x] **Dónde:** En el componente `DiagnosticForm` (`src/components/`).
- [x] **Cómo:** Implementar la llamada `fetch` al endpoint `/api/diagnose`. Gestionar los estados de carga, éxito y error para mostrarlos en la interfaz.

- [ ] **Qué:** Configurar el proyecto para el despliegue continuo.
- [ ] **Dónde:** Plataforma de Vercel.
- [ ] **Cómo:** Conectar el repositorio de Git al proyecto de Vercel. Configurar las variables de entorno (claves de Supabase y Gemini) para que el entorno de producción funcione correctamente.

- [ ] **Qué:** Realizar pruebas de extremo a extremo (E2E) y de calidad.
- [ ] **Dónde:** En la URL de vista previa de Vercel.
- [ ] **Cómo:** Realizar un flujo completo de diagnóstico. **Delegar a Natalio:** "Natalio, si durante las pruebas encontramos errores en la consola del navegador, te pediré que uses la extensión **DevTools AI Assistance** para obtener un análisis automático del problema."

- [ ] **Qué:** Desplegar a producción.
- [ ] **Dónde:** Vercel.
- [ ] **Cómo:** Hacer merge de la rama de desarrollo a la rama principal para activar el despliegue de producción.