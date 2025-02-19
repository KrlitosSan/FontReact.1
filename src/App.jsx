import { use, useEffect, useState } from "react";
import "./App.css";
import Conversor from "./Conversor";
import Regisro from "./Registro";
import Usuarios from "./Usuarios";
import Registrar from "./Registro";

function App() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [logueado, setLogueado] = useState(false);
  const [recargar, setRecargar] = useState(false);

  function recargarAhora() {
    setRecargar(!recargar);
  }

  async function Ingresar() {
    const peticion = await fetch(
      "http://localhost:3000/login?usuario=" +
        usuario +
        "&password=" +
        password,
      { credentials: "include" }
    );
    if (peticion.status === 200) {
      setLogueado(true);
      alert("Bienvenid@ " + usuario);
    } else {
      alert("Usuario o password incorrectos");
    }
  }

  async function validar() {
    const peticion = await fetch("http://localhost:3000/validar", {
      credentials: "include",
    });
    if (peticion.status === 200) {
      setLogueado(true);
    }
  }

  useEffect(() => {
    validar();
  }, []);

  if (logueado) {
    return (
      <>
        <Registrar recargarAhora={recargarAhora} />
        <Conversor />
        <Usuarios recargar={recargar} />
      </>
    );
  }

  return (
    <>
      <h1>Inicio de Sesion</h1>
      <input
        type="text"
        name="usuario"
        placeholder="Usuario"
        id="usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={Ingresar}>Ingresar</button>
    </>
  );
}

export default App;
