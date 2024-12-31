import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto_super_seguro";

/**
 * Valida el token JWT desde las cookies.
 */
export const validateToken = (req, res) => {
  // Extraer el token de las cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No se encontró el token en las cookies." });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Respuesta positiva si el token es válido
    res.status(200).json({ authenticated: true, userId: decoded.userId });
  } catch (error) {
    // Token inválido o expirado
    res.status(401).json({ message: "Token inválido o expirado." });
  }
};
