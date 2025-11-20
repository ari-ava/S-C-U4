import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function CursoForo({ id }) {
  const [curso, setCurso] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurso = async () => {
      if (!id) return; // valida que exista id
      try {
        const q = query(
          collection(db, "cursos"),
          where("categoria", "==", "matematica") // ejemplo de filtro seguro
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCurso(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el curso.");
      }
    };
    fetchCurso();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!curso) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-orange-700">Curso</h1>
      <pre>{JSON.stringify(curso, null, 2)}</pre>
    </div>
  );
}
