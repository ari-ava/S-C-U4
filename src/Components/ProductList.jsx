function ProductList({ products, onEdit, onDelete, permisos }) {
  return (
    <div className="grid gap-4">
      {products.map((item) => (
        <div
          key={item.id}
          className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
        >
          {/* Título del Curso */}
          <h3 className="text-xl font-bold text-orange-700">{item.title}</h3>

          {/* Categoría */}
          <p className="text-gray-600 mt-1">
            <strong>Categoría:</strong> {item.category}
          </p>

          {/* Tipo */}
          <p className="text-gray-600">
            <strong>Tipo:</strong> {item.type}
          </p>

          {/* Estado */}
          <p className="text-gray-600">
            <strong>Estado:</strong>{" "}
            {item.status === "activo" && "🟢 Activo"}
            {item.status === "inactivo" && "🔴 Inactivo"}
            {item.status === "agotado" && "🟡 Agotado"}
          </p>

          {/* Precio */}
          <p className="text-gray-700">
            <strong>Precio:</strong>{" "}
            {item.price === 0 ? "Gratis 🧡" : `$${item.price}`}
          </p>

          {/* Imagen */}
          {item.image && (
            <img
              src={item.image}
              alt="Imagen"
              className="w-full h-40 object-cover rounded-lg mt-3"
            />
          )}

          {/* Botones (según permisos) */}
          <div className="flex gap-3 mt-4">
            
            {/* EDITAR */}
            {permisos.puedeEditar && (
              <button
                onClick={() => onEdit(item)}
                className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
              >
                ✏️ Editar
              </button>
            )}

            {/* ELIMINAR */}
            {permisos.puedeEliminar && (
              <button
                onClick={() => onDelete(item.id)}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                🗑 Eliminar
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;

