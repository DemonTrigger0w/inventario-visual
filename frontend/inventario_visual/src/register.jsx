import { useState } from "react";
import "./style/Register.css";
import { Link } from "react-router-dom";

function Login() {
  const [DataLogin, setDataLogin] = useState({
    usuario: "",
    contraseña: "",
  });

  const CrearUsuario = async () => {
    try {
      const form = new FormData();
      form.append("usuario", DataLogin.usuario);
      form.append("contraseña", DataLogin.contraseña);

      const data = {
        method: "POST",
        body: form,
      };

      const res = await fetch("http://localhost:8080/CrearUsuario", data);
      const req = await res.json();

      if (req.status === 200) {
        console.log("Usuario creado exitosamente");
      } else {
        console.error("Error al crear el usuario");
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <h1>registro</h1>
        <div className="usuario">
          <h2>Usuario</h2>
          <input  onChange={(e) => setDataLogin({...DataLogin, usuario: e.target.value})} type="text" placeholder="Usuario" />
        </div>
        <div className="contraseña">
          <h2>Contraseña</h2>
          <input type="password" placeholder="Contraseña" />
        </div>
        <input type="button" value="registrase" onClick={CrearUsuario} />
        <div className="register">
            <p>no tienes cuenta <Link to="/login">registrate aqui</Link></p>
        </div>
      </div>
    </>
  );
}
export default Login;