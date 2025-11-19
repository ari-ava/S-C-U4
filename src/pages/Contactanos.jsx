import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";

const Contactanos = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [errores, setErrores] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    fetch("/data/mensajes.json")
      .then((res) => res.json())
      .then((data) => setMensajes(data))
      .catch((err) => console.error("Error al cargar mensajes:", err));
  }, []);

  const validarFormulario = () => {
    let erroresTemp = {};

    if (!formData.nombre.trim()) {
      erroresTemp.nombre = "El nombre es obligatorio";
    }

    if (!formData.email.trim()) {
      erroresTemp.email = "El correo es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      erroresTemp.email = "El correo no es válido";
    }

    if (!formData.mensaje.trim()) {
      erroresTemp.mensaje = "Por favor, escribe tu mensaje";
    }

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      setSuccessMessage("🌿 ¡Gracias por contactarte! Te responderemos pronto.");
      setFormData({ nombre: "", email: "", mensaje: "" });
      setErrores({});
    } else {
      setSuccessMessage("");
    }
  };

  return (

    <main className="min-h-screen bg-orange-50 flex flex-col items-center py-12 px-6">
      <header className="text-center mb-10">
        <img
          src="src\assets\img\logo.png"
          alt="Logo Sembrando Conocimientos"
          className="w-24 h-24 mx-auto mb-4 rounded-full shadow-md"
        />
        <h1 className="text-3xl font-bold text-orange-700">
          Contáctanos 🌱
        </h1>
        <p className="text-gray-700 mt-2">
          Déjanos tus datos y nos comunicaremos contigo pronto.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg border border-orange-200"
      >
        {/* Nombre */}
        <div className="mb-5">
          <label className="block text-orange-800 font-medium mb-1">
            Nombre:
          </label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            className="w-full border border-orange-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Tu nombre completo"
          />
          {errores.nombre && (
            <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>
          )}
        </div>

        {/* Correo */}
        <div className="mb-5">
          <label className="block text-orange-800 font-medium mb-1">
            Correo electrónico:
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full border border-orange-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="ejemplo@correo.com"
          />
          {errores.email && (
            <p className="text-red-500 text-sm mt-1">{errores.email}</p>
          )}
        </div>

        {/* Mensaje */}
        <div className="mb-5">
          <label className="block text-orange-800 font-medium mb-1">
            Mensaje:
          </label>
          <textarea
            rows="4"
            value={formData.mensaje}
            onChange={(e) =>
              setFormData({ ...formData, mensaje: e.target.value })
            }
            className="w-full border border-orange-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Escribe tu mensaje aquí..."
          ></textarea>
          {errores.mensaje && (
            <p className="text-red-500 text-sm mt-1">{errores.mensaje}</p>
          )}
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
        >
          Enviar
        </button>

        {/* Mensaje de éxito */}
        {successMessage && (
          <p className="text-green-600 mt-4 text-center font-medium">
            {successMessage}
          </p>
        )}
      </form>

      {/* Mensajes del JSON */}
      <section className="mt-12 w-full max-w-lg">
        <h2 className="text-xl font-semibold text-orange-700 mb-4 text-center">
          📬 Mensajes Recibidos
        </h2>
        <ul className="space-y-3">
          {mensajes.map((msg) => (
            <li
              key={msg.id}
              className="bg-orange-100 border border-orange-200 p-4 rounded-xl shadow-sm"
            >
              <p className="font-semibold text-orange-800">{msg.nombre}</p>
              <p className="text-gray-700 text-sm">{msg.email}</p>
              <p className="mt-1 text-gray-600 italic">{msg.mensaje}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(msg.fecha).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Contactanos;
