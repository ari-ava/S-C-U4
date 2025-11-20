import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";


export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-orange-50">

      {/* HEADER */}
      <header className="bg-white shadow-md border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold text-orange-700">
            Sembrando Conocimientos
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
            <Link to="/" className="hover:text-orange-600 transition">Inicio</Link>
            <Link to="/nosotras" className="hover:text-orange-600 transition">Nosotras</Link>
            <Link to="/mision-vision" className="hover:text-orange-600 transition">Misión y Visión</Link>
            <Link to="/contactanos" className="hover:text-orange-600 transition">Contáctanos</Link>
            <Link to="/testimonios" className="hover:text-orange-600 transition">Testimonios</Link>
            <Link to="/foro" className="hover:text-orange-600 transition">Foro</Link>
            <Link to="/catalogo" className="hover:text-orange-600 transition">Catalogo</Link>
          </nav>

          {/* LOGIN BUTTON */}
          <Link
            to="/login"
            className="hidden md:block bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition"
          >
            Iniciar sesión
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-orange-700"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {open && (
          <div className="md:hidden bg-white border-t border-orange-200 px-6 py-4 space-y-4 text-gray-700 font-medium">
            <Link to="/" onClick={() => setOpen(false)} className="block">Inicio</Link>
            <Link to="/nosotras" onClick={() => setOpen(false)} className="block">Nosotras</Link>
            <Link to="/mision-vision" onClick={() => setOpen(false)} className="block">Misión y Visión</Link>
            <Link to="/testimonios" onClick={() => setOpen(false)} className="block">Testimonios</Link>
            <Link to="/foro" onClick={() => setOpen(false)} className="block">Foro</Link>
            <Link to="/catalogo" className="hover:text-orange-600 transition">Catalogo</Link>
            <Link to="/contactanos" onClick={() => setOpen(false)} className="block">Contáctanos</Link>

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block bg-orange-500 text-white text-center py-2 rounded-lg shadow mt-2"
            >
              Iniciar sesión
            </Link>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
        >
          {children}
        </motion.div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-orange-200 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">

          <p className="font-semibold text-orange-700 mb-1">
            Sembrando Conocimientos © {new Date().getFullYear()}
          </p>

          <p className="text-sm">Hecho con dedicación y creatividad ✨</p>
        </div>
      </footer>
    </div>
  );
}
