import { z } from "zod";
import dns from "dns";

const isValidDomain = (email) => {
  return new Promise((resolve) => {
    try {
      const domain = email.split("@")[1];
      dns.resolveMx(domain, (err, addresses) => {
        if (err || !addresses || addresses.length === 0) {
          resolve(false); // Dominio inválido
        } else {
          resolve(true); // Dominio válido
        }
      });
    } catch (error) {
      resolve(false); // Manejar casos inesperados
    }
  });
};


export const registerUserSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio")
    .regex(/^[\p{L}\p{M}.\-\s]+$/u, "El nombre solo puede contener letras, espacios y caracteres básicos"),
  apellido: z
    .string()
    .min(1, "El apellido es obligatorio")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, "El apellido solo puede contener letras y espacios"),
  email: z
    .string()
    .email("Debe ser un correo válido")
    .refine(
      (email) => isValidDomain(email), // Llama directamente a la función
      { message: "El dominio del correo no es válido" }
    ),
    password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/, "La contraseña debe incluir al menos una letra, un número y un carácter especial"),
  });
