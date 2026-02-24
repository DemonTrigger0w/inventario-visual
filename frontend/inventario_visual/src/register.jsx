import { useState } from "react";
import "./style/Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [DataLogin, setDataLogin] = useState({
    usuario: "",
    contraseña: "",
  });

  const navigate = useNavigate();

  const RegisterUser = async () => {
    try {
      const form = new FormData();
      form.append("usuario", DataLogin.usuario);
      form.append("contraseña", DataLogin.contraseña);

      const data = {
        method: "POST",
        body: form,
      };

      const res = await fetch("http://localhost:8080/RegistrarUsuario", data);
      const req = await res.json();

      if (req.error){
        throw new Error(req.error);
      }

      navigate("/");
      
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
          <input onChange={(e) => setDataLogin({...DataLogin, contraseña: e.target.value})} type="password" placeholder="Contraseña" />
        </div>
        <input type="button" value="registrese" onClick={RegisterUser} />
        <div className="register">
        </div>
      </div>
    </>
  );
}

export default Register;