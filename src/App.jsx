import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./pages/Home";
import Nosotras from "./pages/Nosotras";
import MisionVision from "./pages/MisionVision";
import Testimonios from "./pages/Testimonios";
import Foro from "./pages/Foro";
import Contactanos from "./pages/Contactanos";
import NotAuthorized from "./pages/NotAuthorized";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotras" element={<Nosotras />} />
          <Route path="/mision-vision" element={<MisionVision />} />
          <Route path="/foro" element={<Foro />} />
          <Route path="/testimonios" element={<Testimonios />} />
          <Route path="/contactanos" element={<Contactanos />} />

          {/* Rutas especiales */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['profesor']}>
                <h1 className="p-10 text-center text-3xl text-orange-700">
                  Dashboard del Profesor
                </h1>
              </ProtectedRoute>
            }
          />

          <Route path="/no-authorized" element={<NotAuthorized />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
