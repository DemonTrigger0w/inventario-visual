import { useState } from "react";
import "./style/Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [DataLogin, setDataLogin] = useState({
    DNI: "",
    Password: "",
  });

  const navigate = useNavigate();

  const LoginUser = async () => {
    try {
      const Login = JSON.stringify({
        dni: DataLogin.DNI,
        password: DataLogin.Password
      }) 

      const data = {
        method: "POST",
        header: {"content-type": "application/json" },
        body: Login,
      };

      const res = await fetch("http://localhost:8080/Iniciarsesion", data);
      const req = await res.json();

      if (req.error) {
        throw new Error(req.error);
      }

      localStorage.setItem(DataLogin.DNI + "Token", req.token)
      navigate("/inventario_new");



    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Login</h1>
        <div className="usuario">
          <h2>Usuario</h2>
          <input onChange={(e) => setDataLogin({ ...DataLogin, DNI: e.target.value })} type="text" placeholder="DNI" />
        </div>
        <div className="contraseña">
          <h2>Contraseña</h2>
          <input onChange={(e) => setDataLogin({ ...DataLogin, Password: e.target.value })} type="password" placeholder="Contraseña" />
        </div>
        <input type="button" value="Login" onClick={LoginUser} />
        <div className="register">
          <p>no tienes cuenta <Link to="/register">registrate aqui</Link></p>
        </div>
      </div>
    </>
  );
}
export default Login;
