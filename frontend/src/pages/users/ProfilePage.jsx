import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/Buttons/CustomButton";
import { HeaderQuiz } from "../../components/HeaderQuiz";

import profileImage from "../../images/profilePicture.png";
import { MobileNav } from "../../components/NavBar";
import { useLogout } from "../../utils/useLogout";

const API_URL = import.meta.env.VITE_API_URL;

export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogout = useLogout();

  // Obtener información del usuario
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const response = await fetch(`${API_URL}/users/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("No se pudo cargar la información del perfil.");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Editar perfil
  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-100">
      {/* Barra de Navegación para Móviles */}
      <div className="block lg:hidden">
        <MobileNav />
      </div>

      {/* // Barra de Navgación para Escritorio */}
      <div className="hidden lg:block">
        <HeaderQuiz
          navClass={"text-2xl fixed top-0 z-50 left-0 font-extrabold text-center bg-violet text-purple-900 uppercase p-3 flex justify-between items-center w-full"}
          showLoginButton={true}
          showHomeButton={false}
          classNameChildrenButton2={
            "hidden sm:block group font-medium py-2 px-4 text-violet-900 rounded-lg transition duration-200 text-sm sm:text-base sm:py-2 md:py-2 md:px-4"
          }
          handleLinkChildrenButton2={"/login"}
        />
      </div>


      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md mt-20">
        <div className="flex flex-col items-center">
          {/* Imagen de perfil */}
          <img
            className="w-24 h-24 rounded-full shadow-lg mb-4"
            src={profileImage}
            alt="Foto de perfil"
          />
          <h1 className="text-3xl font-bold text-violet-700 mb-2">
            {user.nombre} {user.apellido}
          </h1>
          <p className="text-gray-600 mb-4">{user.email}</p>
        </div>
        <div className="flex justify-around mt-6">
          <CustomButton
            text="Editar Perfil"
            onClick={handleEditProfile}
            variant="primary"
          />
          <CustomButton
            text="Cerrar Sesión"
            onClick={useLogout}
            variant="danger"
          />
        </div>
      </div>
    </div>
  );
};
