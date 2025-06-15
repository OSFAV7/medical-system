import { useState, useEffect, useRef } from 'react';
import ModalCrearConsulta from '../components/ModalCrearConsulta';
import Navbar from '../components/Navbar-sesion'

export default function DoctorDashboard() {
  const [query, setQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());
  const [showModal, setShowModal] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem('accessToken');

    if (query.trim() === '') {
      setPatients([]);
      return;
    }

    fetch(`http://localhost/api/paciente/pacientes/`, {
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(r => {
        if (!r.ok) throw new Error('No autorizado');
        return r.json();
      })
      .then(data => {
        const filtered = data.filter(p =>
          `${p.usuario_nombre} ${p.usuario_apellido || ''}`.toLowerCase().includes(query.toLowerCase())
        );
        setPatients(filtered);
      })
      .catch(() => setPatients([]));

    return () => controller.abort();
  }, [query]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    fetch('http://localhost/api/doctor/citas/?estado=pendiente', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(r => {
        if (!r.ok) throw new Error('No autorizado');
        return r.json();
      })
      .then(data => {
        setAppointments(Array.isArray(data) ? data : []);
      })
      .catch(() => setAppointments([]));
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
  
     <div>
    <Navbar />  {/* 👈 Aquí se inserta el navbar */}
    <div className="min-h-screen bg-gray-100 pt-2 grid md:grid-cols-[1fr_1fr] relative">

      {!drawerOpen && (
        <button
          onClick={() => setDrawerOpen(true)}
          className="fixed top-4 left-4 z-50 bg-emerald-600 hover:bg-emerald-700 text-white rounded p-2 shadow-md"
          aria-label="Mostrar información"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <rect x="4" y="7" width="16" height="2" rx="1" fill="currentColor" />
            <rect x="4" y="11" width="16" height="2" rx="1" fill="currentColor" />
            <rect x="4" y="15" width="16" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
      )}

      <div className={`fixed top-0 left-0 z-40 h-screen p-6 overflow-y-auto transition-transform bg-white w-80 shadow-lg ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} duration-300 ease-in-out`}>
        <div className="flex items-center justify-between mb-6">
          
          <h5 id="drawer-label" className="inline-flex items-center text-lg font-semibold text-emerald-600">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/></svg>
            Info
          </h5>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
            aria-label="Cerrar menú"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="text-3xl font-bold text-emerald-600 text-center select-none mb-2">{time}</div>
        <div className="text-gray-500 text-center mb-6">Hora actual</div>

        <h2 className="text-lg font-semibold mb-2 text-emerald-700">Citas pendientes</h2>
        {appointments.map((appt) => (
  <div
    key={appt.id}
    className="bg-emerald-50 border rounded p-3 mb-3 shadow-sm"
  >
    <div className="font-medium">
      Paciente: {appt.paciente_nombre}
    </div>
    <div className="text-sm text-gray-500">
      Fecha:{" "}
      {appt.fecha_hora && !isNaN(Date.parse(appt.fecha_hora))
        ? new Date(appt.fecha_hora).toLocaleString()
        : "Sin fecha"}
    </div>
    <div className="text-sm text-gray-600">Motivo: {appt.motivo || "N/A"}</div>
    <div className="text-sm text-gray-600">Notas: {appt.notas || "N/A"}</div>

    {/* BOTÓN NUEVO */}
    <button
      onClick={() => {
        if (window.confirm("Si ha terminado esta consulta, presiona OK para actualizar su estado.")) {
          fetch(`http://localhost/api/doctor/citas/${appt.id}/`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estado: 'completada' })
          })
            .then((r) => {
              if (!r.ok) throw new Error('Error al actualizar');
              return r.json();
            })
            .then(() => {
              // Filtra la cita ya actualizada de la lista
              setAppointments(prev => prev.filter(c => c.id !== appt.id));
            })
            .catch(err => alert(err.message));
        }
      }}
      className="mt-2 text-sm bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700"
    >
      Actualizar consulta
    </button>
  </div>
))
}
      </div>

      {drawerOpen && <div className="fixed inset-0 bg-black/30 z-30" onClick={() => setDrawerOpen(false)}></div>}

      <div className="min-h-screen w-screen bg-gray-100 grid md:grid-cols-[1fr_1fr] relative">
        <div className="pl-40 p-6 flex flex-col h-full md:col-span-1">
          <div>
            <input
              type="search"
              placeholder="Buscar paciente…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full max-w-md rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-8"
            />
          </div>
          <div className="space-y-3">
            {patients.length === 0 && query ? (
              <p className="text-gray-500">Sin coincidencias…</p>
            ) : (
              patients.map(p => (
                <div
                  key={p.id}
                  className={`border rounded p-4 flex justify-between items-center hover:bg-emerald-50 cursor-pointer ${selectedPatient && selectedPatient.id === p.id ? 'bg-emerald-100' : ''}`}
                  onClick={() => setSelectedPatient(p)}
                >
                  <div>
                    <p className="font-medium">{p.usuario_nombre || p.full_name || p.username || p.email || p.id || "Sin nombre"}</p>
                    <p className="text-sm text-gray-500">{p.usuario_email}</p>
                  </div>
                  <span className="text-emerald-600 hover:underline">Ver historial</span>
                </div>
              ))
            )}
          </div>
        </div>

        <aside className="pl-6 bg-white shadow-inner h-full overflow-y-auto md:col-span-1 py-8">
          <div className="flex justify-between items-center pr-10 mb-4">
            <h2 className="text-2xl font-semibold text-emerald-600">Historial clínico</h2>
            {selectedPatient && (
              <button
                onClick={() => setShowModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded shadow"
              >
                Crear consulta
              </button>
            )}
          </div>

          {selectedPatient ? (
            selectedPatient.historiales.length === 0 ? (
              <p className="text-gray-500">Sin registros para este paciente</p>
            ) : (
              <div className="space-y-4">
                {selectedPatient.historiales.map((h) => (
                  <div key={h.id} className="border-b pb-2 mb-2">
                    <div className="font-medium">{h.fecha_consulta ? new Date(h.fecha_consulta).toLocaleString() : ''}</div>
                    <div className="text-gray-700 text-sm whitespace-pre-line">
                      <p>Altura: {h.altura}</p>
                      <p>Peso: {h.peso}</p>
                      <p>Motivo de la consulta: {h.motivo_consulta}</p>
                      <p>Estado del paciente del consulta: {h.estadoactual}</p>
                      <p>Diagnostico en consulta: {h.diagnostico}</p>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      <p>Tratamiento: {h.tratamiento}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      <p>Notas Medicas: {h.notas_medicas}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <p className="text-gray-400 italic mt-10">Selecciona un paciente para ver su historial clínico.</p>
          )}
        </aside>
      </div>

      {showModal && selectedPatient && (
        <ModalCrearConsulta
          paciente={selectedPatient}
          onClose={() => setShowModal(false)}
          onCreated={(nuevoHistorial) => {
            setSelectedPatient(prev => ({
              ...prev,
              historiales: [nuevoHistorial, ...(prev.historiales || [])]
            }));
          }}
        />
      )}
    </div>
    </div>
  );
}
