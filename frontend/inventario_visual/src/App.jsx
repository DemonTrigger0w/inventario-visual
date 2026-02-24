import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Inventario from "./inventario.jsx";
import Login from "./Login.jsx";
import Register from "./register.jsx";
import CrearActivo from "./CrearActivo.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/register" element={<Register />} />
        <Route path="/CrearActivo" element={< CrearActivo/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
