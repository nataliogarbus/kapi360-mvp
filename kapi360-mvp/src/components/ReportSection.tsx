import React from 'react';
import ReactMarkdown from 'react-markdown';
import ReportCard from './ReportCard';
import StrategicCompass from './StrategicCompass';
import MapaCentral from './MapaCentral'; // Importamos el nuevo componente

interface ReportSectionProps {
  report: string;
}

const ReportSection: React.FC<ReportSectionProps> = ({ report }) => {
  if (!report) return null;

  // Extraemos el puntaje general
  const scoreRegex = /\*\*Puntaje General:\*\*\s*(\d+)\/100/;
  const match = report.match(scoreRegex);
  const score = match ? parseInt(match[1], 10) : 0;
  
  // Limpiamos el contenido del reporte para no mostrar el puntaje dos veces
  const reportContent = report.replace(scoreRegex, '').trim();
  const otherSections = reportContent.split('## ').filter(section => section.trim() !== '');

  return (
    <section id="report-section" className="mt-10 w-full max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Resultados del Diagnóstico</h2>
      
      {/* Mantenemos la Brújula Estratégica para el puntaje general */}
      {match && (
        <div className="mb-12">
          <h3 className="text-center text-2xl font-bold text-white mb-4">Brújula Estratégica</h3>
          <div className="relative mx-auto" style={{ width: '220px', height: '110px' }}>
            <StrategicCompass score={score} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ top: '-20px'}}>
              <span className="text-5xl font-black text-white">{score}</span>
              <span className="text-sm font-semibold text-gray-400 tracking-wider">Puntaje General</span>
            </div>
          </div>
        </div>
      )}

      {/* Reemplazamos las "Rutas Óptimas" con el nuevo "MapaCentral" */}
      <div className="mb-12">
        <MapaCentral />
      </div>

      {/* Contenedor para el resto del informe (Análisis detallado) */}
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


export default ReportSection;
