import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import mensajesData from "../data/mensajesHome.json";
import Layout from "../Components/Layout";

const Home = () => {
  const [mensajeActual, setMensajeActual] = useState(0);

 const hayMensajes = mensajesData && mensajesData.length > 0;

  useEffect(() => {
    if (!hayMensajes) return;
    const intervalo = setInterval(() => {
      setMensajeActual((prev) => (prev + 1) % mensajesData.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, [hayMensajes]);

  const mensaje = hayMensajes ? mensajesData[mensajeActual] : null;

  return (
    
     <div className="flex flex-col items-center justify-center text-center min-h-[90vh] bg-gradient-to-b from-orange-100 to-orange-50 px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-800 mb-6">
            Bienvenid@s a{" "}
            <span className="text-orange-600">Sembrando Conocimientos</span>
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Un espacio donde cultivamos ideas, compartimos aprendizajes y crecemos junt@s 🌱
          </p>
        </motion.div>

              <motion.div
          className="mt-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="src\assets\img\logo.png"
            alt="Logo principal"
            className="w-40 h-40 sm:w-56 sm:h-56 rounded-full shadow-xl border-4 border-orange-300 bg-white"
          />
        </motion.div>

      { }
        {hayMensajes && (
          <motion.div
            key={mensajeActual} 
            className="mt-10 bg-white rounded-2xl shadow-md p-6 w-full sm:w-[600px] border border-orange-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-orange-700 mb-2">
              {mensaje.titulo}
            </h2>
            <p className="text-gray-700">{mensaje.descripcion}</p>
          </motion.div>
        )}
    </div>

  );
};

export default Home;
