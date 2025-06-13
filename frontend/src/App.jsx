// src/App.jsx
import Navbar from './components/Navbar'
import PacienteDashboard  from './paginas/PacienteDashboard'
import DoctorDashboard    from './paginas/DoctorDashboard'
import FarmaciaDashboard  from './paginas/FarmaciaDashboard'
import Home from './components/home'

import { Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />      {/* pónla aquí arriba */}

      <main className="flex-grow flex items-center justify-center">
        <Routes>
          
          <Route
            path="/"
            element={
              
            <Home />
            }
          />
          {/* Rutas para cada rol */}
          <Route path="/paciente" element={<PacienteDashboard />} />
          <Route path="/doctor"   element={<DoctorDashboard />} />
          <Route path="/farmacia" element={<FarmaciaDashboard />} />
        </Routes>
      </main>
    </div>
  )
}
