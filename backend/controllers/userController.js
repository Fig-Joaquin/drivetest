import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto_super_seguro";

export const registerUser = async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = new User({
      nombre,
      apellido,
      email,
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


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas." });
    }

    // Validar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Credenciales inválidas." });
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión.", error: error.message });
  }
};


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

export const logoutUser = (req, res) => {
  // Simplemente confirmar el cierre de sesión
  res.status(200).json({ message: "Sesión cerrada correctamente." });
};
