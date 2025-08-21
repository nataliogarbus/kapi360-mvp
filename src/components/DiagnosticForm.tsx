'use client';

import React, { useState } from 'react';

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
          <div className="main-action-group">
            <div className="input-with-icon">
              <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              <input 
                type="text" 
                id="main-input" 
                className="form-input-field" 
                placeholder="Ingresa tu URL de sitio web" 
                required 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <button type="submit" id="main-cta-button" className={`cta-submit-button ${isLoading ? 'loading' : ''}`} disabled={isLoading || !url}>
              <span className="button-text">Generar mi Plan de Acción</span>
              <div className="spinner"></div>
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
                <input type="checkbox" id={option.id} name="enfoques" value={option.value} className="enfoque-checkbox-input" disabled={isLoading} />
                <label htmlFor={option.id} className="enfoque-checkbox-label" data-tooltip={option.description}>
                  <span className="enfoque-title">{option.title}</span>
                  <span className="enfoque-desc">{option.description}</span>
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
