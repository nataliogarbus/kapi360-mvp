import React, { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import ReportCard from './ReportCard';
import StrategicCompass from './StrategicCompass';
import MapaCentral from './MapaCentral';
import PanelDeInteligencia from './PanelDeInteligencia';

// --- TIPOS DE DATOS ---
interface QuadrantData {
  title: string;
  score: number;
  bgColor: string;
  queEs: string;
  porQueImporta: string;
  coordenadas: string[];
}

interface ReportSectionProps {
  report: string;
}

// --- LÓGICA DE PARSEO (ACTUALIZADA) ---

const parseReport = (report: string) => {
  // 1. Se actualizan los nombres de los pilares
  const quadrantNames = ['Mercado y Competencia', 'Plataforma y UX', 'Contenido y Redes', 'Crecimiento y IA'];
  const bgColors: { [key: string]: string } = {
    'Mercado y Competencia': 'bg-indigo-600',
    'Plataforma y UX': 'bg-green-600',
    'Contenido y Redes': 'bg-amber-600',
    'Crecimiento y IA': 'bg-purple-600',
  };

  const parsedQuadrants = quadrantNames.map(name => {
    const parsedQuadrants = quadrantNames.map(name => {
    const quadrantRegex = new RegExp(
      `##\s*${name}\s*\(Puntaje:\s*(\d+)\/100\)[\s\S]*?` + // Corregido: Añadido el paréntesis de cierre \)
      `**Qué es:**\s*([\s\S]*?)\n` + // Corregido: Añadido el paréntesis de cierre \)
      `**Por qué importa:**\s*([\s\S]*?)\n` + // Corregido: Añadido el paréntesis de cierre \)
      `**Coordenadas Clave:**\s*([\s\S]*?)(?=\n##|$)`,
      'i'
    );

    const match = report.match(quadrantRegex);

    if (match) {
      const coordenadas = match[4].split('-').map(c => c.trim()).filter(Boolean);
      return {
        title: name,
        score: parseInt(match[1], 10) || 0,
        bgColor: bgColors[name],
        queEs: match[2].trim(),
        porQueImporta: match[3].trim(),
        coordenadas,
      };
    }
    return { title: name, score: 0, bgColor: 'bg-gray-500', queEs: 'No se encontró análisis para este pilar.', porQueImporta: '-', coordenadas: [] };
  });

  const scoreRegex = /\*\*Puntaje General:\*\*\s*(\d+)\/100/; // Corrected: escaped backslash for asterisk
  const scoreMatch = report.match(scoreRegex);
  const generalScore = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;

  // 2. Se elimina la necesidad de parsear el "detailedAnalysis". El dashboard es el informe.
  return { quadrantsData: parsedQuadrants, generalScore };
};


// --- COMPONENTE PRINCIPAL (ACTUALIZADO) ---

const ReportSection: React.FC<ReportSectionProps> = ({ report }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedQuadrant, setSelectedQuadrant] = useState<Omit<QuadrantData, 'score' | 'bgColor' | 'coordenadas'> | null>(null);

  const { quadrantsData, generalScore } = useMemo(() => parseReport(report), [report]);

  const handleQuadrantClick = (quadrantData: Omit<QuadrantData, 'score' | 'bgColor' | 'coordenadas'>) => {
    setSelectedQuadrant(quadrantData);
    setIsPanelOpen(true);
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
  };

  return (
    <section id="report-section" className="mt-10 w-full max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Resultados del Diagnóstico</h2>
      
      {generalScore > 0 && (
        <div className="mb-12">
          <h3 className="text-center text-2xl font-bold text-white mb-4">Brújula Estratégica</h3>
          <div className="relative mx-auto" style={{ width: '220px', height: '110px' }}>
            <StrategicCompass score={generalScore} breakdown={quadrantsData.map(q => ({ title: q.title, score: q.score }))} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ top: '-20px' }}>
              <span className="text-5xl font-black text-white">{generalScore}</span>
              <span className="text-sm font-semibold text-gray-400 tracking-wider">Puntaje General</span>
            </div>
          </div>
        </div>
      )}

      <div className="mb-12">
        <MapaCentral onQuadrantClick={handleQuadrantClick} quadrantsData={quadrantsData} />
      </div>

      <PanelDeInteligencia 
        isOpen={isPanelOpen} 
        onClose={handlePanelClose} 
        quadrant={selectedQuadrant} 
      />

      {/* 3. La sección de Análisis Detallado ha sido eliminada. */}
    </section>
  );
};

export default ReportSection;
