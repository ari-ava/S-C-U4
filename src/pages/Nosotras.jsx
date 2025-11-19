import React from "react";
import equipo from "../data/Nosotras.json";
import Layout from "../Components/Layout";

const Nosotras = () => {
  return (

    <div className="bg-orange-50 min-h-screen">

      <section className="container mx-auto py-10 px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {equipo.map((miembro) => (
            <div
              key={miembro.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col"
            >
              <img
                src={miembro.imagen}
                alt={miembro.nombre}
                className="w-full h-64 object-cover"
              />
              <div className="p-5 text-center flex-1 flex flex-col justify-between">
                <div>
                  <h5 className="text-xl font-bold text-orange-700">
                    {miembro.nombre}
                  </h5>
                  <p><strong>Objetivo:</strong> {miembro.objetivo}</p>
                  <p><strong>Edad:</strong> {miembro.edad}</p>
                  <p><strong>Sueño:</strong> {miembro.sueño}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md mt-12 p-8 text-center max-w-2xl mx-auto hover:shadow-lg transition-all">
          <h3 className="text-2xl font-bold text-orange-700 mb-4">
            🌱 Sembrando Conocimientos 🌱
          </h3>
          <p className="text-gray-700 font-medium mb-2">
            Creado desde 2025, para brindar herramientas y materiales accesibles,
            confiables y gratuitos que ayuden a los estudiantes a desarrollar su máximo potencial académico.
          </p>
          <p className="font-semibold text-orange-700">
            ¡Juntos sembramos el futuro de la educación!
          </p>

          <button className="mt-4 bg-orange-400 text-white px-5 py-2 rounded-full hover:bg-orange-500 transition">
            ✨ Bienvenidas/os ✨
          </button>
        </div>
      </section>
    </div>
  );
};

export default Nosotras;
