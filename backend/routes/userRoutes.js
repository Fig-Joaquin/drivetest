import express from "express";
import { registerUser, loginUser, changePassword, logoutUser, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { validateSchema } from "../middlewares/validateUser.js";
import { registerUserSchema } from "../schemas/userSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Registrar un usuario
router.post("/register", validateSchema(registerUserSchema), registerUser);

// Iniciar sesión
router.post("/login", loginUser);

// Cerrar sesión
router.post("/logout", authMiddleware, logoutUser);

// Perfil del usuario
router.get("/perfil", authMiddleware, getUserProfile);

// Cambio de contraseña del usario
router.patch("/change-password", authMiddleware, changePassword);

// Actualizar
router.put("/perfil", authMiddleware, updateUserProfile);

export default router;
