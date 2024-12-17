import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import navImage from "../../images/NavBarWhite.png";
import { useLogout } from "../../utils/useLogout"; // Tu hook para cerrar sesión

export const MobileNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para el token
  const handleLogout = useLogout(); // Hook para cerrar sesión

  // Verificar si hay token en localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Actualiza isLoggedIn si hay token
  }, []);

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Comenzar Test", href: "/quiz" },
    isLoggedIn && { name: "Perfil", href: "/perfil" }, // Solo si hay token
    !isLoggedIn && { name: "Iniciar Sesión", href: "/login" }, // Solo si no hay token
  ].filter(Boolean); // Filtra elementos nulos o falsos

  return (
    <header className="bg-white shadow-md">
      <nav className="flex items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <img src={navImage} alt="Logo" className="h-8 w-auto" />
          </a>
        </div>

        {/* Botón menú móvil */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="rounded-md p-2.5 text-gray-700 hover:bg-gray-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-gray-900/50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white px-6 py-6">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <img src={navImage} alt="Logo" className="h-8 w-auto" />
            </a>
            <button
              type="button"
              className="rounded-md p-2.5 text-gray-700 hover:bg-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-200">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Botón de cerrar sesión */}
              {isLoggedIn && (
                <div className="py-6">
                  <button
                    onClick={handleLogout}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};
