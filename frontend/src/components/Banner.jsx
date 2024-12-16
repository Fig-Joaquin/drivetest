
export const Banner = () => {
  return (
    <header className="flex flex-col items-center justify-center flex-grow px-6 py-36 ">
      <div className="text-center max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-6">
          ¿Listo para aprobar tu <span className="text-purple-800">examen de conducir</span> con nosotros?
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-4">
          Descubre la manera más fácil y efectiva de prepararte para tu licencia.
        </p>
        <p className="text-sm sm:text-base text-gray-600">
          ¡Prepárate con nuestras pruebas interactivas!
        </p>
      </div>
    </header>
  )
}
