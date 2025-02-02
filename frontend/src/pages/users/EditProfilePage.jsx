import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderQuiz } from "../../components/HeaderQuiz";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners"; // Usa un spinner de carga
import { MobileNav } from "../../components/NavBar";

const API_URL = import.meta.env.VITE_API_URL;

export const EditProfilePage = () => {
  const { authenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nombre: "", apellido: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para gestionar el envío

  useEffect(() => {
    if (!loading && !authenticated) {
      navigate("/login");
    }
  }, [loading, authenticated, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/users/perfil`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Error al cargar los datos del perfil.");
        }

        const data = await response.json();
        setFormData(data);
      } catch (err) {
        toast.error(err.message, { position: "top-center" });
      }
    };

    fetchProfile();
  }, []);

  const validateInputs = () => {
    if (!formData.nombre.trim()) {
      toast.error("El nombre no puede estar vacío.", { position: "top-center" });
      return false;
    }
    if (!formData.apellido.trim()) {
      toast.error("El apellido no puede estar vacío.", { position: "top-center" });
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Por favor, introduce un correo válido.", { position: "top-center" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/users/editar-perfil`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el perfil.");
      }

      toast.success("Perfil actualizado correctamente.", { position: "top-center" });
    } catch (err) {
      toast.error(err.message, { position: "top-center" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ClipLoader color="#6B46C1" size={50} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:items-center md:p-24 bg-gradient-to-b from-white to-purple-100">
      <ToastContainer />
      
      {/* Nav bar de movil */}
      <div className="block md:hidden items-center justify-between md:justify-center">  
        <MobileNav/>
      </div>

    {/* Menú para dispositivos con pantalla menor a MD */}
      <div className="hidden md:block">
              <HeaderQuiz
                navClass="text-2xl fixed top-0 z-50 left-0 font-extrabold text-center bg-violet text-purple-900 uppercase p-3 flex justify-between items-center w-full"
                showLoginButton={false}
                showHomeButton={true}
                classNameChildrenButton="hidden sm:block group font-medium py-2 px-4 text-violet-900 rounded-lg transition duration-200 text-sm sm:text-base sm:py-2 md:py-2 md:px-4"
                handleLinkChildrenButton="/"
              />
      </div>

      {/* Menú para pc y tabletas */}
      <div className="hidden lg:block">
        <HeaderQuiz
          navClass={"text-2xl fixed top-0 z-50 left-0 font-extrabold text-center bg-violet text-purple-900 uppercase p-3 flex justify-between items-center w-full"}
          classNameChildrenButton2={"hidden sm:block group text-violet-900 font-medium py-2 px-4 rounded-lg transition duration-200 text-sm sm:text-base sm:py-2 md:py-2 md:px-4"}
          textChildrenButton2={authenticated ? "Ver Perfil" : "Iniciar Sesión"}
          handleLinkChildrenButton2={authenticated ? "/perfil" : "/login"}
          showLoginButton={true}
          showHomeButton={true}
          classNameChildrenButton={"hidden sm:block group text-violet-900 font-medium py-2 px-4 rounded-lg transition duration-200 text-sm sm:text-base sm:py-2 md:py-2 md:px-4"}
          handleLinkChildrenButton={"/"}
        />
      </div>
      
      <div className="w-full lg:max-w-md p-8 mt-10 rounded-3xl shadow-2xl bg-white">
        <h2 className="text-2xl text-violet-900 font-semibold text-center mb-6">Editar Perfil</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full mt-1 p-2 border rounded focus:outline-none border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label 
              htmlFor="apellido" 
              className="block text-sm font-medium text-gray-700"
              >Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
              className="w-full mt-1 p-2 border rounded focus:outline-none border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full mt-1 p-2 border rounded focus:outline-none border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white py-2 mt-2 rounded-lg transition duration-200 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 active:scale-95"
              }`}
            >
              {isSubmitting ? "Actualizando..." : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
