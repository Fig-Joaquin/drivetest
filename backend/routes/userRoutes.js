import express from "express";
import { registerUser, loginUser, changePassword, logoutUser } from "../controllers/userController.js";
import { validateSchema } from "../middlewares/validateUser.js";
import { registerUserSchema } from "../schemas/userSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Registrar un usuario
router.post("/register", validateSchema(registerUserSchema), registerUser);

// Iniciar sesión
router.post("/login", loginUser);

// Perfil del usuario
router.get("/perfil", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Acceso autorizado", user: req.user });
});

// Cambio de contraseña del usario
router.patch("/change-password", authMiddleware, changePassword);

// Cerrar sesión
router.post("/logout", authMiddleware, logoutUser);


export default router;
