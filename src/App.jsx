import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./pages/Home";
import Nosotras from "./pages/Nosotras";
import MisionVision from "./pages/MisionVision";
import Testimonios from "./pages/Testimonios";
import Contactanos from "./pages/Contactanos";
import Foro from "./pages/Foro"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/nosotras" element={<Nosotras />} />
          <Route path="/mision-vision" element={<MisionVision />} />
          <Route path="/foro" element={<Foro />} />
          <Route path="/testimonios" element={<Testimonios />} />
          <Route path="/contactanos" element={<Contactanos />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;