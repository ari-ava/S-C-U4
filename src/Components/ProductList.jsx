function ProductList({ products }) {
  return (
    <div style={{ display: "grid", gap: "15px" }}>
      {products.map((book) => (
        <div
          key={book.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: book.color === "naranja" ? "#ffe5b4" : "#cceeff"
          }}
        >
          <h3>{book.name}</h3>
          <p><strong>Categoría:</strong> {book.category}</p>
          <p><strong>Color:</strong> {book.color}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;

