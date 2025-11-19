import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductForm from "../Components/ProductForm";
import ProductList from "../Components/ProductList";
import StatsPanel from "../Components/StatsPanel";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("products");

  // Cargar productos del localStorage al iniciar
  useEffect(() => {
    const savedProducts = localStorage.getItem("dashboard-products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Guardar en localStorage cuando cambien los productos
  useEffect(() => {
    localStorage.setItem("dashboard-products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(), // ID único basado en timestamp
      createdAt: new Date().toISOString()
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setActiveTab("form");
  };

  const cancelEditing = () => {
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-orange-800 mb-4">
            🌱 Dashboard de Productos
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Administra tus productos, servicios y recursos educativos de manera eficiente
          </p>
        </motion.div>

        {/* Panel de Estadísticas */}
        <StatsPanel products={products} />

        {/* Tabs de Navegación */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === "products"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-orange-100"
              }`}
            >
              📋 Ver Productos
            </button>
            <button
              onClick={() => setActiveTab("form")}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === "form"
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-orange-100"
              }`}
            >
              {editingProduct ? "✏️ Editar Producto" : "➕ Agregar Producto"}
            </button>
          </div>
        </div>

        {/* Contenido de las Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className={`lg:col-span-1 ${activeTab !== "form" && "hidden lg:block"}`}>
            {activeTab === "form" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <ProductForm
                  onSubmit={editingProduct ? updateProduct : addProduct}
                  editingProduct={editingProduct}
                  onCancel={cancelEditing}
                />
              </motion.div>
            )}
          </div>

          {/* Lista de Productos */}
          <div className={`lg:col-span-2 ${activeTab !== "products" && "hidden lg:block"}`}>
            {activeTab === "products" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <ProductList
                  products={products}
                  onEdit={startEditing}
                  onDelete={deleteProduct}
                />
              </motion.div>
            )}
          </div>
        </div>

        {/* Mensaje cuando no hay productos */}
        {products.length === 0 && activeTab === "products" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 bg-white rounded-2xl shadow-md"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No hay productos aún
            </h3>
            <p className="text-gray-500 mb-6">
              Comienza agregando tu primer producto o servicio educativo
            </p>
            <button
              onClick={() => setActiveTab("form")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              ➕ Agregar Primer Producto
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;