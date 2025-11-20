import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("estudiante"); // Por defecto estudiante
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!nombre || !email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre,
        email,
        rol,
        cursosAsignados: [],
        fechaRegistro: new Date().toISOString()
      });

      // Redirigir al login
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al registrarte");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-orange-600">Registrarse</h2>

        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-orange-400"
        />

        <select
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          className="w-full mb-4 p-2 border rounded focus:ring-2 focus:ring-orange-400"
        >
          <option value="estudiante">Estudiante</option>
          <option value="profesor">Profesor</option>
        </select>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Registrarse
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <p className="mt-4 text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-orange-600 hover:underline">
            Inicia sesión aquí
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
