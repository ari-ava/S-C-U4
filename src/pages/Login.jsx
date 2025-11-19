import { useState } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("estudiante");
  const [isRegister, setIsRegister] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (isRegister) {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      await setDoc(doc(db, "users", res.user.uid), { role });
    } else {
      await signInWithEmailAndPassword(auth, email, pass);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-orange-200"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
          {isRegister ? "Crear cuenta" : "Iniciar sesión"}
        </h2>

        {/* Email */}
        <input
          type="email"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Correo electrónico"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Contraseña */}
        <input
          type="password"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          placeholder="Contraseña"
          onChange={(e) => setPass(e.target.value)}
        />

        {/* Roles solo si se registra */}
        {isRegister && (
          <select
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="estudiante">Estudiante</option>
            <option value="profesor">Profesor</option>
            <option value="asesor">Asesor</option>
          </select>
        )}

        {/* Botón */}
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg shadow">
          {isRegister ? "Registrarme" : "Ingresar"}
        </button>

        {/* Cambiar modo */}
        <p
          className="mt-4 text-center text-orange-600 cursor-pointer hover:underline"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </p>
      </form>
    </div>
  );
}
