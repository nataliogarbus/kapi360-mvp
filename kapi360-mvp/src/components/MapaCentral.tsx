
import React from 'react';

// Tipo de datos para un cuadrante, incluyendo el contenido para el panel
interface QuadrantData {
  title: string;
  score: number;
  bgColor: string;
  queEs: string;
  porQueImporta: string;
}

// Props para el componente de un cuadrante individual
interface QuadrantProps extends QuadrantData {
  onClick: () => void;
}

// Props para el componente principal del Mapa Central
interface MapaCentralProps {
  onQuadrantClick: (data: Omit<QuadrantData, 'score' | 'bgColor'>) => void;
}

// Componente para un cuadrante individual, ahora con onClick
const Quadrant: React.FC<QuadrantProps> = ({ title, score, bgColor, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md ${bgColor} text-white transition-transform duration-300 hover:scale-105 cursor-pointer`}
    >
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-4xl font-light mt-2">{score}</p>
    </div>
  );
};

// Componente principal del Mapa Central, ahora acepta onQuadrantClick
const MapaCentral: React.FC<MapaCentralProps> = ({ onQuadrantClick }) => {
  // Datos de ejemplo, incluyendo el contenido para el panel de inteligencia
  const quadrantsData: QuadrantData[] = [
    {
      title: 'Visibilidad',
      score: 75,
      bgColor: 'bg-blue-600',
      queEs: 'Mide qué tan fácil es para los clientes potenciales encontrar tu sitio web en motores de búsqueda como Google.',
      porQueImporta: 'Si no te encuentran, no existes. Una alta visibilidad se traduce en más tráfico, más oportunidades y mayor cuota de mercado digital.'
    },
    {
      title: 'Plataforma',
      score: 88,
      bgColor: 'bg-green-600',
      queEs: 'Evalúa la calidad técnica de tu sitio web: velocidad de carga, seguridad, y si funciona bien en dispositivos móviles.',
      porQueImporta: 'Un sitio lento o que no funciona en móviles frustra a los usuarios y los hace abandonar. Google también penaliza a los sitios lentos.'
    },
    {
      title: 'Contenido',
      score: 62,
      bgColor: 'bg-orange-500',
      queEs: 'Analiza la calidad y relevancia de la información que presentas, y si tienes activos de conversión como catálogos o newsletters.',
      porQueImporta: 'El contenido es tu vendedor silencioso. Atrae, educa y persuade a los clientes. Sin contenido de valor, no hay confianza ni ventas.'
    },
    {
      title: 'Conversión',
      score: 45,
      bgColor: 'bg-red-600',
      queEs: 'Mide la eficacia de tu sitio para convertir visitantes en clientes, a través de formularios de contacto, llamadas a la acción y facilidad de uso.',
      porQueImporta: 'Puedes tener mucho tráfico, pero si nadie te contacta o compra, es un esfuerzo perdido. La conversión es el KPI que impacta directamente en la facturación.'
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
          />
        ))}
      </div>
    </section>
  );
};

export default MapaCentral;
