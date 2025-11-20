import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Iniciar sesión con Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Obtener datos del usuario desde Firestore
      const userDoc = await getDoc(doc(db, "usuarios", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Guardar info del usuario en localStorage o contexto si quieres
        localStorage.setItem("user", JSON.stringify(userData));

        // Redirigir según rol o a home
        navigate("/foro"); // o navigate("/") según quieras
      } else {
        setError("Usuario no encontrado en la base de datos");
      }
    } catch (err) {
      console.error(err);
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-orange-600">Iniciar Sesión</h2>

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

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Iniciar Sesión
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <p className="mt-4 text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-orange-600 hover:underline">
            Regístrate aquí
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
