import { useEffect, useState } from 'react';

function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export default function AgendarCita() {
  const [doctores, setDoctores] = useState([]);
  const [doctor, setDoctor] = useState('');
  const [fechaHora, setFechaHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [notas, setNotas] = useState('');
  const [estado, setEstado] = useState('pendiente');
  const [error, setError] = useState(null);
  const [ok, setOk] = useState(false);

  const [pacienteId, setPacienteId] = useState(null);
  const token = localStorage.getItem('accessToken');

  // Obtener el id real del paciente usando el JWT
  useEffect(() => {
    if (!token) return;
    const payload = parseJwt(token);
    const userId = payload?.user_id;
    if (!userId) return;

    fetch(`/api/paciente/pacientes/?usuario=${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setPacienteId(data[0].id);
        } else {
          setError('No se encontró tu perfil de paciente');
        }
      })
      .catch(() => setError('Error consultando el perfil'));
  }, [token]);

  // Obtener lista de doctores (puedes ajustar endpoint según tu API)
  useEffect(() => {
    if (!token) return;
    fetch('/api/doctor/doctores/', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setDoctores(data))
      .catch(() => setDoctores([]));
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setOk(false);

    if (!doctor || !fechaHora || !motivo || !pacienteId) {
      setError('Faltan campos obligatorios');
      return;
    }

    try {
      const res = await fetch('/api/doctor/citas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          doctor: doctor,
          paciente: pacienteId,
          fecha_hora: new Date(fechaHora).toISOString(),
          motivo: motivo,
          estado: estado,
          notas: notas
        })
      });
      if (!res.ok) throw new Error('Error al solicitar la cita');
      setOk(true);
      setDoctor('');
      setFechaHora('');
      setMotivo('');
      setNotas('');
    } catch {
      setError('Error al solicitar la cita');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 mt-8">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">Solicitar cita</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Doctor */}
        <div>
          <label className="block font-medium mb-1">Doctor *</label>
          <select
            value={doctor}
            onChange={e => setDoctor(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Selecciona doctor</option>
            {doctores.map(d => (
              <option key={d.id} value={d.id}>
                {d.usuario_nombre || d.nombre || `Doctor #${d.id}`}
              </option>
            ))}
          </select>
        </div>
        {/* Fecha y hora */}
        <div>
          <label className="block font-medium mb-1">Fecha y hora *</label>
          <input
            type="datetime-local"
            value={fechaHora}
            onChange={e => setFechaHora(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        {/* Motivo */}
        <div>
          <label className="block font-medium mb-1">Motivo *</label>
          <textarea
            value={motivo}
            onChange={e => setMotivo(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        {/* Notas */}
        <div>
          <label className="block font-medium mb-1">Notas (opcional)</label>
          <input
            type="text"
            value={notas}
            onChange={e => setNotas(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        {/* Botón */}
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition"
          disabled={!pacienteId}
        >
          Solicitar cita
        </button>
        {/* Mensajes */}
        {ok && (
          <div className="text-center text-green-600 mt-2 font-semibold">
            Cita solicitada con éxito
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 mt-2">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
