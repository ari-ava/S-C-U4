// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase.js"; // tu archivo de Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // iniciar sesión con Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // traer el usuario desde Firestore
      const userDocRef = doc(db, "usuarios", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log("Usuario logueado:", userData);

        // redirigir según rol o solo a home
        navigate("/foro"); // por ejemplo, al foro
      } else {
        setError("Usuario no encontrado en la base de datos.");
      }
    } catch (err) {
      console.error(err);
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (

      <main className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-orange-700 mb-6 text-center">Iniciar Sesión</h1>

          {error && (
            <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 rounded focus:ring-2 focus:ring-orange-400"
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 rounded focus:ring-2 focus:ring-orange-400"
              required
            />

            <button
              type="submit"
              className="bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              Iniciar sesión
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link to="/Register" className="text-orange-600 font-semibold hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </main>
  );
}
