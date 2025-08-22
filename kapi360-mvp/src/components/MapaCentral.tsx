
import React from 'react';

// Definimos una interfaz para las props de cada cuadrante
interface QuadrantProps {
  title: string;
  score: number;
  bgColor: string;
}

// Componente para un cuadrante individual
const Quadrant: React.FC<QuadrantProps> = ({ title, score, bgColor }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md ${bgColor} text-white transition-transform duration-300 hover:scale-105 cursor-pointer`}>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-4xl font-light mt-2">{score}</p>
    </div>
  );
};

// Componente principal del Mapa Central
const MapaCentral: React.FC = () => {
  // Datos de ejemplo para los cuadrantes. Más adelante se conectarán a los datos reales del diagnóstico.
  const quadrantsData = [
    { title: 'Visibilidad', score: 75, bgColor: 'bg-blue-600' },
    { title: 'Plataforma', score: 88, bgColor: 'bg-green-600' },
    { title: 'Contenido', score: 62, bgColor: 'bg-orange-500' },
    { title: 'Conversión', score: 45, bgColor: 'bg-red-600' },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Mapa de Crecimiento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quadrantsData.map((quad) => (
            <Quadrant key={quad.title} title={quad.title} score={quad.score} bgColor={quad.bgColor} />
        ))}
        </div>
    </section>
  );
};

export default MapaCentral;
