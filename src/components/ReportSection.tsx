import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ReportSectionProps {
  report: string; // Ahora el informe es solo una cadena de texto
}

const ReportSection: React.FC<ReportSectionProps> = ({ report }) => {
  if (!report) {
    return null; // No renderizar nada si no hay informe
  }

  return (
    <section id="report-section" className="bg-gray-800 text-white p-6 sm:p-8 rounded-lg mt-10 mx-4 sm:mx-0">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-400">Resultados del Diagnóstico</h2>
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>{report}</ReactMarkdown>
      </div>
    </section>
  );
};

export default ReportSection;
