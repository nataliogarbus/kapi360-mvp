# Plan de Ejecución: Laboratorio de Estrategia Kapi

Este plan detalla la implementación del "Laboratorio de Estrategia Kapi" basado en el `BRIEF_FINAL.md`.

---

### Etapa 1: Estructura y Estilo Base
*Objetivo: Establecer la base del proyecto con la nueva maqueta y organización.*

- [x] **Tarea 1.1:** Reemplazar `index.html` con la maqueta `kapi-home-final.html`.
- [x] **Tarea 1.2:** Extraer CSS a `src/css/style.css`.
- [x] **Tarea 1.3:** Extraer JavaScript a `src/js/main.js`.
- [x] **Tarea 1.4:** Limpiar `index.html` para enlazar archivos externos.
- [x] **Tarea 1.5:** Crear `BRIEF_FINAL.md` con el brief detallado del proyecto.
- [x] **Tarea 1.6:** Crear `src/js/sample-data.json` con una estructura de datos de ejemplo para el informe, simulando la respuesta de OttoKit.

---

### Etapa 2: Implementación del Informe - Fase 1 (El Gancho)
*Objetivo: Mostrar el informe compacto inicial después de que el usuario envíe la URL.*

- [x] **Tarea 2.1:** Modificar `index.html` para añadir la sección (inicialmente oculta) que contendrá el informe.
- [x] **Tarea 2.2:** Implementar la lógica en `main.js` para que, al enviar el formulario, se oculte el formulario y se muestre una animación de carga.
- [x] **Tarea 2.3:** Implementar una función en `main.js` que lea los datos de `sample-data.json` y renderice el informe Fase 1 (compacto) en la sección de resultados.
- [x] **Tarea 2.4:** Implementar el componente "Brújula Estratégica" (gráfico de dona) usando una librería de JS.
- [x] **Tarea 2.5:** Implementar las 4 tarjetas de "Rutas Óptimas" (solo título y puntuación).
- [x] **Tarea 2.6:** Implementar el botón "DESBLOQUEAR MI MAPA COMPLETO".

---

### Etapa 3: Implementación del Registro - Fase 2
*Objetivo: Mostrar el formulario de registro al hacer clic en el botón de desbloqueo.*

- [x] **Tarea 3.1:** Modificar `index.html` para añadir la estructura del módulo de registro (inicialmente oculta).
- [x] **Tarea 3.2:** Implementar la lógica en `main.js` para que al hacer clic en "Desbloquear", se oculte el informe Fase 1 y se muestre el módulo de registro.

---

### Etapa 4: Implementación del Dashboard - Fase 3
*Objetivo: Mostrar el dashboard completo después del registro.*

- [x] **Tarea 4.1:** Modificar `index.html` para añadir la estructura del dashboard completo (inicialmente oculta).
- [x] **Tarea 4.2:** Implementar la lógica en `main.js` para que, tras un registro simulado, se oculte el módulo de registro y se muestre el dashboard.
- [x] **Tarea 4.3:** Implementar las tarjetas expandibles ("acordeón") para las "Rutas Óptimas".
- [x] **Tarea 4.4:** Implementar los gráficos de anillo segmentado para cada tarjeta.
- [x] **Tarea 4.5:** Implementar la sección "Plan de Acción Recomendado".
- [x] **Tarea 4.6:** Implementar el panel lateral deslizable "Panel de Inteligencia".

---

### Etapa 5: Conexión Final y Pruebas
*Objetivo: Reemplazar los datos de ejemplo con la llamada real al backend y pulir la experiencia.*

- [ ] **Tarea 5.1:** Reemplazar la lectura de `sample-data.json` en `main.js` por una llamada `fetch` real al webhook de OttoKit.
- [ ] **Tarea 5.2:** Implementar el manejo de errores y estados de la UI (ej. URL inválida).
- [ ] **Tarea 5.3:** Realizar pruebas funcionales completas del flujo completo.
