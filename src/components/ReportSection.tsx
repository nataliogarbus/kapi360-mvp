import React from 'react';
import ReactMarkdown from 'react-markdown';
import ReportCard from './ReportCard';
import StrategicCompass from './StrategicCompass';
import RutaOptimaCard from './RutaOptimaCard';

// --- Iconos SVG como componentes para simplicidad ---
const SeoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/></svg>;
const UxIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M7 12h10M7 7h10M7 17h5"/></svg>;
const ConversionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>;
const DefaultIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>;


interface ReportSectionProps {
  report: string;
}

const ReportSection: React.FC<ReportSectionProps> = ({ report }) => {
  if (!report) return null;

  const scoreRegex = /\*\*Puntaje General:\*\*\s*(\d+)\/100/;
  const match = report.match(scoreRegex);
  const score = match ? parseInt(match[1], 10) : 0;
  const reportContent = report.replace(scoreRegex, '').trim();

  const allSections = reportContent.split('## ').filter(section => section.trim() !== '');

  const rutasOptimas: any[] = [];
  const otherSections: string[] = [];

  const rutaRegex = /^Ruta Óptima: (.*?) \(Puntaje: (\d+)\/100\)/;

  allSections.forEach(section => {
    const rutaMatch = section.match(rutaRegex);
    if (rutaMatch) {
      const title = rutaMatch[1];
      const score = parseInt(rutaMatch[2], 10);
      const content = section.replace(rutaRegex, '').trim();
      rutasOptimas.push({ title, score, content });
    } else {
      otherSections.push(section);
    }
  });

  const getIconForTitle = (title: string) => {
    if (title.toLowerCase().includes('seo')) return <SeoIcon />;
    if (title.toLowerCase().includes('ux') || title.toLowerCase().includes('experiencia')) return <UxIcon />;
    if (title.toLowerCase().includes('conversión')) return <ConversionIcon />;
    return <DefaultIcon />;
  };

  return (
    <section id="report-section" className="mt-10 w-full">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Resultados del Diagnóstico</h2>
      
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

      {/* Contenedor para las Rutas Óptimas */}
      {rutasOptimas.length > 0 && (
        <div className="mb-12">
          <h3 className="text-center text-2xl font-bold text-white mb-6">Rutas Óptimas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rutasOptimas.map((ruta, index) => (
              <RutaOptimaCard 
                key={index} 
                title={ruta.title} 
                score={ruta.score} 
                icon={getIconForTitle(ruta.title)} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Contenedor para el resto del informe */}
      <div>
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
