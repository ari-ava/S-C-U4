import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  doc
} from "firebase/firestore";
import Layout from "../Components/Layout";

const ForoRealtime = () => {
  const [posts, setPosts] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const user = auth.currentUser;

  // 🔥 Cargar posts en tiempo real
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("creadoEn", "desc"));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const postData = [];

      // Para cada post, también cargamos los comentarios en tiempo real
      for (const docu of snapshot.docs) {
        const post = { id: docu.id, ...docu.data(), comentarios: [] };

        const commentsQuery = query(
          collection(db, "posts", docu.id, "comentarios"),
          orderBy("creadoEn", "asc")
        );

        // Escuchar cambios de comentarios en tiempo real
        onSnapshot(commentsQuery, (comSnap) => {
          post.comentarios = comSnap.docs.map((c) => ({
            id: c.id,
            ...c.data(),
          }));
          setPosts((prev) => [...postData]);
        });

        postData.push(post);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔥 Publicar post
  async function publicar(e) {
    e.preventDefault();
    if (!mensaje.trim()) return;

    await addDoc(collection(db, "posts"), {
      contenido: mensaje,
      autor: user.displayName || user.email,
      uid: user.uid,
      rol: "estudiante",
      creadoEn: Timestamp.now(),
    });

    setMensaje("");
  }

  // 🔥 Publicar comentario
  async function publicarComentario(postId, texto) {
    if (!texto.trim()) return;

    await addDoc(collection(db, "posts", postId, "comentarios"), {
      contenido: texto,
      autor: user.displayName || user.email,
      uid: user.uid,
      rol: "estudiante",
      creadoEn: Timestamp.now(),
    });
  }

  return (
    <Layout>
      <main className="min-h-screen bg-orange-50 p-8">

        <h1 className="text-4xl font-bold text-orange-700 text-center mb-8">
          💬 Foro en Tiempo Real
        </h1>

        {/* Crear post */}
        <form
          onSubmit={publicar}
          className="max-w-2xl mx-auto bg-white p-5 rounded-xl shadow-md mb-10"
        >
          <textarea
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-400"
            rows="3"
            placeholder="Escribe tu mensaje aquí..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          ></textarea>

          <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
            Publicar
          </button>
        </form>

        {/* Listado de posts */}
        <div className="max-w-3xl mx-auto space-y-6">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} publicarComentario={publicarComentario} />
          ))}
        </div>
      </main>
    </Layout>
  );
};

// 🔶 Componente separado para que quede más limpio
const PostCard = ({ post, publicarComentario }) => {
  const [comentario, setComentario] = useState("");

  return (
    <div className="bg-white p-5 rounded-xl shadow border border-orange-100">

      {/* encabezado */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-orange-700">
          {post.autor}
          <span className="text-gray-600 text-sm ml-2">({post.rol})</span>
        </h3>
        <p className="text-gray-400 text-sm">
          {post.creadoEn?.toDate().toLocaleString()}
        </p>
      </div>

      {/* contenido */}
      <p className="text-gray-700 mb-3">{post.contenido}</p>

      {/* comentarios */}
      <div className="bg-orange-50 rounded-lg p-3 space-y-3">
        <h4 className="text-orange-600 font-semibold text-sm">Respuestas:</h4>

        {post.comentarios.length === 0 && (
          <p className="text-gray-500 text-sm">Sé la primera persona en responder ✨</p>
        )}

        {post.comentarios.map((c) => (
          <div
            key={c.id}
            className="bg-white p-3 rounded-lg shadow border border-orange-100"
          >
            <div className="flex justify-between">
              <p className="font-semibold text-orange-700">{c.autor}</p>
              <span className="text-gray-400 text-xs">
                {c.creadoEn?.toDate().toLocaleString()}
              </span>
            </div>
            <p className="text-gray-700">{c.contenido}</p>
          </div>
        ))}

        {/* escribir comentario */}
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
            placeholder="Escribe una respuesta…"
          />
          <button
            onClick={() => {
              publicarComentario(post.id, comentario);
              setComentario("");
            }}
            className="bg-orange-500 text-white px-4 rounded-lg hover:bg-orange-600 transition"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForoRealtime;
