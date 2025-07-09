import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [items, setItems] = useState([]);
  const [inventario, setInventario] = useState({
    nombre: '',
    estado: '',
    activo: true,
    img: null
  });

  useEffect(() => {

    obtenerTodosLosActivos();

  }, []);

  const obtenerTodosLosActivos = async () => {
    try {

      const req = await fetch('http://localhost:8080/imagen');
      const res = await req.json();

      if (res?.error) {
        throw new Error(res.error);
      }

      setItems(res.reverse());

    } catch(e) {
      console.log(e);
      alert(e);
    }
  }

  const crearItem = async () => {
    try {

      const form = new FormData();
      form.append('nombre', inventario.nombre);
      form.append('estado', inventario.estado);
      form.append('activo', inventario.activo);
      form.append('img', inventario.img);

      const data = {
        method: 'POST',
        body: form
      };

      const req = await fetch("http://localhost:8080/imagen", data);
      const res = await req.json();

      if (res?.error) {
        throw new Error(res.error);
      }

      alert('Se ha creado el item en el inventario');
      await obtenerTodosLosActivos();

    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  return (
    <div className='inventario'>
      <form>
          <h3>Subir bien</h3>
          <label htmlFor="nombre">Nombre del activo</label>
          <input
            onChange={ (e) => setInventario({ ...inventario, nombre: e.target.value }) }
            type="text"
            name='nombre'
            placeholder='Ej. Silla' />
          <label htmlFor="estado">Estado</label>
          <input
            onChange={ (e) => setInventario({ ...inventario, estado: e.target.value})}
            type="text"
            placeholder="Ej. Buenas condiciones, como nuevo" />
          <label htmlFor="imagen">Imagen</label>
          <input
            onChange={ (e) => setInventario({ ...inventario, img: e.target.files[0] }) }
            type="file"
            name='img' />
          <label htmlFor="estado">Esta operativo?</label>
          <input
            onChange={ (e) => setInventario({ ...inventario, activo: e.target.checked }) }
            type="checkbox"
            defaultChecked={ inventario.activo } name="estado" />
          <input type="button" value="Subir" onClick={ async () => await crearItem() } />
        </form>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Nombre</td>
            <td>Estado</td>
            <td>Activo</td>
            <td>Imagen</td>
          </tr>
        </thead>
        <tbody>
          {
            items.map(item => (
              <tr>
                <td>{ item.ID }</td>
                <td>{ item.Nombre }</td>
                <td>{ item.Estado }</td>
                <td style={{
                  fontWeight: 'bolder',
                  color: item.Activo ? 'green' : 'red' }}>{ item.Activo ? 'OPERATIVO' : 'INACTIVO' }</td>
                <td><img src={ "http://localhost:8080" + item.Ruta } alt="" height={80} /></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
