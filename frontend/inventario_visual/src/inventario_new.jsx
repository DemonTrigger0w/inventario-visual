import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/inventario_new.css";

function Inventario_cuerpo() {

    const navigate = useNavigate();
    const [Activos, setActivos] = useState([]);
    const [showall, setshowall] = useState(false)
    const [isActive, setisActive] = useState(false)

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
        ObtenerTodosLosActivos();
    }, []);

    const ObtenerTodosLosActivos = async () => {
        try {
          const token = localStorage.getItem("Token");

          const data = {
              headers: {"Authorization": `Apetitoso ${token}`}
          };

          const req = await fetch(path + "ObtenerActivos", data);
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

    const EliminarActivo = async (ID) => {
        try {
            const token = localStorage.getItem("Token");
            const form = new FormData();
            form.append("ID", ID);

            const data = {
                method: "DELETE",
                headers: {
                    "Authorization": `Apetitoso ${token}`
                },
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

    return (
        <>
        <div className="container-initial">
            <div className="container">
                <table>
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
            <div className={ !isActive ? "menos-info" : "mas-info"}>
                <input className="btn-primario" type="button" value="Agregar Activo" onClick={() => navigate("/CrearActivo")} />
                <input className="btn-secundario" type="button" value={showall ? "Menos info": "Mas info"} onClick={() => setshowall(!showall) > setisActive(!isActive)} />
            </div>
        </div>
        </>
    )
}

export default Inventario_cuerpo;
