import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/Buttons/CustomButton";
import { HeaderQuiz } from "../../components/HeaderQuiz";

import profileImage from "../../images/profilePicture.png";
import { MobileNav } from "../../components/NavBar";
import { useLogout } from "../../utils/useLogout";
import { AuthContext } from "../../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export const ProfilePage = () => {
  const { authenticated, loading } = useContext(AuthContext); // Usar el contexto
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogout = useLogout();

  useEffect(() => {
    if (!loading && !authenticated) {
      navigate("/login"); // Redirigir si no está autenticado
    }
  }, [loading, authenticated, navigate]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/users/perfil`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("No se pudo cargar la información del perfil.");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
        navigate("/login"); // Redirigir si el usuario no está autenticado
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center text-gray-500">Cargando perfil...</div>;
  }

  return (
    <div className="md:flex lg:flex md:items-center lg:items-center md:justify-center lg:justify-center h-screen min-h-screen bg-gradient-to-b from-white to-purple-100">
      <div className="block md:hidden lg:hidden">
        <MobileNav />
      </div>
      <div className="hidden md:block lg:block">
        <HeaderQuiz
          navClass={
            "text-2xl fixed top-0 z-50 left-0 font-extrabold text-center bg-violet text-purple-900 uppercase p-3 flex justify-between items-center w-full"
          }
          showLoginButton={false}
          showHomeButton={true}
          classNameChildrenButton={
            "hidden sm:block group font-medium py-2 px-4 text-violet-900 rounded-lg transition duration-200 text-sm sm:text-base sm:py-2 md:py-2 md:px-4"
          }
          handleLinkChildrenButton={"/"}
        />
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-md mt-5 ">
        <h2 className="text-2xl text-violet-950 font-extralight text-center mb-6">
          Perfil de Usuario
        </h2>
        <div className="flex flex-col items-center">
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
            onClick={() => navigate("/edit-profile")}
            variant="primary"
          />
          <CustomButton
            text="Cerrar Sesión"
            onClick={handleLogout}
            variant="danger"
          />
        </div>
      </div>
    </div>
  );
};
