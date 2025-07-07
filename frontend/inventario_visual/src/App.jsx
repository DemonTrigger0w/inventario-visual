import './App.css'

function App() {

  return (
    <div className='inventario'>
      <form>
          <h3>Subir bien</h3>
          <label htmlFor="nombre">Nombre del activo</label>
          <input type="text" name='nombre' placeholder='Ej. Silla' />
          <label htmlFor="imagen">Imagen</label>
          <input type="file" name='imagen' />
          <label htmlFor="estado">Esta operativo?</label>
          <input type="checkbox" name="estado" />
          <input type="button" value="Subir" />
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
