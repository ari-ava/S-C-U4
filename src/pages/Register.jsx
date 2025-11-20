import React, { useState } from "react";
import { auth, db } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("estudiante"); // default
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!nombre || !email || !password || !rol) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      // 1️⃣ Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Guardar info del usuario en Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre,
        email,
        rol,
        cursosAsignados: [], // inicialmente vacío
        fechaRegistro: Timestamp.now()
      });

      // 3️⃣ Redirigir o mostrar mensaje
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-orange-700">Registro</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="estudiante">Estudiante</option>
          <option value="profesor">Profesor</option>
        </select>

        <button
          type="submit"
          className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
