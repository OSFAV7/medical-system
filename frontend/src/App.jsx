// src/App.jsx
import PacienteDashboard  from './paginas/PacienteDashboard'
import DoctorDashboard    from './paginas/DoctorDashboard'
import FarmaciaDashboard  from './paginas/FarmaciaDashboard'
import RegistroUsuario from './components/RegistroUsuario'
import Home from './components/home'
import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<RegistroUsuario />} />
          <Route path="/paciente" element={<PacienteDashboard />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/farmacia" element={<FarmaciaDashboard />} />
        </Routes>
      </main>
    </div>
  )
}
