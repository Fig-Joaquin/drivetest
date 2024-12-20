import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto_super_seguro";

// Middleware para verificar la autenticación del usuario
export const authMiddleware = (req, res, next) => {

  try {
    const token = req.cookies.token; // Leer el token de las cookies

    if (!token) {
      return res.status(401).json({ message: "No estás autenticado." });
    }

    const decoded = jwt.verify(token, JWT_SECRET); // Verificar el token
    req.user = decoded; // Adjuntar los datos del usuario al request
    next();  // Continuar al siguiente middleware o controlador
  } catch (error) {
    res.status(403).json({ message: "Token inválido o expirado." });
  }
};
