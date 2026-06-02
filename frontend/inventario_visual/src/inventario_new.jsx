import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"
import "./style/inventario_new.css";

function Inventario_cuerpo() {
    const navigate = useNavigate();
    const [Activos, setActivos] = useState([]);
    const [showall, setshowall] = useState(false)
    const [isActive, setisActive] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [Activo, setActivo] = useState({
        Nombre: "",
        Serial: "",
        Modelo: "",
        Marca: "",
        Estado: "",
        Color: "",
        Descripcion: ""
    })

    const columnas = [

        { label: "Nombre",      extra: false, path: (item) => item.name },
        { label: "Serial",      extra: false, path: (item) => item.provider?.serial },
        { label: "Modelo",      extra: false, path: (item) => item.provider?.models },
        { label: "Marca",       extra: false, path: (item) => item.provider?.brand },
        // esto solo se ve si showall es igual a true
        { label: "Descripción", extra: true,  path: (item) => item.description || "N/A" },
        { label: "Área",        extra: true,  path: (item) => item.area?.name || "N/A" },
        { label: "Estado",      extra: true,  path: (item) => item.status?.name || "N/A" },
        { label: "Color",       extra: true,  path: (item) => item.provider?.color || "N/A"},
    ]

    const columnasVisibles = columnas.filter(col => !col.extra || showall);
    let path = "http://localhost:8080/"

  useEffect(() => {
    ValidateToken();
    ObtenerTodosLosActivos();

    const revicion = setInterval(ValidateToken, 60000);
    return () => clearInterval(revicion);
    }, []);

    const ObtenerTodosLosActivos = async () => {
      try {

          const req = await fetch(path + "ObtenerActivos");
          const res = await req.json();

          if (res?.error) {
              throw new Error(res.error);
          }

          setActivos(res);

        } catch (e) {
            console.log(e);
            alert(e);
        }
    }

  const ValidateToken = async () => {
    try {

      const token = localStorage.getItem("Token")
      if (!token) {
        alert("el token no existe")
        navigate("/")
        return;
      }

      const decode = jwtDecode(token)
      const currentTime = Date.now() / 1000;

      if (decode.exp < currentTime) {
        alert("el token a expirado")
        navigate("/")
        localStorage.removeItem("Token")
      }

    } catch (e) {
      alert(e)
      console.log(e)
    }
  }

  const CerrarSesion = () => {
    localStorage.removeItem("Token")
    navigate("/")
  }

    const EliminarActivo = async (ID) => {
        try {
            const form = new FormData();
            form.append("ID", ID);

            const data = {
                method: "DELETE",
                body: form
            };

            const req = await fetch(path + "EliminarAsset", data)
            const res = await req.json();

            if (res?.error) {
                throw new Error(res.error);
            }

            await ObtenerTodosLosActivos();

        } catch (e) {
            console.log(e);
            alert(e)
        }
    }
    const Enviardatos = async () => {
        try {
            const savedata = JSON.stringify({
                nombre: Activo.Nombre,
                serial: Activo.Serial,
                modelo: Activo.Modelo,
                marca: Activo.Marca,
                estado: Activo.Estado,
                color: Activo.Color,
                descripcion: Activo.Descripcion,
            })

            const data = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: savedata
            }

            const req = await fetch(path + "Guardarinventario", data);
            const res = await req.json();

            if (res?.error) {
                throw new Error(res.error);
            }

        } catch (e) {
            console.log(e);
            alert(e);
        }

    }

    return (
        <>
        <div className="container-initial">
          <header>
            <input className="btn-cerrar-sesion" type="button" onClick={CerrarSesion} value="Cerrar Sesión" />
          </header>
            <div className="container">
                <table className="activosxc">
                    <thead>
                         <tr>
                            {columnasVisibles.map(col => (
                                <th key={col.label}>{col.label}</th>
                            ))}
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                       {Activos.map(item => (
                        <tr key={item.ID}>
                            {columnasVisibles.map(col => (
                                <td key={col.label}>{col.path(item)}</td>
                            ))}
                            <td>
                                <button className="deleteactive" onClick={() => EliminarActivo( item.ID )}>Eliminar</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
            </table>
            </div>
          <div className={!isActive ? "menos-info" : "mas-info"}>
            <input className="btn-primario" type="button" value="Agregar Activo" onClick={() => setIsOpen(true)} />
            <input className="btn-secundario" type="button" value={showall ? "Menos info": "Mas info"} onClick={() => setshowall(!showall) > setisActive(!isActive)} />
          </div>
          <dialog id="mydialog" open={isOpen} className='modal-ip'>
            <div className="nombre-serial">
            <input type="text" placeholder="nombre" onChange={(e) => setActivo({ ...Activo, Nombre: e.target.value })} />
              <input type="text" placeholder="serial" onChange={(e) => setActivo({ ...Activo, Serial: e.target.value })} />
            </div>
            <div className="modelo-marca">
              <input type="text" placeholder="modelo" onChange={(e) => setActivo({ ...Activo, Modelo: e.target.value })} />
              <input type="text" placeholder="marca" onChange={(e) => setActivo({ ...Activo, Marca: e.target.value })} />
            </div>
            <div className="estado-color-descripcion">
              <input type="text" placeholder="estado" onChange={(e) => setActivo({ ...Activo, Estado: e.target.value })} />
              <input type="text" placeholder="color" onChange={(e) => setActivo({ ...Activo, Color: e.target.value })} />
              <input type="text" placeholder="descripción" onChange={(e) => setActivo({ ...Activo, Descripcion: e.target.value })} />
            </div>
            <div className="Cancelar-datos">
              <input type="button" value="Cancelar" className="Cancelar" onClick={() => { setIsOpen(false); }} />
              <input type="button" value="Enviar datos" className="datos" onClick={() => { Enviardatos(); }} />
            </div>
          </dialog>
        </div>
        </>
    )
}

export default Inventario_cuerpo;
