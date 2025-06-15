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
 
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('accessToken'));
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('accessToken'));
  }, []);



  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user_id');
    setLoggedIn(false);
    navigate('/');
  };

 

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
            
          </a>
         
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
    
    </>
  );
}




      