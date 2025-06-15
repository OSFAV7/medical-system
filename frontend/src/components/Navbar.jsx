import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import logo from '../assets/dental-max.svg';

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('accessToken'));
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setError(null);
    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user_id');
    setLoggedIn(false);
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error('Credenciales inválidas');
      const data = await res.json();
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);

      // Decodifica el JWT para guardar el ID del usuario
      const payload = parseJwt(data.access);
      if (payload && payload.user_id) {
        localStorage.setItem('user_id', payload.user_id);
      } else if (payload && payload.id) {
        localStorage.setItem('user_id', payload.id);
      }
      setLoggedIn(true);
      closeModal();
      switch (data.tipo_usuario) {
        case 'paciente':
          navigate('/paciente');
          break;
        case 'doctor':
          navigate('/doctor');
          break;
        case 'farmacia':
          navigate('/farmacia');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const modal = isOpen && ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl p-7 w-80 animate-fade-in flex flex-col items-center relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
          onClick={closeModal}
          aria-label="Cerrar modal"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          src={logo}
          alt="Dental Max Logo"
          className="h-16 w-auto mb-4 drop-shadow-xl animate-pulse"
        />
        <h2 className="text-2xl font-bold mb-3 text-emerald-700 tracking-tight">Bienvenido</h2>
        <p className="mb-4 text-gray-500 text-sm text-center">
          Accede a tu cuenta
        </p>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-2 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition"
          >
            Ingresar
          </button>
          
                      <p className="mt-4 text-center text-sm text-gray-500">
              ¿No tienes cuenta?
              <button
                type="button"
                onClick={() => {
                  closeModal(); // tu función para cerrar el modal
                  navigate('/registro'); // usa useNavigate de react-router
                }}
                className="ml-1 text-emerald-600 hover:underline font-semibold"
              >
                Regístrate aquí
              </button>
            </p>

        </form>
      </div>
      {/* Animación fade-in si quieres, solo agrega esto en tu tailwind.config.js */}
      <style>
        {`
          @keyframes fade-in {
            0% { opacity: 0; transform: scale(0.98);}
            100% { opacity: 1; transform: scale(1);}
          }
          .animate-fade-in {
            animation: fade-in 0.3s cubic-bezier(.4,0,.2,1) both;
          }
        `}
      </style>
    </div>,
    document.body
  );

  return (
    <>
      <header className="bg-white/80 backdrop-blur sticky top-0 z-50 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="#" className="flex items-center space-x-2 text-2xl font-bold text-emerald-600">
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-12 object-contain"
            />
            <span>
              Dental<span className="text-emerald-500">Max</span>
            </span>
          </a>
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <a href="#features" className="hover:text-emerald-600 transition">
              Servicios
            </a>
            <a href="#about" className="hover:text-emerald-600 transition">
              Nosotros
            </a>
            <a href="#contact" className="hover:text-emerald-600 transition">
              Contacto
            </a>
          </nav>
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="inline-block rounded-lg bg-rose-100 border border-rose-200 px-5 py-2 text-rose-700 font-semibold hover:bg-rose-200 transition"
            >
              Cerrar sesión
            </button>
          ) : (
            <button
              onClick={openModal}
              className="inline-block rounded-lg bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700 transition"
            >
              Ingresar
            </button>
          )}
        </div>
      </header>
      {modal}
    </>
  );
}




      