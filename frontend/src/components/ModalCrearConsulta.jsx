// src/componentes/ModalCrearConsulta.jsx
import React, { useState } from 'react';

export default function ModalCrearConsulta({ paciente, onClose, onCreated }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.paciente = paciente.id;

    fetch('http://localhost/api/paciente/historiales/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(r => {
        if (!r.ok) throw new Error('Error al guardar');
        return r.json();
      })
      .then((nuevoHistorial) => {
        onCreated(nuevoHistorial); // para refrescar la vista si se desea
        onClose(); // cerrar el modal
      })
      .catch(err => {
        alert(err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
        <h3 className="text-xl font-bold text-emerald-700 mb-4">
          Nueva consulta para {paciente?.usuario_nombre}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input name="altura" type="number" placeholder="Altura (cm)" required className="border rounded px-3 py-2" />
            <input name="peso" type="number" placeholder="Peso (kg)" required className="border rounded px-3 py-2" />
          </div>
          <textarea name="motivo_consulta" placeholder="Motivo de consulta" required className="border rounded px-3 py-2 w-full" />
          <textarea name="estadoactual" placeholder="Estado del paciente" required className="border rounded px-3 py-2 w-full" />
          <textarea name="diagnostico" placeholder="Diagnóstico" required className="border rounded px-3 py-2 w-full" />
          <textarea name="tratamiento" placeholder="Tratamiento" className="border rounded px-3 py-2 w-full" />
          <textarea name="notas_medicas" placeholder="Notas médicas" className="border rounded px-3 py-2 w-full" />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
