import api from "../utils/axiosConfig";
let cachedAuth = null;

let authPromise = null;

export const isAuthenticated = async () => {
  if (cachedAuth !== null) return cachedAuth;

  if (authPromise) {
    return authPromise;
  }

  authPromise = api.get("/auth/validate-token")
    .then((response) => {
      cachedAuth = response.data.authenticated;
      authPromise = null; // Reset la promesa una vez completada
      return cachedAuth;
    })
    .catch((error) => {
      console.error("Error verificando autenticación:", error);
      cachedAuth = false;
      authPromise = null;
      return false;
    });

  return authPromise;
};
