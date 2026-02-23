import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Inventario from "./inventario.jsx";
import Login from "./login.jsx";
import Register from "./register.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
