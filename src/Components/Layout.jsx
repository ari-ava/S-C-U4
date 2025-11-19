import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { auth } from "../firebase/firebase.config";
import { signOut } from "firebase/auth";

const Layout = ({ children }) => {
  const { user, role } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-orange-50 text-gray-800">

      {/* HEADER */}
      <header className="bg-orange-200 text-orange-900 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

          {/* LOGO */}
          <div className="flex items-center space-x-3">
            <img
              src="/src/assets/img/logo.png"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-bold text-lg">
              Sembrando Conocimientos
            </span>
          </div>

          {/* NAV */}
          <nav>
            <ul className="flex space-x-6 font-medium">

              <li><Link to="/" className="hover:text-orange-600">Inicio</Link></li>
              <li><Link to="/nosotras" className="hover:text-orange-600">Nosotras</Link></li>
              <li><Link to="/mision-vision" className="hover:text-orange-600">Misión y Visión</Link></li>
              <li><Link to="/foro" className="hover:text-orange-600">Foro</Link></li>
              <li><Link to="/testimonios" className="hover:text-orange-600">Testimonios</Link></li>
              <li><Link to="/contactanos" className="hover:text-orange-600">Contáctanos</Link></li>

              {/* Dashboard solo para PROFESOR */}
              {role === "profesor" && (
                <li><Link to="/dashboard" className="hover:text-orange-600">Dashboard</Link></li>
              )}

              {/* Login / Logout */}
              {!user ? (
                <li>
                  <Link to="/login" className="hover:text-orange-600">
                    Iniciar Sesión
                  </Link>
                </li>
              ) : (
                <li>
                  <button
                    onClick={() => signOut(auth)}
                    className="hover:text-orange-700 underline"
                  >
                    Cerrar sesión ({role})
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="flex-grow">{children}</main>

      {/* FOOTER */}
      <footer className="bg-orange-200 text-center py-3 text-sm text-orange-800">
        © 2025 Sembrando Conocimientos 🌱 — Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Layout;
