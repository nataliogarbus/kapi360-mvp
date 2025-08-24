<?php
/**
 * Tema hijo de Astra para el proyecto Motor de Diagnóstico Digital.
 */

// Carga los estilos del tema padre e hijo.
add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', ['parent-style'], wp_get_theme()->get('Version') );
});

// Inyecta CSS para el formulario de Spectra directamente en el header.
add_action('wp_head', function() {
    if ( ! is_page('motor-diagnostico') ) {
        return;
    }
    ?>
    <style type="text/css">
        .uagb-forms-main-form .uagb-forms-field-label { display: none; }
        .uagb-forms-main-form .uagb-forms-radio-label, .uagb-forms-main-form .uagb-forms-checkbox-label { margin-bottom: 1rem; color: white; }
        .kapi-analysis-options .uagb-forms-checkbox-wrap { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .kapi-analysis-options .uagb-forms-checkbox-wrap label { display: block !important; padding: 1.5rem 1.25rem !important; border: 2px solid #4B5563 !important; border-radius: 0.75rem !important; cursor: pointer !important; transition: all 0.2s ease-in-out !important; background-color: rgba(30, 30, 30, 0.7) !important; height: 100% !important; color: #9CA3AF !important; font-size: 0.85rem !important; font-weight: 400 !important; line-height: 1.4 !important; }
        .kapi-analysis-options .uagb-forms-checkbox-wrap label::first-line { color: #E5E7EB !important; font-size: 1rem !important; font-weight: 700 !important; }
        .kapi-analysis-options .uagb-forms-checkbox-wrap label:hover { border-color: #0057FF !important; transform: translateY(-3px) !important; }
        .kapi-analysis-options .uagb-forms-checkbox-wrap input[type="checkbox"]:checked + label { border-color: #00DD82 !important; background-color: rgba(0, 221, 130, 0.15) !important; }
        @media (max-width: 980px) { .kapi-analysis-options .uagb-forms-checkbox-wrap { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 540px) { .kapi-analysis-options .uagb-forms-checkbox-wrap { grid-template-columns: 1fr !important; } }
    </style>
    <?php
});

// Script robusto para la lógica del formulario (se ejecuta en el footer).
add_action( 'wp_footer', function() {
    if ( ! is_page('motor-diagnostico') ) {
        return;
    }
    ?>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const checkInterval = setInterval(function() {
                const autoRadio = document.getElementById('radio-automático-f5916f14');
                const customRadio = document.getElementById('radio-personalizado-f5916f14');
                const cardsContainer = document.querySelector('.kapi-analysis-options');

                if (autoRadio && customRadio && cardsContainer) {
                    clearInterval(checkInterval);

                    function toggleCardsVisibility() {
                        if (customRadio.checked) {
                            cardsContainer.style.display = 'grid';
                        } else {
                            cardsContainer.style.display = 'none';
                        }
                    }

                    autoRadio.addEventListener('change', toggleCardsVisibility);
                    customRadio.addEventListener('change', toggleCardsVisibility);
                    toggleCardsVisibility();
                }
            }, 200);
        });
    </script>
    <?php
});