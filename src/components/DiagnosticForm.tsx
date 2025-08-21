import React, { useState } from 'react';

// --- Iconos SVG (reutilizados de ReportSection) ---
const SeoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"/></svg>;
const UxIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M7 12h10M7 7h10M7 17h5"/></svg>;
const ConversionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>;
const DefaultIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>;

const getIconForTitle = (title: string) => {
  if (title.toLowerCase().includes('seo') || title.toLowerCase().includes('mercado')) return <SeoIcon />;
  if (title.toLowerCase().includes('ux') || title.toLowerCase().includes('plataforma')) return <UxIcon />;
  if (title.toLowerCase().includes('crecimiento') || title.toLowerCase().includes('redes')) return <ConversionIcon />;
  return <DefaultIcon />;
};

// --- Data for Custom Options ---
const customOptions = [
  {
    id: 'enfoque-mercado-y-competencia',
    value: 'Mercado y Competencia',
    title: 'Mercado y Competencia',
    description: 'Análisis SEO y de la competencia.',
  },
  {
    id: 'enfoque-plataforma-y-ux',
    value: 'Plataforma y UX',
    title: 'Plataforma y UX',
    description: 'Rendimiento y experiencia de usuario.',
  },
  {
    id: 'enfoque-contenido-y-redes',
    value: 'Contenido y Redes',
    title: 'Contenido y Redes',
    description: 'Auditoría de contenido y social media.',
  },
  {
    id: 'enfoque-crecimiento-e-ia',
    value: 'Crecimiento e IA',
    title: 'Crecimiento e IA',
    description: 'Generación de leads y oportunidades.',
  },
];

interface DiagnosticFormProps {
  isLoading: boolean;
  onSubmit: (url: string, mode: string) => void;
}

const DiagnosticForm: React.FC<DiagnosticFormProps> = ({ isLoading, onSubmit }) => {
  const [mode, setMode] = useState('auto');
  const [url, setUrl] = useState('');

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(url, mode);
  };

  return (
    <div className="mt-10 max-w-3xl mx-auto">
      <form id="diagnosticoForm" noValidate onSubmit={handleFormSubmit}>
        {/* --- Main Action Group: Visible in Auto and Custom modes --- */}
        {(mode === 'auto' || mode === 'custom') && (
          <div className="flex flex-col sm:flex-row items-center bg-white/5 border border-white/20 rounded-lg p-2 gap-2 shadow-lg">
            <div className="relative flex-grow w-full">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </div>
              <input 
                type="text" 
                id="main-input" 
                className="w-full bg-transparent text-white text-lg placeholder-gray-400 pl-12 pr-4 py-3 focus:outline-none focus:ring-0 border-0"
                placeholder="Ingresa tu URL de sitio web" 
                required 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <button 
              type="submit" 
              id="main-cta-button" 
              className="w-full sm:w-auto bg-green-400 text-black font-bold uppercase px-8 py-3 rounded-md hover:bg-green-500 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !url}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
              ) : (
                <span>Generar mi Plan de Acción</span>
              )}
            </button>
          </div>
        )}

        {/* --- Mode Selector --- */}
        <div className="main-selector">
          <input type="radio" name="analysis_mode" id="mode-auto" value="auto" className="main-selector-input" checked={mode === 'auto'} onChange={() => setMode('auto')} disabled={isLoading} />
          <label htmlFor="mode-auto" className="main-selector-label">Automático</label>
          <input type="radio" name="analysis_mode" id="mode-custom" value="custom" className="main-selector-input" checked={mode === 'custom'} onChange={() => setMode('custom')} disabled={isLoading} />
          <label htmlFor="mode-custom" className="main-selector-label">Personalizado</label>
          <input type="radio" name="analysis_mode" id="mode-manual" value="manual" className="main-selector-input" checked={mode === 'manual'} onChange={() => setMode('manual')} disabled={isLoading} />
          <label htmlFor="mode-manual" className="main-selector-label">Manual</label>
          <input type="radio" name="analysis_mode" id="mode-consulta" value="consulta" className="main-selector-input" checked={mode === 'consulta'} onChange={() => setMode('consulta')} disabled={isLoading} />
          <label htmlFor="mode-consulta" className="main-selector-label">Consulta</label>
        </div>

        {/* --- Conditional Rendering for Form Sections --- */}
        
        {mode === 'custom' && (
          <div id="custom-options-wrapper" className="my-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            {customOptions.map(option => (
              <div key={option.id}>
                <input type="checkbox" id={option.id} name="enfoques" value={option.value} className="hidden peer" disabled={isLoading} />
                <label 
                  htmlFor={option.id} 
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex flex-col items-center text-center cursor-pointer h-full hover:border-cyan-400 peer-checked:border-green-400 peer-checked:ring-2 peer-checked:ring-green-400/50 transition-all duration-300"
                  title={option.description} // Tooltip con la descripción
                >
                  <div className="text-cyan-400 mb-2">
                    {getIconForTitle(option.title)}
                  </div>
                  <span className="font-semibold text-white text-sm">{option.title}</span>
                </label>
              </div>
            ))}
          </div>
        )}

        {mode === 'manual' && (
          <div id="manual-options-wrapper" className="my-4 flex flex-col items-end gap-4">
            <textarea className="manual-textarea" rows={4} placeholder="Describe tu problema o el área que más te preocupa aquí..." disabled={isLoading}></textarea>
            <button type="submit" className="form-button w-full sm:w-auto text-base py-3 px-6" disabled={isLoading}>Enviar Mensaje</button>
          </div>
        )}

        {mode === 'consulta' && (
          <div id="consulta-options-wrapper" className="my-4 flex flex-col gap-4">
            <textarea className="consulta-textarea" rows={4} placeholder="Escribe aquí tu consulta..." disabled={isLoading}></textarea>
            <div className="flex flex-col md:flex-row gap-4">
              <input type="text" placeholder="Tu nombre" className="consulta-input flex-grow" disabled={isLoading} />
              <input type="email" placeholder="Tu email" className="consulta-input flex-grow" disabled={isLoading} />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="form-button w-full sm:w-auto text-base py-3 px-8" disabled={isLoading}>Enviar Consulta</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default DiagnosticForm;
