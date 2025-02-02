import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderQuiz } from "../../components/HeaderQuiz";
import { MobileNav } from "../../components/NavBar";
import { toast } from "react-toastify";

import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      const response = await axios.post(`${API_URL}/users/registro`, formData);
      toast.success("Registro exitoso. Redirigiendo al inicio de sesión...", {
        position: "top-center",
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error al registrar usuario.";
      toast.error(errorMessage, { position: "top-center" });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-white to-purple-100">
      <div className="lg:hidden">
        <MobileNav />
      </div>
      <div className="hidden lg:block">
        <HeaderQuiz
          navClass={
            "text-2xl fixed top-0 z-50 left-0 font-extrabold text-center bg-violet text-purple-900 uppercase p-3 flex justify-between items-center w-full"
          }
          showHomeButton={true}
          classNameChildrenButton={
            "hidden sm:block group text-violet-900 font-medium py-2 px-4 rounded-lg transition duration-200 text-sm sm:text-base sm:py-2 md:py-2 md:px-4"
          }
          handleLinkChildrenButton={"/"}
          showLoginButton={false}
          />
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl bg-gradient-to-tl from-violet-50 to-purple-1000">
          <h2 className="text-2xl text-violet-950 font-extralight text-center mb-6">
            Crear Cuenta
          </h2>
          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
          )}
          {success && (
            <div className="mb-4 text-green-500 text-sm text-center">{success}</div>
          )}
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nombre" className="block text-sm font-medium text-violet-950">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded focus:outline-none border-violet-50 focus:border-violet-100"
                placeholder="Tu nombre"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="apellido" className="block text-sm font-medium text-violet-950">
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded focus:outline-none border-violet-50 focus:border-violet-100"
                placeholder="Tu apellido"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-violet-950">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded focus:outline-none border-violet-50 focus:border-violet-100"
                placeholder="correo@example.com"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-violet-950">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full mt-1 p-2 border rounded focus:outline-none border-violet-50 focus:border-violet-100"
                placeholder="********"
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="text-violet-800 w-full font-sans py-2 rounded-lg transition hover:bg-violet-100 hover:text-violet-500 hover:shadow-lg active:bg-violet-200 active:text-white active:scale-95"
            >
              Registrarme
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
