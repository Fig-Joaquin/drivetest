import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto_super_seguro";

// Validar el token
export const validateToken = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extraer token del header

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado." });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Si es válido, enviar una respuesta positiva
    res.status(200).json({ valid: true, userId: decoded.userId });
  } catch (error) {
    // Token inválido o expirado
    res.status(401).json({ message: "Token inválido o expirado." });
  }
};
