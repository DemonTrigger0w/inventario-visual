import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style/CrearActivo.css";


function CrearActivo() {
    const navigate = useNavigate();
    const [Activo, setActivo] = useState({
        Nombre: "",
        Serial: "",
        Modelo: "",
        Marca: "",
        Estado: "",
        Color: "",
        Descripcion: ""
    })

    const path = "http://localhost:8080/"

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

            const token = localStorage.getItem("Token");
            const data = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: savedata
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
                    <input type="text" placeholder="nombre" onChange={(e) => setActivo({ ...Activo, Nombre: e.target.value })} />
                </div>
                <div className="seria">
                    <h2>serial</h2>
                    <input type="text" placeholder="serial" onChange={(e) => setActivo({ ...Activo, Serial: e.target.value })} />
                </div>
            </div>
            <div className="modelo-marca">
                <div className="modelo">
                    <h2>modelo</h2>
                    <input type="text" name="modelo" id="modelo" placeholder="modelo" onChange={(e) => setActivo({ ...Activo, Modelo: e.target.value })} />
                </div>
                <div>
                    <h2>marca</h2>
                    <input type="text" name="marca" id="marca" placeholder="marca" onChange={(e) => setActivo({ ...Activo, Marca: e.target.value })} />
                </div>
                <div>
                    <h2>Estado</h2>
                    <input type="text" name="estado" placeholder="bueno/malo" onChange={(e) => setActivo({ ...Activo, Estado: e.target.value })} />
                </div>
            </div>
            <div className="color-descripcion">
                <div>
                    <h2>color</h2>
                    <input type="text" name="color" id="color" placeholder="color" onChange={(e) => setActivo({ ...Activo, Color: e.target.value })} />
                </div>
                <div>
                    <h2>descripcion</h2>
                    <input type="text" name="descripcion" id="descripcion" placeholder="descripcion" onChange={(e) => setActivo({ ...Activo, Descripcion: e.target.value })} />
                </div>
            </div>
            <input type="button" value="Guardar" onClick={async () => await Enviardatos()} />
        </div>
    );
}

export default CrearActivo;