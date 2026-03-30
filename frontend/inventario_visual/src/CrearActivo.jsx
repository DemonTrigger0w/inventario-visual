import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/CrearActivo.css";


function CrearActivo() {
    const navigate = useNavigate();
    const [Activo, setActivo] = useState({
        nombre: "",
        serial: "",
        modelo: "",
        marca: "",
        estado: "",
        color: "",
        descripcion: ""
    })

    const path = "http://localhost:8080/"

    const Enviardatos = async () => {
        try {
            const form = new FormData();
            form.append("nombre", Activo.nombre);
            form.append("serial", Activo.serial);
            form.append("modelo", Activo.modelo);
            form.append("marca", Activo.marca);
            form.append("estado", Activo.estado);
            form.append("color", Activo.color);
            form.append("descripcion", Activo.descripcion);

            const data = {
                method: "POST",
                body: form
            }

            const req = await fetch(path + "Guardarinventario", data);
            const res = await req.json();

            if (res?.error) {
                throw new Error(res.error);
            }

            navigate("/inventario_new");

        } catch (e) {
            console.log(e);
            alert(e);
        }

    }

    return (
        <div className="container">
            <div className="nombre-serial">
                <div className="nombre">
                    <h2>nombre</h2>
                    <input type="text" placeholder="nombre" onChange={(e) => setActivo({ ...Activo, nombre: e.target.value })} />
                </div>
                <div className="seria">
                    <h2>serial</h2>
                    <input type="text" placeholder="serial" onChange={(e) => setActivo({ ...Activo, serial: e.target.value })} />
                </div>
            </div>
            <div className="modelo-marca">
                <div className="modelo">
                    <h2>modelo</h2>
                    <input type="text" name="modelo" id="modelo" placeholder="modelo" onChange={(e) => setActivo({ ...Activo, modelo: e.target.value })} />
                </div>
                <div>
                    <h2>marca</h2>
                    <input type="text" name="marca" id="marca" placeholder="marca" onChange={(e) => setActivo({ ...Activo, marca: e.target.value })} />
                </div>
                <div>
                    <h2>Estado</h2>
                    <input type="text" name="estado" placeholder="bueno/malo" onChange={(e) => setActivo({ ...Activo, estado: e.target.value })} />
                </div>
            </div>
            <div className="color-descripcion">
                <div>
                    <h2>color</h2>
                    <input type="text" name="color" id="color" placeholder="color" onChange={(e) => setActivo({ ...Activo, color: e.target.value })} />
                </div>
                <div>
                    <h2>descripcion</h2>
                    <input type="text" name="descripcion" id="descripcion" placeholder="descripcion" onChange={(e) => setActivo({ ...Activo, descripcion: e.target.value })} />
                </div>
            </div>
            <input type="button" value="Guardar" onClick={async () => await Enviardatos()} />
        </div>
    );
}

export default CrearActivo;