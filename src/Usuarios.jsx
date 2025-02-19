import { use, useEffect, useState } from "react";
import "./App.css";

function Usuarios({ recargar }) {
  const [usuarios, setUsuarios] = useState([]);

  async function obtenerUsuarios() {
    const peticion = await fetch("http://localhost:3000/usuarios", {
      credentials: "include",
    });
    if (peticion.status === 200) {
      const respuesta = await peticion.json();
      setUsuarios(respuesta);
    }
  }

  async function eliminarUsuario(id) {
    const peticion = await fetch("http://localhost:3000/usuarios?id=" + id, {
      credentials: "include",
      method: "DELETE",
    });
    if (peticion.status === 200) {
      alert("Usuario eliminado");
      obtenerUsuarios();
    }
  }

  useEffect(() => {
    obtenerUsuarios();
  }, [recargar]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Usuario</th>
            <th>Password</th>
            <th>Modificar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.usuario}</td>
              <td>{usuario.password}</td>
              <td>
                <button onClick={() => eliminarUsuario(usuario.id)}> X </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Usuarios;
