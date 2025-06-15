// src/components/Home.jsx
// React + Tailwind – módulo autocontenido para tu página de inicio
// Usa <Home /> dentro de tu router o un archivo .astro

import React from "react";
import Navbar from './Navbar'

export default function Home() {
  return (

    


    <div className="min-h-screen font-sans antialiased bg-gray-50 text-gray-800">
      
      <Navbar />      {/* pónla aquí arriba */}
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-400 py-24 text-white">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1551601651-74e9b7fcd77d?auto=format&fit=crop&w=1400&q=80')",
            backgroundSize: "cover",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Gestión médica sin complicaciones
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Agenda citas, controla historiales y administra farmacia desde un solo lugar
          </p>
          <a
            href="#features"
            className="inline-flex items-center justify-center rounded-lg bg-white/90 px-6 py-3 font-semibold text-emerald-700 shadow hover:bg-white transition"
          >
            Descubre más
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Qué ofrecemos</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Citas */}
            <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-emerald-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Citas fáciles</h3>
              <p className="text-sm text-gray-500">
                Reserva y actualiza citas al instante con recordatorios automáticos
              </p>
            </div>
            {/* Historial */}
            <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-emerald-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Historial clínico</h3>
              <p className="text-sm text-gray-500">
                Accede al historial completo del paciente y registra evoluciones sin papel
              </p>
            </div>
            {/* Farmacia */}
            <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-emerald-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h18v18H3V3z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Farmacia integrada</h3>
              <p className="text-sm text-gray-500">
                Control de inventario y recetas digitales sincronizadas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-gray-100 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Quiénes somos?</h2>
          <p className="text-gray-600 leading-relaxed">
            Somos un equipo apasionado por la salud y la tecnología. Nuestra misión es simplificar la gestión de consultorios, brindando herramientas digitales fáciles y seguras para profesionales y pacientes
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-600 text-white text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Listo para mejorar tu consultorio</h2>
        <p className="mb-8">Regístrate hoy y obtén un mes gratis</p>
        <a
          href="/signup"
          className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-emerald-700 shadow hover:bg-gray-100 transition"
        >
          Comenzar
        </a>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contacto</h3>
            <p className="text-sm mb-2">Correo: hola@mdentalmax.com</p>
            <p className="text-sm mb-2">Tel: +52 993 000 0000</p>
            <p className="text-sm">Cárdenas, Tabasco, México</p>
          </div>
          <div className="flex md:justify-end items-center space-x-4">
            <a href="#" aria-label="Twitter" className="hover:text-white transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557a9.93 9.93 0 01-2.828.775A4.93 4.93 0 0023.337 3a9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.373 4.482A13.965 13.965 0 011.671 3.149a4.912 4.912 0 001.522 6.573A4.92 4.92 0 01.96 9.149v.062a4.914 4.914 0 003.946 4.812 4.943 4.943 0 01-2.212.084 4.924 4.924 0 004.6 3.417A9.868 9.868 0 010 19.54a13.94 13.94 0 007.548 2.212c9.057 0 14.009-7.503 14.009-14.009 0-.213-.005-.425-.014-.636A10.025 10.025 0 0024 4.557z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="text-center text-xs mt-8">
          © 2025 Medical System. Todos los derechos reservados
        </div>
      </footer>
    </div>
  );
}
