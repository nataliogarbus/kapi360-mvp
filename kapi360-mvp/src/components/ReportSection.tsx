import React from 'react';

const ReportSection: React.FC = () => {
  return (
    <div className="my-10 p-8 bg-yellow-900/20 border border-yellow-600 rounded-lg">
      <h1 className="text-5xl font-bold text-center text-yellow-400">
        VERSIÓN DE PRUEBA
      </h1>
      <p className="text-center text-white mt-4">
        Si ves este mensaje, el despliegue está funcionando. El problema está en el código del componente anterior.
      </p>
    </div>
  );
};

export default ReportSection;
