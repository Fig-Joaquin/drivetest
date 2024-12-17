import { LoginButton } from "../Buttons/LoginButton"

export const Nav = () => {
  return (
      <nav className=" p-4 flex justify-between items-center">
        <div className="text-2xl font-extrabold text-center animate-pulse text-purple-900 uppercase">
          Examen teoríco para la licencia de conducir
        </div>

      {/* Botón de Iniciar Sesión para pantallas grandes */}
        <LoginButton className="text-purple-700"/>
      </nav>
  )
}
