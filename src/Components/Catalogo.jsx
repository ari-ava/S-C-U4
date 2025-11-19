import React, { useState } from "react";

// Catálogo interactivo (single-file React component)
// Uso: importar y colocar <Catalog /> en tu App.jsx
// Requiere TailwindCSS en tu proyecto para estilos (opcional — puedes adaptar clases)

export default function Catalog() {
  const sampleProducts = [
    {
      id: 1,
      title: "Taller: Escritura creativa",
      category: "Talleres",
      price: 0,
      description:
        "Sesión de 4 horas para aprender técnicas de escritura y narración creativa.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    },
    {
      id: 2,
      title: "Guía de estudio: Matemáticas básicas",
      category: "Recursos",
      price: 0,
      description: "PDF descargable con ejercicios y soluciones paso a paso.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    },
    {
      id: 3,
      title: "Mentoría 1:1",
      category: "Mentoría",
      price: 15,
      description: "Sesión personalizada de 60 minutos con un tutor experto.",
      image: "https://images.unsplash.com/photo-1554774853-9b0b5a7ddc2a?w=800&q=80",
    },
    {
      id: 4,
      title: "Workshop: Diseño de maquetas",
      category: "Talleres",
      price: 5,
      description: "Prácticas y tips para planificar y construir maquetas efectivas.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    },
  ];

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [sort, setSort] = useState("relevance");
  const [selected, setSelected] = useState(null);

  const categories = ["Todas", ...Array.from(new Set(sampleProducts.map((p) => p.category)))];

  function filterAndSort(products) {
    let res = products.filter((p) => {
      const matchesQuery = (p.title + " " + p.description).toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "Todas" ? true : p.category === category;
      return matchesQuery && matchesCategory;
    });

    if (sort === "price-asc") res.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") res.sort((a, b) => b.price - a.price);

    return res;
  }

  const results = filterAndSort(sampleProducts);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <header className="mb-4">
        <h2 className="text-2xl font-bold">Catálogo — Sembrando Conocimientos</h2>
        <p className="text-sm text-gray-600">Explora nuestros productos y servicios educativos.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-3 mb-4 items-center">
        <input
          aria-label="Buscar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por título o descripción..."
          className="flex-1 border rounded px-3 py-2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-3 py-2"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)} className="border rounded px-3 py-2">
          <option value="relevance">Más relevantes</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((p) => (
          <article key={p.id} className="border rounded p-3 shadow-sm">
            <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-500">{p.category} • {p.price === 0 ? "Gratuito" : `$${p.price}`}</p>
            <p className="mt-2 text-sm text-gray-700 truncate">{p.description}</p>
            <div className="mt-3 flex justify-between items-center">
              <button onClick={() => setSelected(p)} className="px-3 py-1 border rounded text-sm">Ver</button>
              <button
                onClick={() => alert(`Has agregado '${p.title}' a tu carrito (simulado).`)}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                {p.price === 0 ? "Inscribirme" : "Comprar"}
              </button>
            </div>
          </article>
        ))}

        {results.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-8">No se encontraron resultados.</div>
        )}
      </div>

      {/* Modal simple */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="bg-white rounded max-w-md w-full p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold">{selected.title}</h3>
                <p className="text-sm text-gray-500">{selected.category} • {selected.price === 0 ? "Gratuito" : `$${selected.price}`}</p>
              </div>
              <button onClick={() => setSelected(null)} aria-label="Cerrar">✕</button>
            </div>
            <img src={selected.image} alt={selected.title} className="w-full h-40 object-cover rounded my-3" />
            <p className="text-gray-700">{selected.description}</p>
            <div className="mt-4 flex justify-end">
              <button onClick={() => { alert('Acción de ejemplo: registro/comprar'); setSelected(null); }} className="px-4 py-2 bg-blue-600 text-white rounded">Inscribirme / Comprar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
