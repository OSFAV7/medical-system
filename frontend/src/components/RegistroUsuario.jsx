import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistroUsuario() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("paciente");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setExito(false);

    try {
      // 1. Crear usuario (ajusta el endpoint si lo tienes, aquí un ejemplo típico)
      const resUser = await fetch("http://localhost/api/farmacia/registro/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, tipo_usuario: tipoUsuario, }),
      });
      if (!resUser.ok) throw new Error("Error creando usuario.");
      const dataUser = await resUser.json();

      if (!resUser.ok) throw new Error("Error creando perfil.");
      setExito(true);

      // 3. Redirigir tras 1.5s
      setTimeout(() => navigate("/"), 1800);

    } catch (err) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-5 text-emerald-700 text-center">Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none"
            required
            minLength={4}
            maxLength={30}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none"
            required
            minLength={8}
          />
          <span className="text-xs text-gray-400">Mínimo 8 caracteres</span>
        </div>
        <div>
          <label className="block font-medium mb-1">Tipo de usuario</label>
          <select
            value={tipoUsuario}
            onChange={e => setTipoUsuario(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="paciente">Paciente</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded transition"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {exito && <div className="text-green-600 text-center">Registro exitoso! Redirigiendo...</div>}
      </form>
    </div>
  );
}
