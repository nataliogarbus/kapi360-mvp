import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import ReportCard from './ReportCard';
import StrategicCompass from './StrategicCompass';
import MapaCentral from './MapaCentral';
import PanelDeInteligencia from './PanelDeInteligencia';

// ... (interfaces sin cambios)
interface QuadrantData {
  title: string;
  queEs: string;
  porQueImporta: string;
  score: number;
  bgColor: string;
  coordenadas: string[];
}

interface ReportSectionProps {
  report: string;
}

const ReportSection: React.FC<ReportSectionProps> = ({ report }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedQuadrant, setSelectedQuadrant] = useState<Omit<QuadrantData, 'score' | 'bgColor' | 'coordenadas'> | null>(null);

  // AHORA LOS DATOS VIVEN AQUÍ
  // TODO: En el futuro, estos datos deberían generarse a partir del informe de la API
  const quadrantsData: QuadrantData[] = [
    { title: 'Visibilidad', score: 75, bgColor: 'bg-blue-600', queEs: 'Mide qué tan fácil es para los clientes potenciales encontrar tu sitio web.', porQueImporta: 'Si no te encuentran, no existes.', coordenadas: ['Posicionamiento SEO', 'Tráfico Orgánico', 'Autoridad de Dominio'] },
    { title: 'Plataforma', score: 88, bgColor: 'bg-green-600', queEs: 'Evalúa la calidad técnica de tu sitio web: velocidad, seguridad, etc.', porQueImporta: 'Un sitio lento o inseguro frustra a los usuarios y daña tu marca.', coordenadas: ['Velocidad de Carga', 'Seguridad (HTTPS)', 'Adaptabilidad Móvil'] },
    { title: 'Contenido', score: 62, bgColor: 'bg-orange-500', queEs: 'Analiza la calidad y relevancia de la información que presentas.', porQueImporta: 'El contenido es tu vendedor silencioso. Atrae, educa y persuade.', coordenadas: ['Frecuencia de Publicación', 'Calidad del Contenido', 'Activos de Conversión'] },
    { title: 'Conversión', score: 45, bgColor: 'bg-red-600', queEs: 'Mide la eficacia de tu sitio para convertir visitantes en clientes.', porQueImporta: 'Es el KPI que impacta directamente en la facturación.', coordenadas: ['Llamadas a la Acción (CTAs)', 'Formularios de Contacto', 'Tasa de Rebote'] },
  ];

  if (!report) return null;

  const scoreRegex = /\*\*Puntaje General:\*\*\s*(\d+)\/100/;
  const match = report.match(scoreRegex);
  const score = match ? parseInt(match[1], 10) : 0;
  
  const reportContent = report.replace(scoreRegex, '').trim();
  const otherSections = reportContent.split('## ').filter(section => section.trim() !== '');

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
      
      {match && (
        <div className="mb-12">
          <h3 className="text-center text-2xl font-bold text-white mb-4">Brújula Estratégica</h3>
          <div className="relative mx-auto" style={{ width: '220px', height: '110px' }}>
            {/* Pasamos los datos del desglose a la Brújula */}
            <StrategicCompass score={score} breakdown={quadrantsData.map(q => ({ title: q.title, score: q.score }))} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ top: '-20px'}}>
              <span className="text-5xl font-black text-white">{score}</span>
              <span className="text-sm font-semibold text-gray-400 tracking-wider">Puntaje General</span>
            </div>
          </div>
        </div>
      )}

      <div className="mb-12">
        {/* Pasamos los datos completos al Mapa Central */}
        <MapaCentral onQuadrantClick={handleQuadrantClick} quadrantsData={quadrantsData} />
      </div>

      <PanelDeInteligencia 
        isOpen={isPanelOpen} 
        onClose={handlePanelClose} 
        quadrant={selectedQuadrant} 
      />

      <div>
        <h3 className="text-center text-2xl font-bold text-white mb-6">Análisis Detallado</h3>
        {otherSections.map((section, index) => (
          <ReportCard key={index}>
            <ReactMarkdown
              components={{
                h2: ({node, ...props}) => <h2 className="text-2xl font-semibold text-cyan-400 mb-4" {...props} />,
                p: ({node, ...props}) => <p className="text-slate-300 mb-4" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="text-slate-300" {...props} />,
                strong: ({node, ...props}) => <strong className="text-green-400" {...props} />,
              }}
            >
              {`## ${section}`}
            </ReactMarkdown>
          </ReportCard>
        ))}
      </div>
    </section>
  );
};

export default ReportSection;
