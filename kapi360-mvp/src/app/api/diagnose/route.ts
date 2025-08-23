import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

// Inicialización de clientes (sin cambios)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// --- NUEVA LÓGICA DE PROMPTS ---

const getQuadrantPrompt = (quadrantName: string) => {
  return `
## ${quadrantName} (Puntaje: [Puntaje de 0 a 100]/100)
**Qué es:** [Explicación concisa del pilar]
**Por qué importa:** [Explicación del impacto en el negocio]
**Coordenadas Clave:**
- [Métrica 1]
- [Métrica 2]
- [Métrica 3]
`;
};

function getPrompt(url: string, mode: string, context?: any): string {
  const basePrompt = `Actúa como un analista experto en marketing digital y estrategia de negocio para PYMES. Tu cliente te ha proporcionado la URL de su sitio web para un diagnóstico rápido. URL del cliente: ${url}. Tipo de análisis solicitado: ${mode}. Por favor, genera un informe conciso y actionable en formato Markdown. El tono debe ser profesional, directo y orientado a resultados de negocio (KPIs). La estructura del informe DEBE seguir este formato EXACTO, incluyendo los títulos, puntajes y subtítulos en negrita:`

  const finalPromptStructure = `(Cualquier texto adicional o resumen puede ir aquí, después de los 4 pilares estructurados.)`;

  let reportStructure = '\n\n**Puntaje General:** [Puntaje de 0 a 100]/100';

  switch (mode) {
    case 'auto':
      reportStructure += getQuadrantPrompt('Mercado y Competencia');
      reportStructure += getQuadrantPrompt('Plataforma y UX');
      reportStructure += getQuadrantPrompt('Contenido y Redes');
      reportStructure += getQuadrantPrompt('Crecimiento y IA');
      break;

    case 'custom':
      // Asume que el contexto es un array de los nombres de los cuadrantes seleccionados
      const selectedQuadrants = context || [];
      selectedQuadrants.forEach((quadrant: string) => {
        reportStructure += getQuadrantPrompt(quadrant);
      });
      break;

    case 'manual':
      // El prompt para el modo manual es diferente
      return `Actúa como un consultor experto en marketing digital. Un cliente te ha descrito el siguiente problema: "${context}". Por favor, genera un plan de acción detallado en formato Markdown para abordar este problema específico. Incluye pasos claros y recomendaciones prácticas.`;

    case 'consulta':
      return `El usuario está solicitando una consulta directa. Genera una respuesta amable que confirme la recepción de su interés y explique que el equipo de Kapi se pondrá en contacto en breve. No realices ningún tipo de análisis.`;
    
    default:
      reportStructure += getQuadrantPrompt('Mercado y Competencia');
      reportStructure += getQuadrantPrompt('Plataforma y UX');
      break;
  }

  return `${basePrompt}${reportStructure}\n\n${finalPromptStructure}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, mode, context } = body;

    // La URL ya no es obligatoria para los modos manual y consulta
    if (!mode) {
      return NextResponse.json({ error: 'El modo es requerido' }, { status: 400 });
    }

    console.log(`[API /api/diagnose] Iniciando diagnóstico con Gemini para:`, { url, mode });

    const prompt = getPrompt(url, mode, context);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();

    // Guardado en Supabase (sin cambios)
    supabase.from('diagnostics').insert([
      { url: url, mode: mode, report_content: analysisText, context: context },
    ]).then(({ error }) => {
      if (error) {
        console.error('[API /api/diagnose] Error saving to Supabase:', error);
      } else {
        console.log(`[API /api/diagnose] Report for ${url || 'consulta/manual'} saved to Supabase.`);
      }
    });

    return NextResponse.json({ analysis: analysisText }, { status: 200 });

  } catch (error) {
    console.error('[API /api/diagnose] Error llamando a la API de Gemini:', error);
    return NextResponse.json({ error: 'Error al contactar el servicio de IA. Por favor, verifica la clave de API y vuelve a intentarlo.' }, { status: 500 });
  }
}
