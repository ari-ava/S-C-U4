import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase.js";
import { collection, query, where, getDocs, addDoc, Timestamp } from "firebase/firestore";

export default function Foro({ cursoId }) {
  const [posts, setPosts] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const user = auth.currentUser;
  const [rol, setRol] = useState("");

  useEffect(() => {
    const fetchRol = async () => {
      if (!user) return;
      const userDoc = await getDoc(doc(db, "usuarios", user.uid));
      if (userDoc.exists()) setRol(userDoc.data().rol);
    };
    fetchRol();
  }, [user]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!cursoId) return;
      const q = query(collection(db, "foroPosts"), where("cursoId", "==", cursoId));
      const snapshot = await getDocs(q);
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPosts();
  }, [cursoId]);

  const publicar = async () => {
    if (!mensaje.trim()) return;
    await addDoc(collection(db, "foroPosts"), {
      autor: user.displayName || user.email,
      autorId: user.uid,
      cursoId,
      mensaje,
      fecha: Timestamp.now()
    });
    setMensaje("");
  };

  return (
    <div>
      <h2>Foro del curso</h2>
      <textarea value={mensaje} onChange={e => setMensaje(e.target.value)} />
      <button onClick={publicar}>Enviar</button>

      <ul>
        {posts.map(p => (
          <li key={p.id}>
            <b>{p.autor}</b>: {p.mensaje}
            {rol === "profesor" && <button>Eliminar</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
