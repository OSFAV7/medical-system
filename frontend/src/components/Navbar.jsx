import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setError(null);
    setUsername('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {error && <div className="mb-2 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-2 py-1"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );

  return (
    <>
      <header className="bg-white/80 backdrop-blur sticky top-0 z-50 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="#" className="text-2xl font-bold text-emerald-600">
            MedicalSystem<span className="text-emerald-500">System</span>
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
          <button
            onClick={openModal}
            className="inline-block rounded-lg bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700 transition"
          >
            Ingresar
          </button>
        </div>
      </header>

      {modal}
    </>
  );
}



      