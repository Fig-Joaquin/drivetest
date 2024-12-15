import { z } from "zod";
import dns from "dns";

const isValidDomain = (email) => {
  return new Promise((resolve, reject) => {
    const domain = email.split("@")[1];
    dns.resolveMx(domain, (err, addresses) => {
      if (err || addresses.length === 0) {
        resolve(false); // Dominio inválido
      } else {
        resolve(true); // Dominio válido
      }
    });
  });
};

export const registerUserSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, "El nombre solo puede contener letras y espacios"),
  apellido: z
    .string()
    .min(1, "El apellido es obligatorio")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, "El apellido solo puede contener letras y espacios"),
  email: z
    .string()
    .email("Debe ser un correo válido")
    .refine(async (email) => await isValidDomain(email), "El dominio del correo no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});
