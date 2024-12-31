import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/Buttons/CustomButton";
import { HeaderQuiz } from "../../components/HeaderQuiz";
import profileImage from "../../images/profilePicture.png";
import { MobileNav } from "../../components/NavBar";
import { useLogout } from "../../utils/useLogout";
import { AuthContext } from "../../context/AuthContext";
import { fetchUserProfile } from "../../services/userServices";
import api from "../../utils/axiosConfig";
const API_URL = import.meta.env.VITE_API_URL;

export const ProfilePage = () => {
  const { authenticated, loading } = useContext(AuthContext); 
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { handleLogout } = useLogout();

  useEffect(() => {
    if (!loading && !authenticated) {
      navigate("/login"); 
    }
  }, [loading, authenticated, navigate]);

  useEffect( () => {
    const loadUserProfile = async () => {
      try {
        const userData = await fetchUserProfile();
        setUser(userData);
      }
      catch (err) {
        setError(err.message);
        navigate("/login");
      }
    }

    loadUserProfile();
  }, [navigate] );

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
    <div className="min-h-screen bg-gradient-to-b flex flex-col md:items-center from-white to-purple-100 ">
      <div className="block md:hidden">
        <MobileNav />
      </div>
      <div className="hidden md:block">
        <HeaderQuiz
          navClass="text-2xl fixed top-0 z-50 left-0 font-extrabold text-center bg-violet text-purple-900 uppercase p-3 flex justify-between items-center w-full"
          showLoginButton={false}
          showHomeButton={true}
          classNameChildrenButton="hidden sm:block group font-medium py-2 px-4 text-violet-900 rounded-lg transition duration-200 text-sm sm:text-base sm:py-2 md:py-2 md:px-4"
          handleLinkChildrenButton="/"
        />
      </div>
      <div className="bg-white p-10 lg:mt-32 md:mt-32 mt-16 rounded-3xl shadow-lg max-w-2xl w-full">
        <div className="flex flex-col items-center mb-6">
          <img
            className="w-32 h-32 rounded-full shadow-lg border-4 border-purple-300"
            src={profileImage}
            alt="Foto de perfil"
          />
          <div >
            <h1 className="text-2xl items-center text-center  font-bold text-purple-700">{`${user.nombre} ${user.apellido}`}</h1>
            <p className="text-gray-600 items-center text-center text-lg">{user.email}</p>
          </div>
        </div>
        <div className="w-full flex flex-col  justify-between items-center space-y-4 lg:space-y-0">
          <div className="bg-purple-50 p-4 rounded-lg shadow-md w-full md:w-1/3">
            <h3 className="text-purple-700 font-semibold mb-2">Progreso</h3>
            {/* Acá debe ir el progreso. Cuántos test realizados y el porcentaje de aciertos. %acierto y %errores */}
            <p className="text-gray-600">Quizzes completados: {user.quizzesCompletados || 0}</p>
            <p className="text-gray-600">Puntaje promedio: {user.puntajePromedio || "N/A"}</p>
          </div>
        </div>
        
        <div className="w-full mt-6 flex justify-around">
          <CustomButton
            text="Editar Perfil"
            onClick={() => navigate("/editar-perfil")}
            variant="primary"
            className="w-32"
          />
          <CustomButton
            text="Cerrar Sesión"
            onClick={() => handleLogout()}
            variant="danger"
            className="w-32"
          />
        </div>
      </div>
    </div>
  );
};
