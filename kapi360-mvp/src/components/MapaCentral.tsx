
import React, { useState } from 'react';

// ... (interfaces sin cambios)

interface QuadrantData {
  title: string;
  score: number;
  bgColor: string;
  queEs: string;
  porQueImporta: string;
  coordenadas: string[]; // Añadimos las coordenadas clave
}

interface QuadrantProps extends QuadrantData {
  onClick: () => void;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

interface MapaCentralProps {
  onQuadrantClick: (data: Omit<QuadrantData, 'score' | 'bgColor' | 'coordenadas'>) => void;
}

const Quadrant: React.FC<QuadrantProps> = ({ title, score, bgColor, onClick, isHovered, onMouseEnter, onMouseLeave, coordenadas }) => {
  return (
    <div 
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative flex flex-col items-center justify-center p-6 rounded-lg shadow-md ${bgColor} text-white transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden`}
    >
      {/* Contenido principal (título y puntaje) */}
      <div className={`transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <h3 className="text-lg font-bold text-center">{title}</h3>
        <p className="text-4xl font-light mt-2 text-center">{score}</p>
      </div>

      {/* Overlay con Coordenadas Clave que aparece al hacer hover */}
      <div className={`absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-center items-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <h4 className="text-md font-bold mb-2">Coordenadas Clave</h4>
        <ul className="text-sm list-none text-center space-y-1">
          {coordenadas.map(coord => <li key={coord}>{coord}</li>)}
        </ul>
      </div>
    </div>
  );
};

const MapaCentral: React.FC<MapaCentralProps> = ({ onQuadrantClick }) => {
  const [hoveredQuadrant, setHoveredQuadrant] = useState<string | null>(null);

  const quadrantsData: QuadrantData[] = [
    {
      title: 'Visibilidad',
      score: 75,
      bgColor: 'bg-blue-600',
      queEs: 'Mide qué tan fácil es para los clientes potenciales encontrar tu sitio web en motores de búsqueda como Google.',
      porQueImporta: 'Si no te encuentran, no existes. Una alta visibilidad se traduce en más tráfico, más oportunidades y mayor cuota de mercado digital.',
      coordenadas: ['Posicionamiento SEO', 'Tráfico Orgánico', 'Autoridad de Dominio']
    },
    {
      title: 'Plataforma',
      score: 88,
      bgColor: 'bg-green-600',
      queEs: 'Evalúa la calidad técnica de tu sitio web: velocidad de carga, seguridad, y si funciona bien en dispositivos móviles.',
      porQueImporta: 'Un sitio lento o que no funciona en móviles frustra a los usuarios y los hace abandonar. Google también penaliza a los sitios lentos.',
      coordenadas: ['Velocidad de Carga', 'Seguridad (HTTPS)', 'Adaptabilidad Móvil']
    },
    {
      title: 'Contenido',
      score: 62,
      bgColor: 'bg-orange-500',
      queEs: 'Analiza la calidad y relevancia de la información que presentas, y si tienes activos de conversión como catálogos o newsletters.',
      porQueImporta: 'El contenido es tu vendedor silencioso. Atrae, educa y persuade a los clientes. Sin contenido de valor, no hay confianza ni ventas.',
      coordenadas: ['Frecuencia de Publicación', 'Calidad del Contenido', 'Activos de Conversión']
    },
    {
      title: 'Conversión',
      score: 45,
      bgColor: 'bg-red-600',
      queEs: 'Mide la eficacia de tu sitio para convertir visitantes en clientes, a través de formularios de contacto, llamadas a la acción y facilidad de uso.',
      porQueImporta: 'Puedes tener mucho tráfico, pero si nadie te contacta o compra, es un esfuerzo perdido. La conversión es el KPI que impacta directamente en la facturación.',
      coordenadas: ['Llamadas a la Acción (CTAs)', 'Formularios de Contacto', 'Tasa de Rebote']
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Mapa de Crecimiento</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quadrantsData.map((quad) => (
          <Quadrant 
            key={quad.title} 
            {...quad} 
            onClick={() => onQuadrantClick(quad)} 
            isHovered={hoveredQuadrant === quad.title}
            onMouseEnter={() => setHoveredQuadrant(quad.title)}
            onMouseLeave={() => setHoveredQuadrant(null)}
          />
        ))}
      </div>
    </section>
  );
};

export default MapaCentral;
