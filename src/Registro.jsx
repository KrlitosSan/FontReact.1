import { use, useEffect, useState } from "react";
import "./App.css";

function Registrar({ recargarAhora }) {
  const [usuarioRegistro, setUsuarioRegistro] = useState("");
  const [passwordRegistro, setPasswordRegistro] = useState("");

  async function Registrar() {
    const peticion = await fetch(
      "https://backexpress-production.up.railway.app/registro?usuario=" +
        usuarioRegistro +
        "&password=" +
        passwordRegistro,
      { credentials: "include" }
    );
    if (peticion.status === 200) {
      alert("Usuario registrado");
      recargarAhora();
    } else {
      alert("Usuario no registrado");
    }
  }

  useEffect(() => {}, []);

  return (
    <>
      <h1>Registro</h1>
      <input
        type="text"
        name="usuario"
        placeholder="Usuario"
        id="usuario"
        value={usuarioRegistro}
        onChange={(e) => setUsuarioRegistro(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        id="password"
        value={passwordRegistro}
        onChange={(e) => setPasswordRegistro(e.target.value)}
      />
      <button onClick={Registrar}>Crear</button>
    </>
  );
}

export default Registrar;
