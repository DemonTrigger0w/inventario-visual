import { useState } from "react";
import "./style/sistema.css";


function CrearActivo() {
    const [data, setdata] = useState([{
        nombre: "",
        serial: "",
        modelo: "",
        marca: "",
        estado: "",
        color: "",
        descripcion: ""
    }
    ])

    let path = "http://localhost:8080/"

    const Enviardatos = async () => {
        try {
            const form = new FormData();
            form.append("nombre", data.nombre);
            form.append("serial", data.serial);
            form.append("modelo", data.modelo);
            form.append("marca", data.marca);
            form.append("estado", data.estado);
            form.append("color", data.color);
            form.append("descripcion", data.descripcion);

            const data = {
                method: "POST",
                body: form
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
        <div className="container">
            <div className="nombre-serial">
                <div className="nombre">
                    <h2>serial 1</h2>
                    <input type="text" placeholder="nombre" onChange={(e) => setdata({ ...data, serial1: e.target.value })} />
                </div>
                <div className="seria">
                    <h2>serial 2</h2>
                    <input type="text" placeholder="serial" onChange={(e) => setdata({ ...data, serial2: e.target.value })} />
                </div>
            </div>
            <div className="modelo-marca">
                <div className="modelo">
                    <h2>modelo</h2>
                    <input type="text" name="modelo" id="modelo" placeholder="modelo" onChange={(e) => setdata({ ...data, modelo: e.target.value })} />
                </div>
                <div>
                    <h2>marca</h2>
                    <input type="text" name="marca" id="marca" placeholder="marca" onChange={(e) => setdata({ ...data, marca: e.target.value })} />
                </div>
                <div>
                    <h2>Estado</h2>
                    <input type="text" name="estado" placeholder="bueno/malo" onChange={(e) => setdata({ ...data, estado: e.target.value })} />
                </div>
            </div>
            <div className="color-descripcion">
                <div>
                    <h2>color</h2>
                    <input type="text" name="color" id="color" placeholder="color" onChange={(e) => setdata({ ...data, color: e.target.value })} />
                </div>
                <div>
                    <h2>descripcion</h2>
                    <input type="text" name="descripcion" id="descripcion" placeholder="descripcion" onChange={(e) => setdata({ ...data, descripcion: e.target.value })} />
                </div>
            </div>
            <input type="button" value="Guardar" onClick={async () => await Enviardatos()} />
        </div>
    );
}

export default CrearActivo;