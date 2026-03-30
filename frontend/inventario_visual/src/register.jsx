import { useState } from "react";
import "./style/Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [DataLogin, setDataLogin] = useState({
    dni: "",
    contraseña: "",
    lastname: "",
    firstname: "",
    area: "",
  });

  const navigate = useNavigate();

  const RegisterUser = async () => {

    try {
      const form = new FormData();
      form.append("password", DataLogin.password);
      form.append("DNI", DataLogin.dni);
      form.append("lastname", DataLogin.lastname);
      form.append("firstname", DataLogin.firstname);
      form.append("area", DataLogin.area);

      const data = {
        method: "POST",
        body: form,
      };

      const res = await fetch("http://localhost:8080/RegistrarUsuario", data);
      const req = await res.json();

      if (req.error) {
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
        <div className="dni-contraseña">
          <div className="dni">
            <h2>DNI</h2>
            <input onChange={(e) => setDataLogin({ ...DataLogin, dni: e.target.value })} type="text" placeholder="DNI" />
          </div>
          <div className="contraseña">
            <h2>Contraseña</h2>
            <input onChange={(e) => setDataLogin({ ...DataLogin, password: e.target.value })} type="password" placeholder="Contraseña" />
          </div>
        </div>
        <div className="lastname-firstname">
          <div className="lastname">
            <h2>Apellido</h2>
            <input onChange={(e) => setDataLogin({ ...DataLogin, lastname: e.target.value })} type="text" placeholder="Apellido" />
          </div>
          <div className="firstname">
            <h2>Nombre</h2>
            <input onChange={(e) => setDataLogin({ ...DataLogin, firstname: e.target.value })} type="text" placeholder="Nombre" />
          </div>
        </div>
        <div className="area">
          <h2>Area</h2>
          <input onChange={(e) => setDataLogin({ ...DataLogin, area: e.target.value })} type="text" placeholder="Area" />
        </div>
        <input type="button" value="registrese" onClick={RegisterUser} />
        <div className="register">
        </div>
      </div>
    </>
  );
}

export default Register;