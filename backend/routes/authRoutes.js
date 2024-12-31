import express from "express";
import passport from "passport";
import { validateToken } from "../controllers/authController.js";


const router = express.Router();

// Endpoint para validar el token
router.get("/validate-token", validateToken);

// Ruta para iniciar sesión con Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback después de la autenticación
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard"); // Redirige a una página después de iniciar sesión
  }
);

// Ruta para cerrar sesión
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error al cerrar sesión." });
    }
    res.redirect("/");
  });
});




export default router;
