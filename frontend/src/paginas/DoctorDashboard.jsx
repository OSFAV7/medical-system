// DoctorDashboard.jsx
import { useState, useEffect, useRef } from 'react'

export default function DoctorDashboard () {
  /* ----------------------------- Zona de estado ---------------------------- */
  const [query, setQuery] = useState('')
  const [patients, setPatients] = useState([])
  const [appointments, setAppointments] = useState([])
  const [time, setTime] = useState(() => new Date().toLocaleTimeString())
  const timerRef = useRef(null)

  /* ----------------------------- Peticiones API ---------------------------- */
  // 1) Buscar pacientes cuando cambia `query`
  useEffect(() => {
    const controller = new AbortController()
    if (query.trim() !== '') {
      fetch(`/api/pacientes?search=${encodeURIComponent(query)}`, {
        signal: controller.signal
      })
        .then(r => r.json())
        .then(setPatients)
        .catch(() => {}) // silencioso
    } else {
      setPatients([])
    }
    return () => controller.abort()
  }, [query])

  // 2) Cargar citas pendientes al montar el componente
  useEffect(() => {
    fetch('/api/citas?status=pendiente')
      .then(r => r.json())
      .then(setAppointments)
  }, [])

  // 3) Reloj en vivo
  useEffect(() => {
    timerRef.current = setInterval(
      () => setTime(new Date().toLocaleTimeString()),
      1000
    )
    return () => clearInterval(timerRef.current)
  }, [])

  /* ----------------------------- Renderizado ------------------------------ */
  return (
    <div className='min-h-screen grid md:grid-cols-[1fr_350px]'>
      {/* ========================== Columna principal ========================== */}
      <div className='p-6 space-y-6'>
        {/* Hora en grande */}
        <div className='text-5xl font-bold text-emerald-600'>{time}</div>

        {/* Buscador */}
        <div>
          <input
            type='search'
            placeholder='Buscar paciente…'
            value={query}
            onChange={e => setQuery(e.target.value)}
            className='w-full max-w-md rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500'
          />
        </div>

        {/* Lista de pacientes */}
        <div className='space-y-4'>
          {patients.length === 0 && query
            ? <p className='text-gray-500'>Sin coincidencias…</p>
            : patients.map(p => (
              <div
                key={p.id}
                className='border rounded p-4 flex justify-between items-center hover:bg-gray-50'
              >
                <div>
                  <p className='font-medium'>{p.nombre}</p>
                  <p className='text-sm text-gray-500'>{p.email}</p>
                </div>
                <button className='text-emerald-600 hover:underline'>
                  Ver ficha
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* ======================= Panel de citas pendientes ====================== */}
      <aside className='border-l p-6 bg-gray-50 space-y-4'>
        <h2 className='text-xl font-semibold mb-2'>Citas pendientes</h2>
        {appointments.length === 0
          ? <p className='text-gray-500'>No hay citas pendientes</p>
          : appointments.map(c => (
              <div
                key={c.id}
                className='bg-white border rounded p-4 shadow-sm space-y-1'
              >
                <p className='font-medium'>{c.paciente}</p>
                <p className='text-sm text-gray-500'>
                  {new Date(c.fecha).toLocaleString()}
                </p>
              </div>
            ))}
      </aside>
    </div>
  )
}
