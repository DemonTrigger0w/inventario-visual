import './App.css'
import { useState } from 'react';


function App() {
  const formData = () => {
    const [formdata, setformdata] = useState({
      estado: "",
      img: null,
      nombre: "",
      userId: 0
    })
  }
  
  const hatlechage = (e) => {
    const [name, value] = e.target;
    setformdata = ({...formData, [name]:value})
  }

  const hatlechageimg = (e) => {
    setformdata = ({...formData, img: e.target.file[B]})
  }

  async function subirimange() {

    try {
      const data = {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" }
      };

      const EnviarImagen = await fetch("http://localhost:8080/EnviarImagen", data);
      const response = await EnviarImagen.json();
      if (response?.error) {
        throw new Error(response.error);
      }
      alert("El estudiante se creo correctamente");
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  return (
    <div className='inventario'>
      <form>
          <h3>Subir bien</h3>
          <label htmlFor="id">id de usuario</label>
          <input type="text" name="userId" onChange={hatlechage} />
          <label htmlFor="nombre">Nombre del activo</label>
          <input type="text" name="nombre"  placeholder='Ej. Silla' onChange={hatlechage}/>
          <label htmlFor="imagen">Imagen</label>
          <input type="file" name="img" onChange={hatlechageimg}/>
          <label htmlFor="estado">Esta operativo?</label>
          <input type="checkbox" name="estado" onChange={hatlechage}/>
          <input type="button" value="Subir" onClick={subirimange} />
        </form>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Nombre</td>
            <td>Imagen</td>
            <td>Estado</td>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  )
}

export default App
