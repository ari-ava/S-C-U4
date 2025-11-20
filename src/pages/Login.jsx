import { useState, useEffect } from "react";
import { auth, db } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("estudiante");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  // 🔥 Autologin: si ya inició sesión, lo redirige automáticamente
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const snap = await getDoc(doc(db, "users", user.uid));
      if (!snap.exists()) return;

      const userRole = snap.data().role;

      redirectByRole(userRole);
    });
  }, []);

  // Función que redirige según el rol
  function redirectByRole(r) {
    if (r === "creadora") navigate("/dashboard-creadoras");
    else if (r === "profesor") navigate("/dashboard-profes");
    else if (r === "estudiante") navigate("/dashboard-estudiantes");
    else navigate("/");
  }

  // 🔒 Validación fuerte de contraseña
  function validatePassword(p) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*._-]).{8,}$/;
    return regex.test(p);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      // Validación antes de Firebase
      if (isRegister && !validatePassword(pass)) {
        throw new Error(
          "La contraseña debe tener mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 símbolo."
        );
      }

      if (isRegister) {
        // Crear usuario
        const res = await createUserWithEmailAndPassword(auth, email, pass);

        // Crear perfil en Firestore
        await setDoc(doc(db, "users", res.user.uid), {
          email,
          role,
          createdAt: new Date(),
        });

        alert("Cuenta creada con éxito ✨");
      } else {
        // Iniciar sesión
        const res = await signInWithEmailAndPassword(auth, email, pass);

        const snap = await getDoc(doc(db, "users", res.user.uid));
        if (!snap.exists()) {
          throw new Error("El perfil del usuario no existe.");
        }

        redirectByRole(snap.data().role);
      }
    } catch (err) {
      setErrorMsg(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center from-orange-200 to-orange-50">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-orange-200"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-700">
          {isRegister ? "Crear cuenta ✨" : "Iniciar sesión 🔐"}
        </h2>

        {errorMsg && (
          <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-lg text-center">
            {errorMsg}
          </div>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-orange-500"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Contraseña con botón mostrar */}
        <div className="relative mb-4">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Contraseña"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setPass(e.target.value)}
            required
          />

          {/* Ojo */}
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Roles solo si registra */}
        {isRegister && (
          <select
            className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="estudiante">Estudiante</option>
            <option value="profesor">Profesor</option>
            <option value="invitado">Invitado</option>
            <option value="creadora">Creadora</option>
          </select>
        )}

        <button
          disabled={loading}
          className={`w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg shadow font-semibold transition ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading
            ? "Procesando..."
            : isRegister
            ? "Crear cuenta"
            : "Ingresar"}
        </button>

        {/* Cambiar modo */}
        <p
          onClick={() => setIsRegister(!isRegister)}
          className="mt-5 text-center text-orange-700 cursor-pointer hover:underline"
        >
          {isRegister
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Regístrate"}
        </p>
      </motion.form>
    </div>
  );
}
