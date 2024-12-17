import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderQuiz } from "../components/HeaderQuiz";
import { CustomButton } from "../components/Buttons/CustomButton";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://192.168.1.115:4000/users/login", {
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

      navigate("/profile"); // Redirigir al perfil del usuario
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <HeaderQuiz 
              showHomeButton = {true} 
              showLoginButton={false} 
            />
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring border-violet-800  focus:border-violet-100"
              placeholder="correo@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring border-violet-800  focus:border-violet-100"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-violet-700  px-3 py-1 rounded-lg border-2 border-violet-800   hover:bg-violet-50 transition"
          >
            Iniciar Sesión
          </button>
          {/* <CustomButton 
            text="Iniciar Sesión" 
            type="submit" 
            className="w-full text-violet-700  px-3 py-1 rounded-lg border-2 border-violet-800   hover:bg-violet-50 transition"
          /> */}
        </form>
      </div>
    </div>
  );
};
