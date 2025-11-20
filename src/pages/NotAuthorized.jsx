import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-xl p-10 rounded-2xl border border-orange-300 max-w-md w-full text-center"
      >
        <h1 className="text-3xl font-bold text-orange-700">
          Acceso no autorizado 🚫
        </h1>

        <p className="mt-4 text-gray-700">
          No tienes permisos para acceder a esta página.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Volver al inicio
        </Link>
      </motion.div>
    </div>
  );
};

export default NotAuthorized;
