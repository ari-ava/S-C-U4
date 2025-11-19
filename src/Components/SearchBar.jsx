function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Buscar libro..."
      onChange={(e) => onSearch(e.target.value)}
      style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
    />
  );
}

export default SearchBar;

