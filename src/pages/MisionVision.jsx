import React from "react";
import logo from "../assets/img/logo.png";
import misionImg from "../assets/img/mision.jpg";
import visionImg from "../assets/img/vision.jpg";
import planes from "../data/planes.json";
import Layout from "../Components/Layout";


const MisionVision = () => {
  return (

    <main className="max-w-5xl mx-auto p-6 font-sans">

      {/* Misión */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">
          ¡Nuestra Misión!
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-6 bg-orange-50 p-6 rounded-xl shadow-md">
          <img
            src={misionImg}
            alt="Imagen misión"
            className="w-64 rounded-lg shadow-lg"
          />
          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            Nuestra misión es inspirar y apoyar a estudiantes y personas apasionadas
            por aprender, compartiendo conocimientos de manera sencilla, interactiva y divertida.
            Queremos que cada persona encuentre motivación y recursos para crecer personal
            y profesionalmente.
          </p>
        </div>
      </section>

      {/* Visión */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">
          Nuestra Visión
        </h2>
        <div className="flex flex-col md:flex-row-reverse items-center gap-6 bg-orange-50 p-6 rounded-xl shadow-md">
          <img
            src={visionImg}
            alt="Imagen visión"
            className="w-64 rounded-lg shadow-lg"
          />
          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            Nuestra visión es construir una gran comunidad de aprendizaje, donde las ideas
            se transformen en proyectos, y donde el conocimiento sea accesible para todos,
            sin importar fronteras. Soñamos con ser un referente en educación digital interactiva.
          </p>
        </div>
      </section>

      {/* Avances */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">
          ✅ Nuestro Avance Logrado
        </h2>
        <ul className="space-y-4">
          <li className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-md shadow-sm">
            🌱 2023 - Inicio de nuestro proyecto educativo
          </li>
          <li className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-md shadow-sm">
            📚 2024 - Primera comunidad de estudiantes activos
          </li>
          <li className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-md shadow-sm">
            💻 2025 - Plataforma digital interactiva
          </li>
        </ul>
      </section>

      {/* Planes a Futuro */}
      <section>
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">
          🚀 Planes a Futuro
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {planes.map((plan, index) => (
            <div
              key={index}
              className="bg-orange-100 p-6 rounded-xl text-center shadow-md hover:bg-orange-200 transition-all"
            >
              <h3 className="text-2xl font-semibold text-orange-700 mb-2">
                {plan.icon} {plan.title}
              </h3>
              <p className="text-gray-700">{plan.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>

  );
};

export default MisionVision;
