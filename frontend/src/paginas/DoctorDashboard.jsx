import { useState, useEffect, useRef } from 'react';

export default function DoctorDashboard() {
  const [query, setQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [history, setHistory] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());
  const timerRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    if (query.trim() !== '') {
      fetch(`/api/pacientes?search=${encodeURIComponent(query)}`, {
        signal: controller.signal
      })
        .then(r => r.json())
        .then(setPatients)
        .catch(() => {});
    } else {
      setPatients([]);
    }
    return () => controller.abort();
  }, [query]);

  useEffect(() => {
    fetch('/api/citas?status=pendiente')
      .then(r => r.json())
      .then(setAppointments);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(
      () => setTime(new Date().toLocaleTimeString()),
      1000
    );
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      fetch(`/api/pacientes/${selectedPatient.id}/historial`)
        .then(r => r.json())
        .then(setHistory);
    }
  }, [selectedPatient]);

  useEffect(() => {
    function handler(e) {
      if (e.key === 'Escape') setDrawerOpen(false);
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 grid md:grid-cols-[1fr_1fr] relative">
      {/* Botón para abrir el drawer, se oculta si el drawer está abierto */}
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

      {/* Drawer lateral izquierdo */}
      <div
        className={`
          fixed top-0 left-0 z-40 h-screen p-6 overflow-y-auto transition-transform
          bg-white w-80 shadow-lg
          ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}
          duration-300 ease-in-out
        `}
        tabIndex={-1}
        aria-labelledby="drawer-label"
      >
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
        {/* Hora */}
        <div className="text-3xl font-bold text-emerald-600 text-center select-none mb-2">
          {time}
        </div>
        <div className="text-gray-500 text-center mb-6">Hora actual</div>
        {/* Citas pendientes */}
        <h2 className="text-lg font-semibold mb-2 text-emerald-700">Citas pendientes</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-500">No hay citas pendientes</p>
        ) : (
          appointments.map(appt => (
            <div
              key={appt.id}
              className="bg-emerald-50 border rounded p-3 mb-3 shadow-sm"
            >
              <div className="font-medium">{appt.paciente}</div>
              <div className="text-sm text-gray-500">
                {new Date(appt.fecha).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Overlay para cerrar el drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}
      <div className="min-h-screen w-screen bg-gray-100 grid md:grid-cols-[1fr_1fr] relative">
          {/* Contenido principal */}
          <div className="pl-20 p-6 flex flex-col h-full md:col-span-1">
            {/* Barra de búsqueda */}
            <div>
              <input
                type="search"
                placeholder="Buscar paciente…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full max-w-md rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-8"
              />
            </div>
            {/* Resultados */}
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
                      <p className="font-medium">{p.nombre}</p>
                      <p className="text-sm text-gray-500">{p.email}</p>
                    </div>
                    <span className="text-emerald-600 hover:underline">Ver historial</span>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* Historial clínico */}
              <aside className="pl-6 bg-white shadow-inner h-full overflow-y-auto md:col-span-1 py-8">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Historial clínico</h2>
            {selectedPatient ? (
              history.length === 0 ? (
                <p className="text-gray-500">Sin registros para este paciente</p>
              ) : (
                <div className="space-y-4">
                  {history.map((h, idx) => (
                    <div key={idx} className="border-b pb-2 mb-2">
                      <div className="font-medium">{h.titulo || 'Consulta'}</div>
                      <div className="text-gray-700 text-sm whitespace-pre-line">{h.detalles}</div>
                      <div className="text-xs text-gray-400 mt-1">{h.fecha ? new Date(h.fecha).toLocaleString() : ''}</div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <p className="text-gray-400 italic mt-10">Selecciona un paciente para ver su historial clínico.</p>
            )}
              </aside>
      </div>   
    </div>
  );
}
