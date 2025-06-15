import { useEffect, useState } from 'react';

export default function VerCitas() {
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState(null);
  const [cancelando, setCancelando] = useState(null); // id de la cita en proceso
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    async function fetchCitas() {
      setError(null);
      try {
        // 1. Extraer id paciente usando JWT
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload?.user_id;

        // 2. Obtener pacienteId real
        const resPaciente = await fetch(`/api/paciente/pacientes/?usuario=${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const pacientes = await resPaciente.json();
        const pacienteId = pacientes[0]?.id;

        // 3. Pedir citas donde el paciente sea el logueado
        const resCitas = await fetch(`/api/doctor/citas/?paciente=${pacienteId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const citasData = await resCitas.json();
        setCitas(Array.isArray(citasData) ? citasData : []);
      } catch (e) {
        setError('No se pudieron cargar tus citas');
      }
    }
    fetchCitas();
  }, [token, cancelando]); // también se actualiza al cancelar

  // --- Cancelar cita ---
  async function cancelarCita(id) {
    if (!window.confirm('¿Seguro que quieres cancelar esta cita?')) return;
    setCancelando(id);
    setError(null);
    try {
      const res = await fetch(`/api/doctor/citas/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ estado: 'cancelada' })
      });
      if (!res.ok) throw new Error('No se pudo cancelar');
      // Quita la cita o actualiza estado localmente
      setCitas(citas =>
        citas.map(c => c.id === id ? { ...c, estado: 'cancelada' } : c)
      );
    } catch (e) {
      setError('No se pudo cancelar la cita');
    } finally {
      setCancelando(null);
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold text-emerald-700 mb-4">Tus citas</h2>
      {error && <div className="text-red-500 text-center mb-2">{error}</div>}
      <div className="space-y-3">
        {citas.length === 0 ? (
          <div className="text-gray-500 text-center">No tienes citas agendadas.</div>
        ) : (
          citas.map(cita => (
            <div key={cita.id} className="p-4 rounded-lg shadow border flex flex-col md:flex-row md:justify-between md:items-center bg-gray-50">
              <div>
                <div className="font-semibold">{cita.fecha_hora ? new Date(cita.fecha_hora).toLocaleString() : 'Sin fecha'}</div>
                <div className="text-sm text-gray-600">
                  Doctor: {cita.doctor_nombre || cita.doctor || 'Sin doctor'}
                </div>
                <div className="text-sm text-gray-600">Motivo: {cita.motivo}</div>
                {cita.notas && <div className="text-xs text-gray-500">Notas: {cita.notas}</div>}
              </div>
              <div className="flex flex-col items-end mt-2 md:mt-0 md:ml-8">
                <span className={
                  `inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2
                  ${cita.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-700' :
                    cita.estado === 'atendida' ? 'bg-green-100 text-green-700' :
                    cita.estado === 'cancelada' ? 'bg-red-100 text-red-700' :
                    'bg-gray-200 text-gray-700'}`
                }>
                  {cita.estado}
                </span>
                {/* Botón cancelar SOLO si la cita está pendiente */}
                {cita.estado === 'pendiente' && (
                  <button
                    onClick={() => cancelarCita(cita.id)}
                    disabled={cancelando === cita.id}
                    className={`px-4 py-1 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 font-medium text-sm shadow border border-rose-200 transition
                      ${cancelando === cita.id ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    {cancelando === cita.id ? 'Cancelando...' : 'Cancelar'}
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

