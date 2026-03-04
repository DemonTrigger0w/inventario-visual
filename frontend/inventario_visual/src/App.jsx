import { BrowserRouter, Routes, Route } from "react-router-dom";
import inventario_old from "./inventario_old.jsx";
import Inventario_new from "./inventario.jsx";
import Login from "./Login.jsx";
import Register from "./register.jsx";
import CrearActivo from "./CrearActivo.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inventario_old" element={<inventario_old />} />
        <Route path="/inventario_new" element={<Inventario_new />} />
        <Route path="/register" element={<Register />} />
        <Route path="/CrearActivo" element={< CrearActivo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
