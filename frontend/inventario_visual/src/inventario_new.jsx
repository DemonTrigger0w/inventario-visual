import { useEffect, useState } from "react";
import "./inventario.css";

function inventario_cuerpo() {

    const [Activos, setActivos] = useState([]);

    let path = "http://localhost:8080/"

    useEffect( () => {

        ObtenerTodosLosActivos();

    }, []);
    
    const ObtenerTodosLosActivos = async () => {
        try {

            const req = await fetch("ObtenerTodosLosActivos");
            const res = await req.json();

            if (res?.error) {
                throw new Error(res.error);
            }

            setActivos(res.reverse());

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

            const req = await fetch(path + "EliminarActivo", data)
            const res = await req.json();

            if (res?.error) {
                throw new error(res.error);
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
                        <td>estado</td>
                        <td>color</td>
                        <td>descripcion</td>
                    </tr>
                </thead>
                <tbody>
                    {
                    Activos.map(item => (
                        <tr key={item.ID}>
                            <td>{ item.ID }</td>
                            <td>{ item.nombre }</td>
                            <td>{ item.serial }</td>
                            <td>{ item.modelo }</td>
                            <td>{ item.marca }</td>
                            <td>{ item.estado }</td>
                            <td>{ item.color }</td>
                            <td>{ item.descripcion }</td>
                            <td><input type="button" value="Eliminar" onClick={() => EliminarActivo(item.ID)} /></td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
        </>
    )
}

export default inventario_cuerpo;