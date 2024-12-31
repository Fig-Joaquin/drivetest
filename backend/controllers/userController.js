import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { editUserProfileSchema } from "../schemas/userSchema.js";
import { z } from "zod";
const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto_super_seguro";

// * Registrar Usuario
export const registerUser = async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  try {
    // Convertir el correo a minúsculas
    const normalizedEmail = email.toLowerCase();

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = new User({
      nombre,
      apellido,
      email: normalizedEmail,
      password: hashedPassword,
    });
    await newUser.save();

    // Generar un token JWT
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario.", error: error.message });
  }
};


// * Obtener Perfil de Usuario
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el perfil del usuario." });
  }
};
// * Iniciar Sesión

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Normalizar el correo a minúsculas
  const normalizedEmail = email.toLowerCase();

  try {
    // Buscar al usuario por email
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      res.status(401).json({ message: "El correo o la contraseña son incorrectos." });
    }

    // Validar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Configurar la cookie
    res.cookie("token", token, {
      httpOnly: true, // No accesible desde JavaScript
      secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
      sameSite: "Strict", // Previene ataques CSRF
      maxAge: 86400000, // 1 Día de duración
    });

    // Responder con éxito
    res.status(200).json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión.", error: error.message });
  }
};

// * Cambiar Contraseña
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  try {
    // Buscar al usuario autenticado
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    
    // Verificar la contraseña actual
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "La contraseña actual es incorrecta." });
    }
    
    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Actualizar la contraseña en la base de datos
    user.password = hashedPassword;
    await user.save();
    
    res.status(200).json({ message: "Contraseña actualizada correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar la contraseña." });
  }
};

// * Cerrar Sesión
export const logoutUser = (req, res) => {
  res.clearCookie("token"); // Elimina la cookie del token
  res.status(200).json({ message: "Sesión cerrada correctamente." });
};


// * Actualizar Perfil de Usuario
export const updateUserProfile = async (req, res) => {

  try {
     // Validar los datos enviados con Zod
    const validatedData = editUserProfileSchema.parse(req.body);
    console.log(validatedData);
    // Buscar al usuario autenticado
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (validatedData.email && validatedData.email !== user.email) {
      const emailExists = await User.findOne({ email: validatedData.email });
      if (emailExists) {
        return res.status(400).json({ message: "El correo ya está en uso." });
      }
    }

    // Actualizar los campos permitidos 
    user.nombre = validatedData.nombre;
    user.apellido = validatedData.apellido;
    user.email = validatedData.email;

    // Guardar los cambios en la base de datos
    const updatedUser = await user.save();

    // Devolver los datos actualizados sin la contraseña
    res.status(200).json({
      _id: updatedUser._id,
      nombre: updatedUser.nombre,
      apellido: updatedUser.apellido,
      email: updatedUser.email,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Error de validación.", errors: error.errors });
    }
    res.status(500).json({ message: "Error al actualizar el perfil.", error: error.message });
  }
};


