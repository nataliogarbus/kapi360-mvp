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

// --- LÓGICA DE PARSEO (Fuera del componente para que no se redeclare) ---

const parseReport = (report: string) => {
  const quadrantNames = ['Visibilidad', 'Plataforma', 'Contenido', 'Conversión'];
  const bgColors: { [key: string]: string } = {
    Visibilidad: 'bg-blue-600',
    Plataforma: 'bg-green-600',
    Contenido: 'bg-orange-500',
    Conversión: 'bg-red-600',
  };

  const parsedQuadrants = quadrantNames.map(name => {
    const quadrantRegex = new RegExp(
      `##\s*${name}\s*\(Puntaje:\s*(\d+)\/100\)[\s\S]*?` +
      `\*\*Qué es:\*\*\s*([\s\S]*?)\n` +
      `\*\*Por qué importa:\*\*\s*([\s\S]*?)\n` +
      `\*\*Coordenadas Clave:\*\*\s*([\s\S]*?)(?=\n##|$)`,
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
    // Fallback por si un cuadrante no se encuentra en el reporte
    return { title: name, score: 0, bgColor: 'bg-gray-500', queEs: 'No se encontró análisis.', porQueImporta: '-', coordenadas: [] };
  });

  const scoreRegex = /\*\*Puntaje General:\*\*\s*(\d+)\/100/;
  const scoreMatch = report.match(scoreRegex);
  const generalScore = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;

  const otherContentRegex = /(##\s*(Visibilidad|Plataforma|Contenido|Conversión)[\s\S]*?)(?=##|$)/gi;
  const detailedAnalysis = report.replace(scoreRegex, '').replace(otherContentRegex, '').trim();

  return { quadrantsData: parsedQuadrants, generalScore, detailedAnalysis };
};


// --- COMPONENTE PRINCIPAL ---

const ReportSection: React.FC<ReportSectionProps> = ({ report }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedQuadrant, setSelectedQuadrant] = useState<Omit<QuadrantData, 'score' | 'bgColor' | 'coordenadas'> | null>(null);

  // Usamos useMemo para parsear el reporte solo una vez, a menos que el reporte cambie
  const { quadrantsData, generalScore, detailedAnalysis } = useMemo(() => parseReport(report), [report]);

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

      {detailedAnalysis && (
        <div>
          <h3 className="text-center text-2xl font-bold text-white mb-6">Análisis Detallado</h3>
          <ReportCard>
            <ReactMarkdown
              components={{
                h2: ({node, ...props}) => <h2 className="text-2xl font-semibold text-cyan-400 mb-4" {...props} />,
                p: ({node, ...props}) => <p className="text-slate-300 mb-4" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="text-slate-300" {...props} />,
                strong: ({node, ...props}) => <strong className="text-green-400" {...props} />,
              }}
            >
              {detailedAnalysis}
            </ReactMarkdown>
          </ReportCard>
        </div>
      )}
    </section>
  );
};

export default ReportSection;
