import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase.js";
import { collection, query, where, getDocs, addDoc, Timestamp } from "firebase/firestore";
import materiasData from "../data/materiales.json";

// 🔶 Página Foro combinada con Cursos
export default function Foro() {
  // Cursos
  const [cursos, setCursos] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState(null);

  // Foro
  const [mensajes, setMensajes] = useState([]);
  const [mensajeTexto, setMensajeTexto] = useState("");
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  const user = auth.currentUser;

  // 🔹 Cargar cursos desde Firebase
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const q = query(collection(db, "cursos")); // aquí puedes agregar filtros
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCursos(data);
      } catch (err) {
        console.error("Error cargando cursos:", err);
      }
    };
    fetchCursos();
  }, []);

  // 🔹 Publicar mensaje en foro (local state)
  const publicarMensaje = async () => {
    if (!mensajeTexto.trim() || !materiaSeleccionada) {
      alert("Escribe un mensaje y selecciona una materia.");
      return;
    }

    const nuevoMensaje = {
      id: Date.now(),
      materia: materiaSeleccionada,
      texto: mensajeTexto,
      respuestas: [],
      autor: user?.displayName || user?.email || "Anonimo",
      creadoEn: Timestamp.now(),
    };

    setMensajes([nuevoMensaje, ...mensajes]);
    setMensajeTexto("");
    setMateriaSeleccionada("");

    // 🔹 Opcional: guardar en Firestore
    try {
      await addDoc(collection(db, "foro"), nuevoMensaje);
    } catch (err) {
      console.error("Error guardando mensaje:", err);
    }
  };

  // 🔹 Enviar respuesta
  const enviarRespuesta = (id, textoRespuesta) => {
    if (!textoRespuesta.trim()) return;

    const nuevosMensajes = mensajes.map((m) =>
      m.id === id ? { ...m, respuestas: [...m.respuestas, textoRespuesta] } : m
    );
    setMensajes(nuevosMensajes);
  };

  // 🔹 Mensajes filtrados
  const mensajesFiltrados =
    filtro === "Todos" ? mensajes : mensajes.filter((m) => m.materia === filtro);

  return (

      <main className="min-h-screen p-6 bg-orange-50 font-sans">

        {/* Cursos */}
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-orange-700 mb-4">📚 Cursos Disponibles</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cursos.map((c) => (
              <article key={c.id} className="bg-white p-4 rounded-xl shadow-md">
                <img src={c.image} alt={c.title} className="w-full h-36 object-cover rounded mb-3" />
                <h2 className="font-semibold text-lg">{c.title}</h2>
                <p className="text-sm text-gray-500">{c.category} • {c.price === 0 ? "Gratuito" : `$${c.price}`}</p>
                <div className="mt-3 flex justify-between">
                  <button
                    onClick={() => setSelectedCurso(c)}
                    className="px-3 py-1 border rounded text-sm"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => alert(`Inscribiste/compraste '${c.title}'`)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                  >
                    {c.price === 0 ? "Inscribirme" : "Comprar"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Modal curso */}
        {selectedCurso && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
            onClick={() => setSelectedCurso(null)}
          >
            <div
              className="bg-white p-4 rounded max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{selectedCurso.title}</h3>
                  <p className="text-sm text-gray-500">{selectedCurso.category} • {selectedCurso.price === 0 ? "Gratuito" : `$${selectedCurso.price}`}</p>
                </div>
                <button onClick={() => setSelectedCurso(null)} aria-label="Cerrar">✕</button>
              </div>
              <img src={selectedCurso.image} alt={selectedCurso.title} className="w-full h-40 object-cover rounded my-3" />
              <p className="text-gray-700">{selectedCurso.description}</p>
            </div>
          </div>
        )}

        {/* Foro */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-orange-700 mb-4">💬 Foro</h2>

          {/* Filtro de materias */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button
              className={`px-4 py-2 rounded-lg border ${filtro === "Todos" ? "bg-orange-500 text-white" : "bg-white text-orange-600 border-orange-400"}`}
              onClick={() => setFiltro("Todos")}
            >
              Todos
            </button>
            {materiasData.map((m) => (
              <button
                key={m}
                className={`px-4 py-2 rounded-lg border ${filtro === m ? "bg-orange-500 text-white" : "bg-white text-orange-600 border-orange-400"}`}
                onClick={() => setFiltro(m)}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Crear mensaje */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <input
              type="text"
              placeholder="Escribe tu mensaje aquí"
              className="border p-2 rounded-lg flex-1"
              value={mensajeTexto}
              onChange={(e) => setMensajeTexto(e.target.value)}
            />
            <select
              className="border p-2 rounded-lg"
              value={materiaSeleccionada}
              onChange={(e) => setMateriaSeleccionada(e.target.value)}
            >
              <option value="">Selecciona materia</option>
              {materiasData.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <button
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
              onClick={publicarMensaje}
            >
              Publicar
            </button>
          </div>

          {/* Mensajes */}
          <div id="foro" className="space-y-6">
            {mensajesFiltrados.map((m) => (
              <div key={m.id} className="bg-white border border-orange-200 rounded-xl p-4 shadow">
                <p className="font-semibold text-orange-700">{m.materia}: <span className="text-gray-800">{m.texto}</span></p>
                <p className="text-gray-500 text-sm mb-2">Autor: {m.autor}</p>
                <Responder mensaje={m} enviarRespuesta={enviarRespuesta} />
              </div>
            ))}
          </div>
        </section>
      </main>
      
  );
}

// 🔹 Componente Responder
const Responder = ({ mensaje, enviarRespuesta }) => {
  const [mostrar, setMostrar] = useState(false);
  const [respuesta, setRespuesta] = useState("");

  return (
    <div className="mt-3">
      <button
        onClick={() => setMostrar(!mostrar)}
        className="text-sm text-orange-600 font-semibold hover:underline"
      >
        {mostrar ? "Ocultar respuestas" : "Responder"}
      </button>

      {mostrar && (
        <div className="mt-3">
          <input
            type="text"
            placeholder="Escribe una respuesta"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            className="border p-2 rounded-lg w-full mb-2"
          />
          <button
            className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600"
            onClick={() => {
              enviarRespuesta(mensaje.id, respuesta);
              setRespuesta("");
            }}
          >
            Enviar
          </button>

          <div className="mt-2 space-y-1">
            {mensaje.respuestas.map((r, i) => (
              <p key={i} className="text-sm text-gray-700 ml-3">👤 {r}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
