# Brief de Diseño y Desarrollo: Laboratorio de Estrategia Kapi

**Referencia Visual Principal:** El diseño de la página de inicio (`kapi-home-final.html`) ya aprobado.

## 1. Objetivo
Crear los mockups y la implementación funcional para la plataforma "Laboratorio de Estrategia Kapi", siguiendo un flujo de experiencia de usuario dinámico y contenido en una única página.

## 2. Filosofía de Marca
- **Concepto Central:** Kapi es un Laboratorio de Estrategia Digital que fusiona la Inteligencia Artificial con el juicio de Estrategas Humanos.
- **Propuesta de Valor:** La IA provee el mapa; el humano te ayuda a navegarlo y a ejecutar el plan.
- **Tono de Voz:** "Científico Estratega": analítico, preciso y un partner de confianza que valida la inteligencia del cliente.

## 3. Dirección de Diseño y Estética
- **Estilo General:** Moderno, tecnológico, minimalista.
- **Inspiración para Estadísticas:** Google PageSpeed Insights (claro, métrico, funcional, con gráficos de dona y barras de progreso).
- **Inspiración para Estética General:** Apollo.io (profesional, limpio, estructurado, B2B SaaS).

## 4. Flujo de Usuario y Navegación

### 4.1. Directiva Principal de UX: Experiencia "Single-Page"
Toda la experiencia de diagnóstico, desde el ingreso de la URL hasta la visualización del informe completo, debe ocurrir dinámicamente dentro de la sección principal de la página de inicio, sin recargar la página. El flujo es el siguiente:
1. El usuario interactúa con el formulario en la home.
2. Al enviar, el contenedor del formulario desaparece.
3. En su lugar, aparece la animación de carga.
4. La animación es reemplazada por el **Informe Fase 1 (vista compacta)**.
5. Al hacer clic en "Desbloquear", el informe compacto es reemplazado por el **módulo de registro (Fase 2)**.
6. Tras el registro, el módulo es reemplazado por el **Dashboard Completo (Fase 3)**.

### 4.2. Fases del Informe

**Fase 1: El Informe Instantáneo (El Gancho - Sin Registro)**
- **Layout:** Una "vista compacta" que aparece dinámicamente en la home.
- **Componente 1: La Brújula Estratégica:** Puntuación general (ej: "72/100") en un gráfico circular de progreso (estilo "donut"), simple y limpio.
- **Componente 2: Resumen de Rutas Óptimas:** 4 tarjetas con el título y la puntuación de cada Ruta, sin detalle.
- **Componente 3: El CTA de Desbloqueo:** Un área destacada con el titular "Este es solo el resumen." y el botón "DESBLOQUEAR MI MAPA COMPLETO".

**Fase 2: Pantalla de Registro y Enriquecimiento de Datos**
- **Layout:** Un módulo que reemplaza al informe compacto.
- **Componente 1: Formulario de Registro:** Campos para Nombre, Email, Contraseña.
- **Componente 2: Módulo de Enriquecimiento (Opcional):** Campos para URL de competidor y perfiles sociales.
- **Botón CTA:** "COMPLETAR REGISTRO Y VER MI MAPA".

**Fase 3: El Dashboard Principal Completo (Post-Registro)**
- **Layout:** Una vista expandida y detallada que reemplaza al módulo de registro.
- **Componentes Interactivos:**
    - **Brújula Estratégica:** Puntuación general (gráfico circular).
    - **Rutas Óptimas (Tarjetas Expandibles):** 4 tarjetas de "acordeón". Cada una con un gráfico circular segmentado que representa sus 3 "Coordenadas Clave".
    - **Control Global:** Botón de "Expandir Todo / Contraer Todo".
- **Componente 4: Tu Plan de Acción Recomendado:** Una checklist priorizada con las 3 "Coordenadas Clave" más críticas.
- **Componente 5: Asistencia Humana Persistente:** Un botón flotante ("Hablar con un Estratega") y enlaces contextuales en el informe.

## 5. Panel Lateral ("Panel de Inteligencia")
- **Activación:** Se activa al hacer clic en una "Coordenada Clave" en el Dashboard Completo (Fase 3).
- **Comportamiento:** Se desliza suavemente desde la derecha.
- **Contenido:** Título de la Coordenada, "¿Qué es esto?", "¿Por qué es importante?", y "Próximos Pasos".

## 6. Contenido Detallado del "Mapa de Crecimiento"
- **Ruta 1: Visibilidad de Mercado** (Autoridad de Dominio, Huella en Buscadores, Experiencia Móvil)
- **Ruta 2: Plataforma Web** (Velocidad de Carga, Estructura y Claridad (UX), Seguridad y Confianza)
- **Ruta 3: Motor de Contenido** (Calidad y Relevancia, Frecuencia y Consistencia, Presencia en Redes Sociales)
- **Ruta 4: Mecanismos de Conversión** (Llamados a la Acción, Captura de Leads, Potencial de Automatización)

## 7. Otros Elementos a Diseñar
- Página de Servicio "Construcción desde Cero".
- Plantilla de Email.
- Página de Agendamiento (Calendly).
- Estados de la Interfaz (error, usuario recurrente).
