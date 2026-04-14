import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/inventario_new.css";

function inventario_cuerpo() {

    const navigate = useNavigate();

    const [Activos, setActivos] = useState([]);

    let path = "http://localhost:8080/"

    useEffect(() => {

        ObtenerTodosLosActivos();

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

    return (
        <>
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <td>nombre</td>
                            <td>serial</td>
                            <td>modelo</td>
                            <td>marca</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Activos.map(item => (
                                <tr key={item.ID}>
                                    <td>{item.Nombre}</td>
                                    <td>{item.Provider?.Serial}</td>
                                    <td>{item.Provider?.Models}</td>
                                    <td>{item.Provider?.Brand}</td>
                                    <td><input type="button" value="Eliminar" onClick={() => EliminarActivo(item.ID)} /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <input type="button" value="Agregar Activo" onClick={() => navigate("/CrearActivo")} />
            </div>
        </>
    )
}

export default inventario_cuerpo;