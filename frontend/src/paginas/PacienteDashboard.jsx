import NavbarSesion from '../components/Navbar-sesion.jsx';
import AgendarCita from '../components/AgendarCita';
import VerCitas from '../components/VerCitas';

// Si tienes info del usuario, puedes extraer el nombre del JWT (opcional)
// import jwtDecode from "jwt-decode";
// const token = localStorage.getItem("accessToken");
// const nombre = token ? jwtDecode(token).username : "Paciente";

export default function PacienteDashboard() {
  // (Opcional) Si tienes el nombre del usuario, ponlo aquí:
  // const nombre = "Paciente"; // O saca del JWT

  return (
    <div className="bg-gradient-to-tr from-emerald-50 via-white to-emerald-100 min-h-screen">
      {/* Navbar de sesión arriba */}
      <NavbarSesion />

      <div className="max-w-6xl mx-auto mt-10">
        {/* Tarjeta de bienvenida */}
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-700 mb-2 tracking-tight drop-shadow">
            ¡Bienvenido(a) {/*{nombre}*/} al portal de Pacientes!
          </h1>
          <p className="text-gray-600 text-center max-w-xl">
            Desde aquí puedes agendar nuevas citas, consultar tu historial y mantenerte al tanto de tus próximas consultas en <span className="font-bold text-emerald-500">DentalMax</span>.
          </p>
        </div>

        {/* Grid de funcionalidades */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-7 border border-emerald-100 flex flex-col">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-700 flex items-center gap-2">
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Agendar cita
            </h2>
            <AgendarCita />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-7 border border-emerald-100 flex flex-col">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-700 flex items-center gap-2">
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v10l7-5-7-5z"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Mis citas
            </h2>
            <VerCitas />
          </div>
        </div>
      </div>
    </div>
  );
}
