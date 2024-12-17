import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderQuiz } from "../../components/HeaderQuiz";
import { CustomButton } from "../../components/Buttons/CustomButton";
import { MobileNav } from "../../components/NavBar";

const API_URL = import.meta.env.VITE_API_URL;


export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Error al iniciar sesión");
      }

      const { token } = await response.json();
      localStorage.setItem("token", token); // Guardar el token en localStorage

      navigate("/perfil"); // Redirigir al perfil del usuario
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="lg:flex lg:items-center lg:justify-center h-screen bg-gradient-to-b from-white to-purple-100">
      {/* Barra de Navegación para Móviles */}
      <div className="block lg:hidden">
        <MobileNav />
      </div>

      {/* Barra de Navegación */}
      {/* // Header del Quiz */}
      
      <div className="hidden lg:block">
        <HeaderQuiz
          navClass={"text-2xl fixed top-0 z-50 left-0 font-extrabold text-center bg-violet text-purple-900 uppercase p-3 flex justify-between items-center w-full"}
          // Boton 1
          showHomeButton = {true} 
          classNameChildrenButton = {"hidden sm:block group text-violet-900  font-medium py-2 px-4 rounded-lg transition duration-200 text-sm sm:text-base sm:py-2 md:py-2 md:px-4"}
          handleLinkChildrenButton = {"/"}
          showLoginButton={false}
        />
      </div>


      <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl 
              bg-gradient-to-tl from-violet-50 to-purple-1000">
        <h2 className="text-2xl text-violet-950 font-extralight text-center mb-6">Iniciar Sesión</h2>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        <form autoComplete="on" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label    
            htmlFor="email"
            className="block text-sm font-medium text-violet-950">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 border rounded focus:outline-none border-violet-50 focus:border-violet-100"
            placeholder="correo@hotmail.com"
            autoComplete="email"
            required
          />
        </div>

          <div className="mb-4">
            <label 
              htmlFor="password"
              className="block text-sm font-medium text-violet-950">Contraseña</label>
            <input
            
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded focus:outline-none border-violet-50  focus:border-violet-100"
              placeholder="*********"
              autoComplete="current-password"
              required
            />
          </div>
          {/* // Botón inicio de sesión */}
          <div className="flex items-center justify-center">
          <button
            type="submit"
            className="text-violet-800 w-full font-sans py-2 rounded-lg transition 
                      hover:bg-violet-100 hover:text-violet-500 hover:shadow-lg
                      active:bg-violet-200 active:text-white active:scale-95"
          >
            Iniciar Sesión
          </button>

          </div>
          {/* // Botón de registro */}
          <CustomButton 
            text="Registrarme" 
            type="submit" 
            classNameChildren="text-violet-800 font-sans  py-1 rounded-lg transition 
                      hover:bg-violet-100 hover:text-violet-500 hover:shadow-lg
                      active:bg-violet-200 active:text-white active:scale-95 text-violet-700 items-center w-full px-3 py-1 rounded-lg border-violet-50 hover:bg-violet-50 transition"
          />

        </form>
      </div>
    </div>
  );
};
