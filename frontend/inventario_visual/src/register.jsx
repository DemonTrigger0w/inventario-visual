import { useState } from "react";
import "./style/Register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [DataRegister, setDataRegister] = useState({
    DNI: "",
    Firstname: "",
    Lastname: "",
    Password: "",
    Area: "",
  });

  const navigate = useNavigate();

  const RegisterUser = async () => {
    
    try {
      const Register = JSON.stringify({
        dni: DataRegister.DNI,
        firstname: DataRegister.Firstname,
        lastname: DataRegister.Lastname,
        password: DataRegister.Password,
        area: DataRegister.Area        
      })

      const data = {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: Register,
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
            <input onChange={(e) => setDataRegister({ ...DataRegister, DNI: e.target.value })} type="text" placeholder="DNI" />
          </div>
          <div className="contraseña">
            <h2>Contraseña</h2>
            <input onChange={(e) => setDataRegister({ ...DataRegister, Password: e.target.value })} type="password" placeholder="Contraseña" />
          </div>
        </div>
        <div className="lastname-firstname">
          <div className="lastname">
            <h2>Apellido</h2>
            <input onChange={(e) => setDataRegister({ ...DataRegister, Lastname: e.target.value })} type="text" placeholder="Apellido" />
          </div>
          <div className="firstname">
            <h2>Nombre</h2>
            <input onChange={(e) => setDataRegister({ ...DataRegister, Firstname: e.target.value })} type="text" placeholder="Nombre" />
          </div>
        </div>
        <div className="area">
          <h2>Area</h2>
          <input onChange={(e) => setDataRegister({ ...DataRegister, Area: e.target.value })} type="text" placeholder="Area" />
        </div>
        <input type="button" value="registrese" onClick={RegisterUser} />
        <div className="register">
        </div>
      </div>
    </>
  );
}

export default Register;