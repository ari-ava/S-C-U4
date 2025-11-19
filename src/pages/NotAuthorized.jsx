const NotAuthorized = () => {
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 text-center">
      <div className="bg-white shadow-lg p-10 rounded-xl border border-orange-300">
        <h1 className="text-3xl font-bold text-orange-700">
          Acceso no autorizado 🚫
        </h1>
        <p className="mt-4 text-gray-700">
          No tienes permisos para acceder a esta página.
        </p>
      </div>
    </div>
  );
};

export default NotAuthorized;
