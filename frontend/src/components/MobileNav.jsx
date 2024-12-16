
export const MobileNav = () => {
  return (
      <div className=" top-0 w-full bg-gradient-to-b from-purple-800 to-purple-700 text-white py-4 flex justify-around sm:hidden">
        <button className="flex flex-col items-center text-sm font-medium hover:text-gray-300">
          <span className="material-icons text-base"> Inicio</span> {/* Ícono para el botón */}
          
        </button>
        <button className="flex flex-col items-center text-sm font-medium hover:text-gray-300">
          <span className="material-icons text-base">Más información</span> {/* Ícono para el botón */}
        </button>
        <hr />
        <hr />
        <hr />
        <button className="flex flex-col items-center text-sm font-medium hover:text-gray-300">
          <span className="material-icons text-base"> Iniciar Sesión</span> {/* Ícono para el botón */}
        </button>
      </div>  
    )
}
