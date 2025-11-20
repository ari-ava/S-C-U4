import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

const CursoForo = () => {
  const { id } = useParams(); // ID del curso
  const [posts, setPosts] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Simulación de usuario (luego se conecta a Auth)
  const usuario = {
    nombre: "Usuario Demo",
    uid: "demo123",
    avatar: "/assets/img/persona3.png",
  };

  // Cargar mensajes en tiempo real
  useEffect(() => {
    const q = query(
      collection(db, "foroposts"),
      where("cursoId", "==", id),
      orderBy("fecha", "asc")
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(data);
    });

    return () => unsubscribe();
  }, [id]);

  // Enviar mensaje al foro
  const enviarMensaje = async () => {
    if (mensaje.trim() === "") return;

    setEnviando(true);

    try {
      await addDoc(collection(db, "foroposts"), {
        cursoId: id,
        autor: usuario.nombre,
        autorUID: usuario.uid,
        avatar: usuario.avatar,
        mensaje: mensaje,
        fecha: serverTimestamp(),
      });

      setMensaje("");
    } catch (err) {
      console.error("Error al enviar mensaje:", err);
    }

    setEnviando(false);
  };

  return (
    <Layout>
      <main className="min-h-screen bg-orange-50 p-6">

        {/* Título */}
        <h1 className="text-3xl font-bold text-orange-700 text-center mb-6">
          🧡 Foro del Curso
        </h1>

        {/* Caja de mensajes */}
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-orange-600 mb-4">Publicaciones</h2>

          {/* Lista de posts */}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-3">
            {posts.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No hay mensajes aún. ¡Sé el primero en escribir! 🎉
              </p>
            )}

            {posts.map((post) => (
              <div
                key={post.id}
                className="flex gap-3 bg-orange-100 rounded-xl p-4 shadow-sm"
              >
                <img
                  src={post.avatar}
                  alt={post.autor}
                  className="w-12 h-12 rounded-full border-2 border-orange-300"
                />

                <div>
                  <p className="text-orange-700 font-semibold">{post.autor}</p>
                  <p className="text-gray-700">{post.mensaje}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Caja para escribir mensaje */}
          <div className="mt-6">
            <textarea
              className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-orange-400"
              rows="3"
              placeholder="Escribe tu mensaje..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />

            <button
              onClick={enviarMensaje}
              disabled={enviando}
              className="w-full mt-3 bg-orange-500 text-white py-2 rounded-xl shadow-md hover:bg-orange-600 transition disabled:bg-gray-300"
            >
              {enviando ? "Enviando..." : "Enviar mensaje"}
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default CursoForo;
