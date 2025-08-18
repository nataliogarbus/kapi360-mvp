// Este script debe ir en un archivo .js separado, por ejemplo, kapi-main.js
// y ser enlazado en tu HTML (preferiblemente en el footer con 'defer' o 'async')

document.addEventListener('DOMContentLoaded', function () {
  // --- Constantes para IDs y Selectores (Mejora de Mantenibilidad) ---
  const FORM_ID = 'kapi-contained-form';
  const WEBSITE_URL_INPUT_ID = 'website-url';
  const REPORT_DISPLAY_ID = 'kapi-report-display';
  const CUSTOM_OPTIONS_CONTAINER_ID = 'custom-options-container';
  const AUTO_ANALYSIS_RADIO_ID = 'auto-analysis';
  const CUSTOM_ANALYSIS_RADIO_ID = 'custom-analysis';
  const PROXY_URL = '/kapi-endpoint.php'; // Tu endpoint PHP

  // --- Referencias a Elementos del DOM ---
  const form = document.getElementById(FORM_ID);
  const websiteUrlInput = document.getElementById(WEBSITE_URL_INPUT_ID);
  const reportDisplay = document.getElementById(REPORT_DISPLAY_ID);
  const customOptionsContainer = document.getElementById(
    CUSTOM_OPTIONS_CONTAINER_ID
  );
  const autoRadio = document.getElementById(AUTO_ANALYSIS_RADIO_ID);
  const customRadio = document.getElementById(CUSTOM_ANALYSIS_RADIO_ID);
  const submitButton = form ? form.querySelector('.submit-button') : null; // Asegurarse de que el formulario exista

  // --- Inicialización de Partículas (Si el elemento existe) ---
  // Asegúrate de que 'particles-js' sea el ID de tu contenedor de partículas en el HTML
  if (
    document.getElementById('particles-js') &&
    typeof particlesJS !== 'undefined'
  ) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: {
          value: 0.4,
          random: true,
          anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false },
        },
        size: { value: 2, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#4A4A4A',
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: false },
          resize: true,
        },
        modes: { grab: { distance: 140, line_opacity: 0.5 } },
      },
      retina_detect: true,
    });
  }

  // --- Lógica de Interacción del Formulario (Toggle de Opciones) ---
  const toggleOptions = () => {
    if (customRadio && customOptionsContainer) {
      // Verificar que los elementos existan
      if (customRadio.checked) {
        customOptionsContainer.classList.remove('kapi-hidden');
      } else {
        customOptionsContainer.classList.add('kapi-hidden');
      }
    }
  };

  // Añadir listeners solo si los elementos existen
  if (autoRadio) autoRadio.addEventListener('change', toggleOptions);
  if (customRadio) customRadio.addEventListener('change', toggleOptions);

  // Ejecutar al cargar para establecer el estado inicial
  toggleOptions();

  // --- Lógica de Envío del Formulario a Gemini Proxy y Muestra del Informe ---
  if (form && websiteUrlInput && reportDisplay && submitButton) {
    // Asegurarse de que todos los elementos clave existan
    form.addEventListener('submit', async function (event) {
      event.preventDefault(); // Prevenir el envío por defecto del navegador

      const websiteUrl = websiteUrlInput.value.trim();

      // --- Validación de URL (Mejora de UX) ---
      if (!websiteUrl) {
        alert('Por favor, ingresa la URL de tu sitio web.');
        return;
      }
      // Validación básica de formato de URL
      if (
        !websiteUrl.startsWith('http://') &&
        !websiteUrl.startsWith('https://')
      ) {
        alert('La URL debe comenzar con http:// o https://');
        return;
      }

      // --- Mostrar estado de carga y deshabilitar elementos (UX) ---
      form.style.display = 'none'; // Ocultar el formulario
      reportDisplay.style.display = 'block'; // Mostrar el contenedor del informe
      reportDisplay.innerHTML =
        '<h2>Generando Informe...</h2><p>Por favor, espera mientras analizamos tu sitio. Esto puede tardar unos segundos.</p>';
      submitButton.disabled = true; // Deshabilitar el botón de envío
      websiteUrlInput.disabled = true; // Deshabilitar el input de URL

      const formData = new FormData(form);
      const data = {};
      // Convertir FormData a un objeto JSON, manejando arrays para checkboxes
      for (let [key, value] of formData.entries()) {
        if (key.endsWith('[]')) {
          // Si el nombre del campo termina en '[]' (ej. focus_areas[])
          const baseKey = key.slice(0, -2); // Obtener el nombre base (ej. focus_areas)
          if (!data[baseKey]) {
            data[baseKey] = []; // Inicializar como array si no existe
          }
          data[baseKey].push(value); // Añadir el valor al array
        } else {
          data[key] = value; // Para campos normales
        }
      }

      try {
        const response = await fetch(PROXY_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        // --- Manejo de respuestas HTTP (Robustez) ---
        if (response.ok) {
          const responseData = await response.json();
          // Verificar la estructura esperada de la respuesta del proxy
          if (
            responseData.success &&
            responseData.data &&
            responseData.data.report_content
          ) {
            reportDisplay.innerHTML =
              '<h2>Informe de Diagnóstico</h2>' +
              responseData.data.report_content;
          } else {
            // Mensaje de error si la respuesta del proxy es exitosa pero no contiene los datos esperados
            reportDisplay.innerHTML =
              '<h2>Error al generar el informe</h2><p>No se pudo obtener el informe. Inténtalo de nuevo más tarde.</p><p>Detalles: ' +
              (responseData.message || JSON.stringify(responseData)) +
              '</p>';
            console.error('Respuesta inesperada del proxy:', responseData);
          }
        } else {
          // Mensaje de error para respuestas HTTP no exitosas (4xx, 5xx)
          const errorText = await response.text(); // Intentar obtener el texto del error del servidor
          reportDisplay.innerHTML = `<h2>Error de conexión</h2><p>Hubo un problema al comunicarse con el servidor. Código: ${response.status}.</p><p>Detalles: ${errorText || response.statusText}</p>`;
          console.error(
            'Error al enviar el formulario al proxy:',
            response.status,
            response.statusText,
            errorText
          );
        }
      } catch (error) {
        // --- Manejo de errores de red (Robustez) ---
        reportDisplay.innerHTML =
          '<h2>Error de red</h2><p>No se pudo conectar con el servidor. Por favor, revisa tu conexión a internet.</p>';
        console.error(
          'Error de red o al enviar el formulario al proxy:',
          error
        );
      } finally {
        // --- Habilitar elementos al finalizar (UX) ---
        submitButton.disabled = false;
        websiteUrlInput.disabled = false;
        // Puedes decidir si quieres volver a mostrar el formulario aquí o mantener el informe visible
        // form.style.display = 'block'; // Descomenta si quieres que el formulario reaparezca
      }
    });
  } else {
    console.error(
      'Uno o más elementos del DOM necesarios para el formulario o el informe no se encontraron. Verifica los IDs en tu HTML.'
    );
  }
});
