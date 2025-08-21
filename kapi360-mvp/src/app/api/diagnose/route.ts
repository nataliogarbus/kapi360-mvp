import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Initialize the Supabase client
// Assumes SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are in your .env.local
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Function to generate a dynamic prompt
function getPrompt(url: string, mode: string): string {
  let prompt = `
    Actúa como un analista experto en marketing digital y estrategia de negocio para PYMES. 
    Tu cliente te ha proporcionado la URL de su sitio web para un diagnóstico rápido.
    URL del cliente: ${url}
    Tipo de análisis solicitado: ${mode}

    Por favor, genera un informe conciso y accionable en formato Markdown.
    El tono debe ser profesional, directo y orientado a resultados de negocio (KPIs), no solo a métricas técnicas.
  `;

  switch (mode) {
    case 'auto':
      prompt += `
        **Instrucciones para el modo Automático:**
        1.  **Análisis General:** Realiza un análisis de alto nivel del sitio web.
        2.  **Puntos Clave:** Identifica los 3 puntos fuertes y los 3 puntos débiles más evidentes en términos de SEO, experiencia de usuario (UX) y potencial de conversión.
        3.  **Insight de Negocio:** Concluye con una recomendación estratégica clave que el cliente podría implementar para mejorar sus resultados de negocio.
        4.  **Formato:** Usa encabezados, listas con viñetas y texto en negrita para que sea fácil de leer.
      `;
      break;
    case 'custom':
      prompt += `
        **Instrucciones para el modo Personalizado:**
        // TODO: Implementar la lógica para recibir y analizar los enfoques específicos seleccionados por el usuario.
        Por ahora, realiza el mismo análisis que en el modo 'auto'.
      `;
      break;
    case 'manual':
      prompt += `
        **Instrucciones para el modo Manual:**
        // TODO: Implementar la lógica para recibir y analizar la descripción del problema del usuario.
        Por ahora, realiza el mismo análisis que en el modo 'auto'.
      `;
      break;
    case 'consulta':
        prompt += `
        **Instrucciones para el modo Consulta:**
        El usuario está solicitando una consulta directa. Genera una respuesta amable que confirme la recepción de su interés y explique que el equipo de Kapi se pondrá en contacto en breve. No realices un análisis del sitio web.
      `;
      break;
    default:
      prompt += `
        Realiza un análisis general por defecto.
      `;
      break;
  }
  return prompt;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, mode } = body;

    if (!url || !mode) {
      return NextResponse.json({ error: 'La URL y el modo son requeridos' }, { status: 400 });
    }

    console.log(`[API /api/diagnose] Iniciando diagnóstico con Gemini para:`, { url, mode });

    const prompt = getPrompt(url, mode);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();

    // Save the report to Supabase in the background (don't await)
    supabase.from('diagnostics').insert([
      { url: url, mode: mode, report_content: analysisText },
    ]).then(({ error }) => {
      if (error) {
        console.error('[API /api/diagnose] Error saving to Supabase:', error);
      } else {
        console.log(`[API /api/diagnose] Report for ${url} saved to Supabase.`);
      }
    });

    return NextResponse.json({ analysis: analysisText }, { status: 200 });

  } catch (error) {
    console.error('[API /api/diagnose] Error llamando a la API de Gemini:', error);
    return NextResponse.json({ error: 'Error al contactar el servicio de IA. Por favor, verifica la clave de API y vuelve a intentarlo.' }, { status: 500 });
  }
}
