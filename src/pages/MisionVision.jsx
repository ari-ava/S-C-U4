import React from "react";
import Layout from "../Components/Layout";
import planes from "../data/planes.json";
import misionImg from "../assets/img/mision.jpg";
import visionImg from "../assets/img/vision.jpg";

const MisionVision = () => {
  return (
    <Layout>
      <main className="max-w-6xl mx-auto p-6 font-sans">

        {/* Título principal */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-orange-700 mb-12"
        >
          🌱 Nuestra Misión y Visión 🌱
        </motion.h1>

        {/* Misión */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">
            ¡Nuestra Misión!
          </h2>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row items-center gap-8 bg-orange-50 p-8 rounded-2xl shadow-lg border border-orange-200"
          >
            <img
              src={misionImg}
              alt="Imagen misión"
              className="w-64 rounded-xl shadow-md"
            />

            <p className="text-gray-700 text-lg leading-relaxed text-justify">
              Nuestra misión es inspirar y apoyar a estudiantes y personas apasionadas
              por aprender, compartiendo conocimientos de manera sencilla, interactiva y divertida.
              Queremos que cada persona encuentre motivación y recursos para crecer personal
              y profesionalmente, creando un espacio donde aprender se vuelva algo emocionante
              y accesible para todos.
            </p>
          </motion.div>
        </section>

        {/* Visión */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">
            Nuestra Visión
          </h2>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row-reverse items-center gap-8 bg-orange-50 p-8 rounded-2xl shadow-lg border border-orange-200"
          >
            <img
              src={visionImg}
              alt="Imagen visión"
              className="w-64 rounded-xl shadow-md"
            />

            <p className="text-gray-700 text-lg leading-relaxed text-justify">
              Nuestra visión es construir una gran comunidad de aprendizaje, donde las ideas
              se transformen en proyectos reales, y donde el conocimiento sea accesible para todos,
              sin importar fronteras.  
              Soñamos con ser un referente de educación digital creativa, interactiva y confiable,
              impulsada por jóvenes con ganas de cambiar el mundo.
            </p>
          </motion.div>
        </section>

        {/* Avances */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">
            ✅ Nuestro Avance Logrado
          </h2>

          <ul className="space-y-4">
            {[
              "🌱 2023 - Inicio de nuestro proyecto educativo",
              "📚 2024 - Primera comunidad de estudiantes activos",
              "💻 2025 - Plataforma digital interactiva"
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-md shadow-sm"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </section>

        {/* Planes a Futuro */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-orange-600 text-center mb-8">
            🚀 Planes a Futuro
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {planes.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-orange-100 p-6 rounded-xl text-center shadow-md border border-orange-200 hover:bg-orange-200 transition-all"
              >
                <h3 className="text-2xl font-semibold text-orange-700 mb-2">
                  {plan.icon} {plan.title}
                </h3>
                <p className="text-gray-700">{plan.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
    </Layout>
  );
};

export default MisionVision;
